@Utils = {

  # return the correct name of the template
  # depending on the current language
  getTemplate: (name) ->
    if Session.equals("lang", "en") then "en_#{name}" else name

  # return the pages to be displayed as pagination on the blog
  getPagination: (pageNum, tag) ->
    pageNum = pageNum * 1
    item = PageCounts.findOne tag: (tag or "")
    pages = if item then item.count else 1
    lang = Session.get "lang"
    older = if lang is "en" then "older" else "ouder"
    newer = if lang is "en" then "newer" else "nieuwer"
    items = []

    if pages isnt 1
      page = pageNum or 1
      if page > 1
        items.push label: newer, page: page - 1

      min = Math.max 1, page - 3
      max = Math.min pages, page + 3

      for i in [min..max]
        items.push label: i, page: i, active: i is page

      if page < pages
        items.push label: older, page: page + 1

    return items

  # if the page is reloaded with a hash in the url,
  # scroll to the correct position
  setScrollPosition: ->
    if window.location.hash
      $el = $(window.location.hash)
      if $el[0]
        Meteor.setTimeout (-> $el[0].scrollIntoView()), 100
      else
        Meteor.setTimeout (-> Utils.setScrollPosition()), 1000
    else
      window.scrollTo 0,0

  # set the correct <title> and meta info
  setTitleAndMeta: ->
    if (
      Session.equals("page", "home") or
      Session.equals("page", "") or
      Session.equals("page", undefined)
    )
      document.title = "Q42"
    else
      document.title = $('h1').first().text() + " - Q42"

    $("meta[property='og:title']").attr "content", document.title
    $("meta[property='og:url']").attr "content", window.location.href
    $("meta[property='og:image']").attr(
      "content",
      $( ".block-large img:first-of-type").attr("src")
    )

    desc = $(".blog-post p:not(.post-date)").first().text()
    desc = $("p:first-of-type").first().text() unless desc
    $("meta[property='og:description']").attr "content", desc

  getPictureURL: (user) ->
    anon = "http://static.q42.nl/images/employees/anonymous.jpg"
    s = user.services
    switch
      when not user or not user.services then anon
      when s.twitter then s.twitter.profile_image_url
      when s.google then s.google.picture
      when s.facebook then "https://graph.facebook.com/#{s.facebook.id}/picture"
      when s.github then Gravatar.imageUrl(s.github.email or "")
      else anon

}
