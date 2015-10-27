
# Meteor.startup -> Meteor.subscribe("work", "1")


Template.workDetail.helpers
  work: -> Work.findOne()
  prettifyDate: (date) -> "#{date.getMonth()+1}/#{date.getFullYear()}"
