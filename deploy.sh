#!/bin/bash

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

# Move the /public folder out of the Meteor folder before deploying
# So that the upload size is dramatically smaller
# (since we already pushed it to the CDN)
echo "--- Excluding public folder from deploy..."
rm -rf $TMPDIR/q42nl-deploy-public
mkdir $TMPDIR/q42nl-deploy-public
mv public $TMPDIR/q42nl-deploy-public
echo

# Deploy the site to two different Meteor domains
# so we have an English and a Dutch website :-)
# Also, don't deploy the templates of the EN site to the NL site and vice versa
echo "--- Deploying to q42.nl..."
echo "--- Excluding EN templates..."
rm -rf $TMPDIR/q42nl-deploy-EN
mkdir $TMPDIR/q42nl-deploy-EN
mv views/en $TMPDIR/q42nl-deploy-EN
echo
# meteor deploy q42.nl --settings config/settings.json
scalingo push scalingo-nl master
echo "--- Done deploying to q42.nl. Refresh your browser!"
echo "--- Restoring EN templates..."
mv $TMPDIR/q42nl-deploy-EN/* views

echo "--- Deploying to q42.com..."
# meteor deploy q42.com --settings config/settings.json
scalingo push scalingo-en master
echo "--- Done deploying to q42.com. Refresh your browser!"
echo

# Put back the public folder
echo "--- Restoring public folder..."
mv $TMPDIR/q42nl-deploy-public/* .
echo

echo "------ Done. ------"
