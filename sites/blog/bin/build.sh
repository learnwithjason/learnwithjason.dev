#!/bin/sh

echo "building..."
echo $INCOMING_HOOK_BODY
if [ "$INCOMING_HOOK_BODY" = '{"skipCache":true}' ]; then
  echo "skipping Nx cache"
  nx run blog:build --skip-nx-cache
else
  nx run blog:build
fi;
