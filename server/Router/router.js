const router = require('express').Router();
const PostController = require('../Controllers/PostController.js');
const PagesController = require('../Controllers/PagesController.js');
const CommentsController = require('../Controllers/CommentsController.js');
const UsersController = require('../Controllers/UsersController.js');


//Users:

router.route('/User')
  .post((req, res) => {
    UsersController.createUser(req,res);
  })

router.route('/User/:id')
  .put((req, res) => {
    res.send(404);
  })

//Pages (or Groups)

router.route('/Pages')
  .post((req, res) => {
    PagesController.createPage(req, res);
  })

router.route('/Pages/:id')
  .get((req, res) => {
    PagesController.getChildPages(req, res);
  })

router.route('/Pages/:id/posts')
  .get((req, res) => {
    PagesController.getPosts(req, res);
  })

//Posts

router.route('/Posts')
  .post((req, res) => {
    PostController.createPost(req, res);
  });

router.route('/Posts/:id/Comments')
  .get((req, res) => {
    //add this function to posts models
    //PostController.getPostComments(req, res)
    PostController.getComments(req, res);
  });

router.route('/Posts/:id')
  // .get((req, res) => {
  //   PostController.getSinglePost(req, res);
  // })
  .delete((req, res) => {
    PostController.deletePost(req, res)
  })
  .put((req, res) => {
    PostController.editPost(req, res)
  });

  //maybe add a flag to points function for increment or decrement- both in same route
  //Req.body needs an increment boolean
router.route('/Posts/:id/points')
  .put((req, res) => {
    if (req.body.increment) {
      PostController.incrementPoints(req, res)
    } else {
      PostController.decrementPoints(req, res)
    }

  });


//Comments

router.route('/Comments')
  .post((req, res) => {
    CommentsController.createComment(req, res)
  })

router.route('/Comments/:id')
  .put((req, res) => {
    CommentsController.editComment(req, res);
  })
  .delete((req, res) => {
    CommentsController.deleteComment(req, res);
  })

// Req.body needs increment as a boolean
router.route('/Comments/:id/points')
  .put((req, res) => {
    if (req.body.increment) {
      CommentsController.incrementPoints(req, res);
    } else {
      CommentsController.decrementPoints(req, res);
    }
  })



  module.exports = router;