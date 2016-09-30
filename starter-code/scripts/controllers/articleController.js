(function(module) {
  var articleController = {};

  Article.createTable();

  articleController.index = function(ctx, next) {
    if(ctx.articles.length) {
      articleView.index(ctx.articles);
    } else {
      page('/');
    }
  };

  // COMMENT: What does this method do?  What is it's execution path?
  /*
  1. findWhere is a SQL call that will select all articles from the articles table with the field id
  and the value of the id property of the params property of the ctx object, which it gets from the
  URL placeholder, and then invokes articleData, passing in the response from the SQL call.
      and the articleData function accepts the parameter of one article
  2. This function takes the parameters of ctx and next, and it defines an articleData function
  3.. Then it sets the articles property on the ctx object equal to the article that gets passed into it
  4. Then it calls the next function, which is articleController.index, and that one checks if the articles
  property on the ctx object has a length, if so, it calls articleView.index, IF NOT, it makes a page call
  where the url is the root.
  */
  articleController.loadById = function(ctx, next) {
    var articleData = function(article) {
      ctx.articles = article;
      next();
    };
    Article.findWhere('id', ctx.params.id, articleData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  /* 1. findWhere is a SQL call that will select all authors from the authors table with the field 'author'
  and the value of the author name property of the params property of the ctx object (with all + replaced with a ' '), which it gets from the URL placeholder, and then calls the function authorData (which functions as above)
    2. authorData sets ctx.articles equal to the response from our SQL query, then calls (next), which is articleController.index, which is explained above.
  */
  articleController.loadByAuthor = function(ctx, next) {
    var authorData = function(articlesByAuthor) {
      ctx.articles = articlesByAuthor;
      next();
    };

    Article.findWhere(
      'author', ctx.params.authorName.replace('+', ' '), authorData
    );
  };

  // COMMENT: What does this method do?  What is it's execution path?
  /*Same as above, except with category instead of author :)
  */
  articleController.loadByCategory = function(ctx, next) {
    var categoryData = function(articlesInCategory) {
      ctx.articles = articlesInCategory;
      next();
    };

    Article.findWhere('category', ctx.params.categoryName, categoryData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  /*1. If Article.allArticles has any content (or a length) then ctx.articles is equal to all of our articles, and next is called.
    2. If not (no length) then we call fetchAll which passes in the function articleData (which sets ctx.articles equal to allArticles and calls next)
  */
  articleController.loadAll = function(ctx, next) {
    var articleData = function(allArticles) {
      ctx.articles = Article.allArticles;
      next();
    };

    if (Article.allArticles.length) {
      ctx.articles = Article.allArticles;
      next();
    } else {
      Article.fetchAll(articleData);
    }
  };

  module.articleController = articleController;
})(window);
