Lights = new Meteor.Collection "lights"
NUM_LIGHTS = 29

@updateLightbar = ->
	lights = _.map Lights.find().fetch(), (doc) -> "#" + doc.hex
	lights = [
		lights[9]  or "#9fc" # area42 corner
		lights[0]  or "#c9f" # stef's office
		lights[4]  or "#f66" # rijksmuseum team
		lights[23] or "#cf9" # cynthia's desk
		lights[26] or "#9cf" # hue team office
		lights[14] or "#9cf" # kitchen
	]

	if Lights.find().count() is NUM_LIGHTS
		$header = $("#header")
		$grad = $("#header-bg-gradient")

		# $header.css "background", "-webkit-linear-gradient(left, #{lights})"
		# $header.css "background", "-moz-linear-gradient(left, #{lights})"
		# $grad.css "opacity", 0
		# Meteor.setTimeout ->
		# 	$grad.css
		# 		background: "-webkit-linear-gradient(left, #{lights})"
		# 		background: "-moz-linear-gradient(left, #{lights})"
		# 		opacity: 1
		# 	Session.set "lightsColor", lights[0]
		# , 400

Meteor.startup ->
	Deps.autorun ->
		Meteor.subscribe "lights"
		updateLightbar()