Meteor.startup ->
  Kadira.connect Meteor.settings.KADIRA_ACCOUNT_ID or "", Meteor.settings.KADIRA_ACCOUNT_KEY or ""
