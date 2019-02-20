#!/bin/sh -l

sh -c "echo $*"

echo "### $GITHUB_EVENT_PATH"
jq . < "$GITHUB_EVENT_PATH" # run through jq to pretty print

