TUMBLR_KEY = "9MFWwaN0dXvqXEfp8fXNFCW8b0DWczrTb7GadGwiFO4Du2WUIg";

Meteor.methods({
  checkTumblr: function()
  {
    this.unblock();
    Meteor.http.get("http://api.tumblr.com/v2/blog/blog.q42.nl/posts", {
      params: { api_key: TUMBLR_KEY, limit: 5 }
    }, function(error, result) {
      if (result.statusCode == 200 && result.data)
        for (var i = 0; i < count; i++)
          upsertPost(result.data.response.posts[i]);
    });
  },
  reimportTumblr: function(offset)
  {
    this.unblock();
    if (!offset)
    {
      Posts.remove({});
      offset = 0;
    }
    Meteor.http.get("http://api.tumblr.com/v2/blog/blog.q42.nl/posts", {
      params: { api_key: TUMBLR_KEY, limit: 20, offset: offset }
    }, function(error, result) {
      var count = result.data && result.data.response.posts.length;
      if (result.statusCode == 200 && count)
      {
        console.log("Importing " + count + " from Tumblr.")
        for (var i = 0; i < count; i++)
          upsertPost(result.data.response.posts[i]);
        Meteor.call("reimportTumblr", offset + 20);
      }
      else
        if (error)
          console.log("Error:", error);
    });
  }
})

function upsertPost(post)
{
  post.prettyDate = post.date.substr(8, 2) + "-" + post.date.substr(5, 2) + "-" + post.date.substr(0, 4);
  if (post.body)
  {
    var pos = post.body.indexOf("<!-- more -->");
    post.intro = pos > -1 ? post.body.substring(0, pos) : "";
  }
  if (!Posts.findOne({ id: post.id }))
    Posts.insert(post);
  else
    Posts.update({ id: post.id }, post);
}

var Posts = new Meteor.Collection("Posts");
if (Posts.find().count() == 0)
  Meteor.call("reimportTumblr");

Meteor.publish("blogpostIndex", function (page, tag) {
  page = page || 1;
  var filter = tag ? { tags: tag } : {};
  return Posts.find(filter, {
    limit: 12,
    skip: (page - 1) * 12,
    sort: { timestamp: -1 },
    fields: { body: false }
  });
});

Meteor.publish("blogpostFull", function (id) {
  return Posts.find({ id: id });
});