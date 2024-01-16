/**
 * I hate that there's not a solution for this. Sucks that RSS gets pushed out
 * to the fringes.
 */

import * as fs from 'node:fs';
import { basename, dirname, resolve } from 'node:path';
import type { CollectionEntry } from 'astro:content';
import * as runtime from 'react/jsx-runtime';
import { renderToString } from 'react-dom/server';
import { evaluate } from '@mdx-js/mdx';
import { createElement } from 'react';
import { getMDXComponent } from 'mdx-bundler/client';
import { bundleMDX } from 'mdx-bundler';
import type { Plugin } from 'esbuild';

const loadAstroAsJsx = {
	name: 'loadAstroAsJsx',
	setup(build: any) {
		build.onLoad({ filter: /(\.astro|\.tsx)$/ }, async (args: any) => {
			let contents;

			switch (basename(args.path)) {
				case 'aside.astro':
					contents = `export default function Aside({ children }) { return <aside>{children}</aside>; }`;
					break;

				case 'codepen.astro':
					contents =
						'export default function CodePen({ slug, title }) { return <p>CodePen: <a href={`https://codepen.io/jlengstorf/pen/${slug}`}>{title}</a></p>; }';
					break;

				case 'figure.astro':
					contents = `
            export default function Figure({ children }) {
              if (children.props.children?.props.src) {
                const { src, alt } = children.props.children.props;
                return <img src={src} alt={alt} />
              }

              return <p>(Something is here in the original article that I couldn’t get to show up in RSS. Check my website to see it.)</p>;
            }
          `;
					break;

				case 'youtube.astro':
					contents =
						'export default function YouTube({ children, id }) { return <p><a href={`https://youtu.be/${id}`}>Watch on YouTube</a></p>; }';
					break;

				case 'opt-in-form.solid.tsx':
					contents = `export function OptInForm() { return <p><a href="https://lwj.dev/newsletter">Subscribe to my newsletter for more like this!</a></p>; }`;
					break;

				default:
					contents = `export default function Unknown() { return <></> }`;
			}

			return {
				contents,
				loader: 'jsx',
			};
		});
	},
};

export async function getHtmlFromContentCollectionEntry(
	post: CollectionEntry<'blog'>
) {
	const result = await bundleMDX({
		source: post.body,
		esbuildOptions(options) {
			return {
				...options,
				plugins: [loadAstroAsJsx, ...(options.plugins as Plugin[])],
			};
		},
		cwd: resolve('./src/content/blog', dirname(post.id)),
	});

	const Component = await getMDXComponent(result.code);

	return renderToString(createElement(Component));
}
