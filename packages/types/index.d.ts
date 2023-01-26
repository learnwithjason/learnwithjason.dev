import z from 'zod';
import { ProductsSchema as PSchema } from './index';

export type Products = z.infer<typeof PSchema>;

interface EpisodePerson {
	image: string;
	name: string;
	twitter: string;
}

interface EpisodeTag {
	label: string;
	slug: string;
	uri: string;
}

export interface Episode {
	id: string;
	date: string;
	title: string;
	description: string;
	guest: EpisodePerson;
	host: EpisodePerson;
	links: {
		demo: string;
		repo: string;
		resources: string[];
	};
	tags: EpisodeTag[];
	slug: string;
	uri: string;
	youtube: {
		id: string;
		uri: string;
	};
}
