import { parse, join } from 'node:path';
import { readFile, writeFile } from 'node:fs/promises';

export const onPreBuild = async function ({ inputs, utils }) {
	const jwtSecret = process.env.MUX_JWT_PRIVATE_KEY;
	// yeah dude, just hard code this, fuck it, who cares
	const path = join(
		process.cwd(),
		'src',
		'components',
		'mux-video-player.astro',
	);

	console.log({ path });

	const file = await readFile(path, { encoding: 'utf-8' });
	const updated = file
		.replace('MUX_JWT_PRIVATE_KEY,', '')
		.replace(
			'jwtPrivateKey: MUX_JWT_PRIVATE_KEY',
			`jwtPrivateKey: "${process.env.MUX_JWT_PRIVATE_KEY}"`,
		);

	await writeFile(path, updated, 'utf-8');
};
