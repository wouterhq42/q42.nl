#!/bin/bash

# first run these two, when you got access to scalingo sites:
# git remote add scalingo-nl git@scalingo.com:q42nlsite.git
# git remote add scalingo-en git@scalingo.com:q42comsite.git

NOW=$(date +"%Y-%m-%d")

echo "------ Begin Q42.nl and Q42.com deploy! ------"

# Use git flow to tag this release with the current date (eg. 2015-03-21)
echo "--- Creating a release..."
git flow release start $NOW
git flow release finish $NOW
echo "--- New release $NOW created."
echo

# Publish all assets to the CDN rather than serving them from meteor.com
echo "--- Publishing assets to CDN..."
gsutil -m rsync -r -d public gs://static.q42.nl || exit 1
echo "--- Done with CDN."
echo

# meteor deploy q42.nl --settings config/settings.json
echo "--- Deploying to q42.nl..."
git push scalingo-nl master
echo "--- Done deploying to q42.nl. Refresh your browser!"
echo

echo "--- Deploying to q42.com..."
# meteor deploy q42.com --settings config/settings.json
git push scalingo-en master
echo "--- Done deploying to q42.com. Refresh your browser!"
echo

echo "------ Done. ------"
