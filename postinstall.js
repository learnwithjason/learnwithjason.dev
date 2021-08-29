#!/usr/bin/env node
import path from 'path';
import { install, printStats } from 'esinstall';
import { copyFile } from 'fs/promises';
import prettyBytes from 'pretty-bytes';
import { options, specs } from './esinstall.js';

// esinstall doesn't let us quiet the output while it runs
// so we kinda do that here.
const logger = {
  debug() {},
  warn(...args) {
    console.warn(...args);
  },
  error(...args) {
    console.error(...args);
  },
};

async function main() {
  const { success, stats } = await install(specs, {
    dest: './public/web_modules',
    // logger,
    ...options,
  });

  if (stats) {
    console.table(
      Object.entries(stats.direct)
        .map(([key, value]) => ({
          esm: key,
          ...Object.fromEntries(
            Object.entries(value).map(([k, v]) => [k, prettyBytes(v)]),
          ),
        }))
        .concat(
          Object.entries(stats.common).map(([key, value]) => ({
            esm: key,
            ...Object.fromEntries(
              Object.entries(value).map(([k, v]) => [k, prettyBytes(v)]),
            ),
          })),
        ),
    );
  }
}

try {
  main();
} catch (e) {
  throw e;
}
