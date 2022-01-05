#!/bin/bash

local_is_clean=`git status | grep 'nothing to commit, working tree clean' | wc -l`
current_branch=`git rev-parse --abbrev-ref HEAD`

if [ $current_branch != 'main' ]; then
    echo "RELEASE: You can only release from the main branch."
    exit 1
fi

if [ $local_is_clean != '1' ]; then
    echo "RELEASE: Please commit all your changes before the release."
    exit 1
fi

echo "RELEASE: Pulling tags from GitHub, git might as for credentials."
git pull --tags

last_tag=`git tag --list | sort -V | tail -1`
major=`echo -n $last_tag | cut -d '.' -f 1`
minor=`echo -n $last_tag | cut -d '.' -f 2`

# increment minor version
((minor=minor+1))

next_tag="${major}.${minor}"

echo "RELEASE: The last release tag detected is ${last_tag}, we will release with tag ${next_tag}."
read -p 'RELEASE: Release with this tag? (y/n)' proceed

if [ $proceed == 'y' ];then
    git tag $next_tag
    git push origin main --tags
    docker build -t taskmanager:$next_tag -f ./Dockerfile .
else
    echo 'RELEASE: Release aborted by user.'
    exit 1
fi
