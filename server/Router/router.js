/**
 * @authors: Zachary Lewitton, Jodi Yeh, Joshua Boss, Arjun Rao
 */

const router = require('express').Router();
const PostController = require('../Controllers/PostController.js');
const PagesController = require('../Controllers/PagesController.js');
const CommentsController = require('../Controllers/CommentsController.js');
const UsersController = require('../Controllers/UsersController.js');
const SearchController = require('../Controllers/SearchController.js');

/**
 * creates new user
 */
router.route('/User')
  .post((req, res) => {
    UsersController.createUser(req,res);
  })

/**
 * returns all posts a users posted
 */
router.route('/User/:username')
  .get((req, res) => {
    UsersController.getAllUserPosts(req, res);
})

/**
 * POST: authenticaes user for login
 * PUT: returns user ID
 */
router.route('/User/login')
  .post((req, res) => {
    UsersController.authenticateUser(req, res);
  })
  .put((req, res) => {
    UsersController.getId(req, res);
  })

/**
 * POST: creates a username
 * PUT: get users' usernames
 */
router.route('/User/:id')
  .post((req, res) => {
    UsersController.createUsername(req, res);
  })
  .put((req, res) => {
    UsersController.getUsername(req, res);
  })

/**
 * POST: saves a post for a user
 * GET: get saved posts for a user
 * DELETE: delete saved post for a user
 */
router.route('/User/:id/save')
  .post((req, res) => {
    UsersController.saveData(req, res);
  })
  // get request is /User/:id/save?type=1 for posts or /User/:id/save?type=2 for comments
  .get((req, res) => {
    UsersController.getSaved(req, res);
  })
  .delete((req, res) => {
    UsersController.deleteSave(req, res);
  })

/**
 * POST: creates page
 */
router.route('/Pages')
  .post((req, res) => {
    PagesController.createPage(req, res);
  })
/**
 * GET: get's page object from it's ID
 */
router.route('/Pages/all/:id')
  .get((req, res) => {
    PagesController.getPageById(req, res);
  })

/**
 * GET: get's all the child pages for a page
 */
router.route('/Pages/:id')
  .get((req, res) => {
    PagesController.getChildPages(req, res);
  })


  /**
   * GET: gets all posts from a page
   */
router.route('/Pages/:id/posts')
  .get((req, res) => {
    PagesController.getPosts(req, res);
  })


  /**
   * POST: creates reported post
   */
router.route('/Posts/:id/reported')
.post((req,res) => {
  if(req.body.reported){
    PostController.reportPost(req,res)
  }
  else{
    PostController.unreportPost(req,res)
  }
});

/**
 * GET: get's all posts in the entire database (?)
 */
router.route('/Posts/all')
  .get((req,res) => {
    PostController.getAllPosts(req,res);
  });

/**
 * POST: create post
 * GET: get reported posts
 */
router.route('/Posts')
  .post((req, res) => {
    PostController.createPost(req, res);
  })
  .get((req,res) => {
    PostController.getReportedPosts(req,res);
  });

/**
 * GET: get comments for specified poost
 */
router.route('/Posts/:id/Comments')
  .get((req, res) => {
    PostController.getComments(req, res);
  });

/**
 * DELETE: deletes specific post
 * PUT: edits specific post
 */
router.route('/Posts/:id')
  .delete((req, res) => {
    PostController.deletePost(req, res)
  })
  .put((req, res) => {
    PostController.editPost(req, res)
  });

/**
 * PUT: Increments or Decrements number of likes on a post
 */
router.route('/Posts/:id/points')
  .put((req, res) => {
    if (req.body.increment) {
      PostController.incrementPoints(req, res)
    } else {
      PostController.decrementPoints(req, res)
    }

  });

//Comments
/**
 * POST: Create new comment
 */
router.route('/Comments')
  .post((req, res) => {
    CommentsController.createComment(req, res)
  })

/**
 * PUT: edits comment
 * DELETE: deletes comment
 */
router.route('/Comments/:id')
  .put((req, res) => {
    CommentsController.editComment(req, res);
  })
  .delete((req, res) => {
    CommentsController.deleteComment(req, res);
  })

/**
 * PUT: increments or decrements number of likes (points) for a comment
 */
router.route('/Comments/:id/points')
  .put((req, res) => {
    if (req.body.increment) {
      CommentsController.incrementPoints(req, res);
    } else {
      CommentsController.decrementPoints(req, res);
    }
  })

//Search
/**
 * PUT returns search results
 */
router.route('/Search')
  .put((req, res) => {
    SearchController.makeSearch(req, res);
  })

  module.exports = router;