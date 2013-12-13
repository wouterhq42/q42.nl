#!/bin/bash

#BRANCH=`git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/\1/'`

#if [ "$BRANCH" != 'master' ]; then
#        echo "You need to be in the master branch."
#        exit 1;
#fi

# Publish all assets to the CDN rather than serving them from meteor.com
cd public
gsutil -m cp -R * gs://static.q42.nl
cd ..

# Deploy the site to two different Meteor domains
# because that's the way we make sure we have an English and a Dutch website :-)
echo "Deploying to q42.nl..."
echo
meteor deploy q42.nl < password.txt
echo "Deploying to q42.com..."
echo
meteor deploy q42.com < password.txt
echo "Done."