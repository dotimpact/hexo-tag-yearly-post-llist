var Post = hexo.database.model('Post');

hexo.extend.tag.register('yearly_post_list', function(args) {
  var dateStr = args[0];
  var tag = args[1] || null;
  var startDate, endDate;

  if(dateStr.length == 4) {
    startDate = (new Date(dateStr.substr(0, 4), 0, 1));
  } else {
    startDate = (new Date()).setDate(1);
  }
  endDate = new Date(startDate.getFullYear()+1, 0, 1);

  p = Post.find({$and : [
    {date : { $gte : startDate}},
    {date : { $lte : endDate}}
  ]}).sort("date");

  var lists = "";
  p.forEach(function(post) {
    if(!tag || (tag && post.tags.find({name: tag}).length > 0 )) {
      lists += '<li><a href="/' + post.path + '">' + post.title + " [" + post.date.format("MM/DD") +']</a></li>'
    }
  })

  return '<ul>' + lists + '</ul>';
});
