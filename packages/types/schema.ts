import { z } from 'zod';

function format(item: any, quantity = 1) {
	return (item.priceV2.amount * quantity).toLocaleString('en-us', {
		style: 'currency',
		currency: item.priceV2.currencyCode,
	});
}

export const ProductsSchema = z.array(
	z.object({
		id: z.string(),
		slug: z.string(),
		title: z.string(),
		description: z.string(),
		image: z.object({
			src: z.string(),
			alt: z.string(),
		}),
		price: z.preprocess((str) => parseFloat(str as string), z.number()),
		priceFormatted: z.preprocess((obj) => format(obj), z.string()),
		inventory: z.number(),
	})
);

export const CartSchema = z.object({
	id: z.string().startsWith('gid://'),
	lines: z.array(
		z.object({
			id: z.string().startsWith('gid://'),
			quantity: z.number().int().min(1),
			merchandise: z.object({
				id: z.string().startsWith('gid://'),
				title: z.string(),
				price: z.object({
					amount: z.string(),
					currencyCode: z.literal('USD'), // I only have USD prices right now
				}),
				slug: z.string(),
				images: z.array(
					z.object({
						src: z.string().url(),
						alt: z.nullable(z.string()),
					})
				),
			}),
		})
	),
	estimatedCost: z.object({
		totalAmount: z.object({
			amount: z.string(),
			currencyCode: z.literal('USD'),
		}),
		subtotalAmount: z.object({
			amount: z.string(),
			currencyCode: z.literal('USD'),
		}),
		totalTaxAmount: z.any(),
		totalDutyAmount: z.any(),
	}),
});
