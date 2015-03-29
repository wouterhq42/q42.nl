@getMeteorSetting = (name) ->
	if Meteor.settings[name]
		return Meteor.settings[name]
	else if process.env[name]
		return process.env[name]
	else if METEOR_SETTINGS
		return JSON.parse(METEOR_SETTINGS)[name]
	else
		throw new Error "Couldn't load settings."