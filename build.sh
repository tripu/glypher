#!/bin/sh

# Common stuff:
for BROWSER in firefox chrome; do
    rm -r dist/$BROWSER/*
    cp -a img/ js/ pages/ dist/$BROWSER/
done

# Firefox:
cat manifest.json | jq 'del(.options_ui.chrome_style)' > dist/firefox/manifest.json

# Chrome:
cat manifest.json | jq 'del(.applications) | del(.options_ui.browser_style)' > dist/chrome/manifest.json
