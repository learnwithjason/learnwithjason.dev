import { type APIRoute } from 'astro';
import Stripe from 'stripe';
import { clerkClient } from '@clerk/astro/server';
import { STRIPE_WEBHOOK_SECRET, STRIPE_SECRET_KEY } from 'astro:env/server';

const webhookSecret = STRIPE_WEBHOOK_SECRET;
const stripe = new Stripe(STRIPE_SECRET_KEY);

export const POST: APIRoute = async (context) => {
	const signature = context.request.headers.get('stripe-signature');

	if (!signature) {
		return new Response(null, {
			status: 400,
		});
	}

	let event;
	try {
		event = stripe.webhooks.constructEvent(
			await context.request.text(),
			signature,
			webhookSecret,
		);
	} catch (error) {
		if (error instanceof Error) {
			return new Response(
				JSON.stringify({
					error: error.message,
				}),
				{
					status: 400,
				},
			);
		}
	}

	if (!event) {
		return new Response(null, {
			status: 400,
		});
	}

	switch (event.type) {
		case 'checkout.session.completed':
			const userId = event.data.object.metadata?.userId as string;

			if (!event.data.object.subscription || !userId) {
				return new Response(null, {
					status: 500,
					statusText: 'missing required data',
				});
			}

			// const user = await context.locals.currentUser();
			const subscription = await stripe.subscriptions.retrieve(
				event.data.object.subscription as string,
			);

			// opened an issue for this https://github.com/stripe/stripe-node/issues/2139
			// @ts-expect-error type appears to be incorrect
			const productId = subscription.plan.product;
			const product = await stripe.products.retrieve(productId);

			// attach the Clerk ID to the Stripe customer
			await stripe.customers.update(subscription.customer as string, {
				metadata: {
					userId: userId,
				},
			});

			// attach the Stripe ID and current plan details to the Clerk user
			await clerkClient(context).users.updateUserMetadata(userId, {
				publicMetadata: {
					stripe: {
						customer: subscription.customer,
						status: subscription.status,
						level: product.name,
					},
				},
			});
			break;

		case 'customer.subscription.updated':
			const updatedSub = await stripe.subscriptions.retrieve(
				event.data.object.id,
			);

			const customer = (await stripe.customers.retrieve(
				updatedSub.customer as string,
			)) as Stripe.Customer;
			const updatedProduct = await stripe.products.retrieve(
				// @ts-expect-error TS types are missing the plan
				updatedSub.plan.product,
			);

			const clerkUserId = customer.metadata.userId;

			await clerkClient(context).users.updateUserMetadata(clerkUserId, {
				publicMetadata: {
					stripe: {
						customer: customer.id,
						status: updatedSub.status,
						level: updatedProduct.name,
					},
				},
			});
			break;

		case 'customer.subscription.deleted':
			const deletedSub = await stripe.subscriptions.retrieve(
				event.data.object.id,
			);

			const deletedProduct = await stripe.products.retrieve(
				// @ts-expect-error TS types are missing the plan
				deletedSub.plan.product,
			);

			const cust = (await stripe.customers.retrieve(
				deletedSub.customer as string,
			)) as Stripe.Customer;

			const clerkId = cust.metadata.userId;

			await clerkClient(context).users.updateUserMetadata(clerkId, {
				publicMetadata: {
					stripe: {
						customer: cust.id,
						status: deletedSub.status,
						level: deletedProduct.name,
					},
				},
			});

			break;

		default:
			console.warn(`Unhandled event type: ${event.type}`);
	}

	return new Response(null, {
		status: 200,
		statusText: 'success',
	});
};
