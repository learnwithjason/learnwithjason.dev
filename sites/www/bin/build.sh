#!/bin/sh

echo "Building the site..."

# apparently Netlify skips optional deps now or something?
npm i @nx/nx-linux-x64-gnu

if [ "$INCOMING_HOOK_BODY" = '{"skipCache":true}' ]; then
  echo "This build was triggered by a Sanity update. Skipping the Nx cache."
  nx run www:build --skip-nx-cache
else
  nx run www:build
fi;

exit $?
