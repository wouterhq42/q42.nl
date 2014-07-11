#!/bin/bash

echo "------ Begin Q42.nl and Q42.com deploy! ------"

# Publish all assets to the CDN rather than serving them from meteor.com
echo "--- Publishing assets to CDN..."
gsutil -m rsync -r -d public gs://static.q42.nl || exit 1
echo "--- Done with CDN."
echo

# Move the /public folder out of the Meteor folder before deploying
# So that the upload size is dramatically smaller (since we already pushed it to the CDN)
echo "--- Excluding public folder from deploy..."
rm -rf $TMPDIR/q42nl-deploy-public
mkdir $TMPDIR/q42nl-deploy-public
mv public $TMPDIR/q42nl-deploy-public
echo

# Deploy the site to two different Meteor domains so we have an English and a Dutch website :-)
# Also, don't deploy the templates of the EN site to the NL site and vice versa
echo "--- Deploying to q42.nl..."
echo "--- Excluding EN templates..."
rm -rf $TMPDIR/q42nl-deploy-EN
mkdir $TMPDIR/q42nl-deploy-EN
mv views/en $TMPDIR/q42nl-deploy-EN
echo
meteor deploy q42.nl
echo "--- Done deploying to q42.nl. Refresh your browser!"
echo "--- Restoring EN templates..."
mv $TMPDIR/q42nl-deploy-EN/* views

echo "--- Deploying to q42.com..."

# DISABLED - EXCLUDING NL TEMPLATES BREAKS EN SITE
# echo "--- Excluding NL templates..."
# rm -rf $TMPDIR/q42nl-deploy-NL
# mkdir $TMPDIR/q42nl-deploy-NL
# mv views/nl $TMPDIR/q42nl-deploy-NL
# echo

meteor deploy q42.com
echo "--- Done deploying to q42.com. Refresh your browser!"

# DISABLED - EXCLUDING NL TEMPLATES BREAKS EN SITE
# echo "--- Restoring NL templates..."
# mv $TMPDIR/q42nl-deploy-NL/* views

# Put back the public folder
echo "--- Restoring public folder..."
mv $TMPDIR/q42nl-deploy-public/* .

echo "------ Done. ------"
