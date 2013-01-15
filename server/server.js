TUMBLR_KEY = "9MFWwaN0dXvqXEfp8fXNFCW8b0DWczrTb7GadGwiFO4Du2WUIg";

Meteor.methods({
  checkTumblr: function()
  {
    this.unblock();
    Meteor.http.get("http://api.tumblr.com/v2/blog/blog.q42.nl/posts", {
      params: { api_key: TUMBLR_KEY, limit: 5 }
    }, function(error, result) {
      if (result.statusCode == 200 && result.data)
      {
        for (var i = 0; i < result.data.response.posts.length; i++)
        {
          var post = result.data.response.posts[i];
          var pos = post.body.indexOf("<!-- more -->");
          post.intro = pos > -1 ? post.body.substring(0, pos) : "";
          if (!Posts.findOne({ id: post.id }))
            Posts.insert(post);
          else
            Posts.update({ id: post.id }, post);
        }
      }
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
        {
          var post = result.data.response.posts[i];
          if (post.body)
          {
            var pos = post.body.indexOf("<!-- more -->");
            post.intro = pos > -1 ? post.body.substring(0, pos) : "";
          }
          Posts.insert(post);
        }
        if (Posts.find().count() < result.data.response.total_posts)
          Meteor.call("reimportTumblr", offset + 20);
      }
      else
        if (error)
          console.log("Error:", error);
    });
  }
})

var Posts = new Meteor.Collection("Posts");
if (Posts.find().count() == 0)
  Meteor.call("reimportTumblr");