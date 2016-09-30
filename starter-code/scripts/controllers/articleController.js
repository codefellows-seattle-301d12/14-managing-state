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
    1. ctx = url /articles/id
    2. We will then call Article.findWhere and returns the value of the article
    sorted by ID and it will call a callback function articleData.
    3. articleData will assign ctx.articles the sorted article and then it will
    call the next function.

  */
  articleController.loadById = function(ctx, next) {
    var articleData = function(article) {
      ctx.articles = article;
      next();
    };
    Article.findWhere('id', ctx.params.id, articleData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  /*
     1.ctx = url /author/author name
     2.when article.findWhere is called tht author's name elected from drop down
     and replacing any space by '+' sign, and call authorData funcetion.
     3.authorData is passing the atricle filtered by author name
     set ctx property of article by articleByAuthor.
     4.next function transfer controlls to page.js
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
  /*
   1.ctx = url /category/category Name
   2.when article.findWhere is called it is taking the category and
   updateing url by that name and then invokes categoryData.
   3.categoryData function is essentialy taking the return sql value
   and passing it as the parameter of categoryData.
   4.on line 65 we are setting the property of ctx.articles as the return
   sql value
   5. next function is been invoked which gives back the controll to the
   page.js.
  */
  articleController.loadByCategory = function(ctx, next) {
    var categoryData = function(articlesInCategory) {
      ctx.articles = articlesInCategory;
      next();
    };

    Article.findWhere('category', ctx.params.categoryName, categoryData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  /*
  1.when loadAll is called it will check length of the aticle.allArticles array
  and if there are articles in the array it will display them on the page
  2.then transfer controll to the page.js
  3. if array is empty it will grab the json file by calling fetchAll function.
  and passing the data collected by json file as articleData.
  4.then taking the value of article data and displaying them on the page.
  5. then invoves the next function and passes controll to page.js
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
