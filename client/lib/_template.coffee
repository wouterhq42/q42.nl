# Helper to easily construct templates for multiple languages
@$Template = (templates)  -> _.each templates, (values, tmpl) ->
  _tmpl("helpers", tmpl, values)
@$Events = (tmpl, events) -> _tmpl("events", tmpl, events)
@$OnRendered = (tmpl, fn) -> _tmpl("onRendered", tmpl, fn)

_tmpl = (type, tmpl, obj) ->
  Template["en_#{tmpl}"]?[type] obj
  Template[tmpl][type] obj
