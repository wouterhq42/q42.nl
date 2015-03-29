Meteor.startup ->
  Kadira.connect getMeteorSetting("KADIRA_ACCOUNT_ID"), getMeteorSetting("KADIRA_ACCOUNT_KEY")