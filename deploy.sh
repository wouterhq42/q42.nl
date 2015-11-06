#!/bin/bash

# first run these two, when you got access to scalingo sites:
# git remote add scalingo-nl git@scalingo.com:q42nl-site.git
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
gcloud components update
gsutil -m rsync -r -d public gs://static.q42.nl || exit 1
echo "--- Done with CDN."
echo

# Deploy the site to two different Meteor domains
# so we have an English and a Dutch website :-)
echo "--- Deploying to q42.com..."
git push scalingo-en master
echo "--- Done deploying to q42.com. Refresh your browser!"
echo

echo "--- Deploying to q42.nl..."
git push scalingo-nl master
echo "--- Done deploying to q42.nl. Refresh your browser!"
echo

echo "--- Returning to develop branch..."
git checkout develop
echo

echo "------ Done. ------"
