#!/bin/bash

BRANCH=`git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/\1/'`

if [ "$BRANCH" != 'master' ]; then
        echo "You need to be in the master branch."
        exit 1;
fi

meteor deploy q42.nl < password.txt
meteor deploy www.q42.nl < password.txt
meteor deploy q42.com < password.txt
meteor deploy www.q42.com < password.txt