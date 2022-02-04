#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import glob from 'glob';
import { minify } from 'terser';

async function minifyFiles() {
  const files = glob.sync(
    path.join(process.cwd(), 'public', 'web_modules', '**', '*.js'),
  );

  files.forEach(async (file) => {
    const contents = fs.readFileSync(file, 'utf8');
    const minified = await minify({ [file]: contents });

    fs.writeFileSync(file, minified.code);
  });
}

minifyFiles();
