// Helper to easily construct templates for multiple languages
$Template = function(templates) {
  _.each(templates, function(values, tmpl) {
    Template["en_" + tmpl].helpers(values);
    Template[tmpl].helpers(values);
  });
}