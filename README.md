# Q42.nl runs on Meteor!

We've published the source code to q42.nl and q42.com here for your perusal.

If you find anything on our site that you feel needs fixing, be it code, spelling or anything else,
don't hesitate to send us a pull request or create an issue. We maintain the site ourselves with the same workflow.

# Getting the damn thing to run
Sounds like it'll be a royal pain in the butt ey? Guess again amigo.

### Fork and checkout this project
The hard bit since the repo is around ~100MB

	git clone https://github.com/[YOURUSERNAME]/q42.nl.git

### Install meteor

	curl https://install.meteor.com | /bin/sh

### But I have Windows

Visit http://win.meteor.com/ for instructions on how to get Meteor running on Windows.

### Install the Meteorite package manager

	sudo npm install -g meteorite

### Install packages locally

	mrt install

### Add a tumblr API key

Create a file in the server/lib directory called `tumblr_api_key.js` that declares the `TUMBLR_KEY` constant:

	TUMBLR_KEY = "MY_KEY";

This is required for the blog to not explode (even though you won't actually be able to see any posts without our real API key).

### Set up the CDN

	We are now serving all assets from a Google Cloud Storage bucket. To set this up on your machine you're going to need the `gsutil` command line utility. Info on how to get this running and other details you might be interested in are found here:

	https://developers.google.com/storage/docs/gsutil_install

	The `gsutil` command is used by the `deploy.sh` script when deploying the site. It will publish all the assets to the CDN for you automatically! Unfortunately, to be able to do this you need to have write access to the bucket. Which you probably don't have. So you won't be able to deploy the site. If this happens, just get in touch with Rahul (http://github.com/primigenus) and he can add you to the list.

### cd into checkout and run meteor

	cd q42.nl
	meteor

# Deploying

Since you need to deploy to two separate sites (q42.nl and q42.com), there's a script which will take care of both commands. Just run:

	./deploy.sh

Deploying is protected by a password which you should place in `password.txt` in the root followed by a newline.

# Contributing

Content for the site is located in the /views folder as regular .html files, so if you want to edit some content, just
navigate to that file and edit it! A really fast way to clean up spelling mistakes and similar small problems is to just
load the repository on Github and use its built-in editor to edit files. Github will automatically fork the project for you
and submit a pull request. Yay!

# License?

There is no license. This is the code for our website, copyright Q42. You can browse the source and learn from our mishaps,
but please don't re-use the code elsewhere or redistribute it.
