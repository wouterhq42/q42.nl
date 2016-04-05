# Q42.nl & Q42.com

We've published the source code to [q42.nl](https://q42.nl) and
[q42.com](https://q42.com) here for your perusal.

If you find anything on our site that you feel needs fixing, be it code,
spelling or anything else, don't hesitate to send us a pull request or create
an issue. We maintain the site ourselves with the same workflow.

The site is built with [Meteor](http://meteor.com).

## Configure your editor

Make sure your editor has support for .editorconfig, and .jshintrc.

## Add settings you need

Create a `config/settings.json` file containing the correct Tumblr and Kadira
account information:

```
{
	"TUMBLR_KEY": "myTumblrKey",
	"kadira": {
		"appId": "myKadiraAppId",
		"appSecret": "myKadiraAppSecret"
	}
}
```

The Tumblr key is required for the blog to not explode (even though you won't
actually be able to see any posts without our real API key). If you misconfigure
Kadira, you'll just get console errors. You can get a hold of the keys in the
"q42.nl" vault in 1Password.

## Running the site locally

	meteor --settings config/settings.json

Or use this script so you don't have to remember the above:

	./run.sh

# Optional stuff to set up

## Slack chat integration

In order to get this working you need to call a Meteor method named
`setupChatConfig` and pass it your incoming and outgoing webhook tokens from
Slack. Or you can not do this, and then nothing will change except that the
chat won't work.

# Deploying

First you need the following prerequisites:

 - Git Flow, which you can get here:
	 https://github.com/nvie/gitflow/wiki/Installation -- note you'll need to
	 `git flow init` whole on the `develop` branch, as the gitflow state isn't
	 checked in to the repository. At init time, choose 'master' for production
	 releases and 'develop' for next release (the defaults). Choose the defaults
	 for all others too (feature/, release/, hotfix/, support/, empty).
 - `gcloud` command line tool, from https://cloud.google.com/sdk/. install,
 	 then authenticate using `gcloud auth login`.
 - Access to the two environments on http://scalingo.com (q42nlsite and
	 q42comsite). Ask rahul or lukas.
 - Access to GCS bucket static.q42.nl a
   https://console.developers.google.com/project/504623166341/storage/browser.
   Ask rahul or lukas.

Then, add the two Scalingo Git Remotes:

    git remote add scalingo-nl git@scalingo.com:q42nl-site.git
    git remote add scalingo-en git@scalingo.com:q42comsite.git

Since you need to deploy to two separate sites (q42.nl and q42.com), there's a
script which will take care of both commands. Just run:

	./deploy.sh

# Contributing

Content for the site is located in the /views folder as regular .html files, so
if you want to edit some content, just navigate to that file and edit it! A
really fast way to clean up spelling mistakes and similar small problems is to
just load the repository on Github and use its built-in editor to edit files.
Github will automatically fork the project for you and submit a pull request.

# Credits

We use the reblog icon by Yo Szczepanska from the Noun Project:
http://thenounproject.com/term/reblog/7116/ (CC BY 3.0).

# License?

There is no license. This is the code for our website, copyright Q42. You can
browse the source and learn from our mishaps,
but please don't re-use the code elsewhere or redistribute it.
