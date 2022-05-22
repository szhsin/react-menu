#!/bin/bash

set -e

check_str=$(pwd | grep "/example")
if [ -z "$check_str" ]; then
    echo "Not in /example"
    exit 1
fi

npm run build

tmpdir="$HOME/gh-pages"
rm -Rf "$tmpdir"
mkdir "$tmpdir"
mv out "$tmpdir"
cd ..

git checkout gh-pages
check_str=$(git branch | grep "*" | grep "gh-pages")
if [ -z "$check_str" ]; then
    echo "Not on branch gh-pages"
    exit 1
fi

rm -Rf _next
cp -Rf "$tmpdir/out/" .
git add .
git commit -m "Updates"
git push
rm -Rf "$tmpdir"
echo "Deployed to gh-pages"
