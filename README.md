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

Meteor doesn't currently support Windows. Buy a Mac!

### Install the Meteorite package manager

	sudo npm install -g meteorite
	
### Add a tumblr API key

Create a file in the server/lib directory called `tumblr_api_key.js` that declares the `TUMBLR_KEY` constant:

	TUMBLR_KEY = "MY_KEY";
	
This is required for the blog to not explode (even though you won't actually be able to see any posts without our real API key).

### cd into checkout and run meteorite

	cd q42.nl
	mrt

# Contributing

Content for the site is located in the /views folder as regular .html files, so if you want to edit some content, just
navigate to that file and edit it! A really fast way to clean up spelling mistakes and similar small problems is to just
load the repository on Github and use its built-in editor to edit files. Github will automatically fork the project for you
and submit a pull request. Yay!

# License?

There is no license. This is the code for our website, copyright Q42. You can browse the source and learn from our mishaps,
but please don't re-use the code elsewhere or redistribute it.
