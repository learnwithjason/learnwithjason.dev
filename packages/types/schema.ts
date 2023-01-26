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
