#!/usr/bin/env node

import fs from 'fs-extra';
import path from 'path';
import glob from 'glob';

async function copyContentImages() {
  const files = glob.sync(
    path.join(process.cwd(), 'content', '**', 'images', '*'),
  );

  files.map((filePath) => {
    fs.copy(
      filePath,
      path.join(process.cwd(), 'public', 'images', path.basename(filePath)),
    );
  });
}

copyContentImages();
