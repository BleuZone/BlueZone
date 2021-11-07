const router = require('express').Router();
const PostController = require('../Controllers/PostController.js')
const PageController = require('../Controllers/PagesController.js')


//Users:

router.route('/User')
  .post((req, res) => {
    PostPostController.addUser(req, res);

  });

// router.route('/User/:id')
//   .delete((req, res))
//   .put((req, res))

//Pages (or Groups)

router.route('/Pages')
  .post((req, res) => {
    PageController.createPage(req, res);
  })

router.route('/Pages/:id')
  .get((req, res) => {
    PageController.getChildPages(req, res);
  })

//Request body will have increment as a boolean
router.route('/Pages/:id/postcount')
  .put((req, res) => {
    if (req.body.increment) {
      PageController.incrementPosts(req, res);
    } else {
      PageController.decrementPosts(req, res);
    }
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
  .get((req, res) => {
    PostController.getComments(req, res)
  })
  .post((req, res) => {
    PostController.createComment(req, res)
  })
  .put((req, res) => {
    PostController.editComment(req, res)
  })
  .delete((req, res) => {
    PostController.deleteComment(req, res)
  });

router.route('/')

router.route('/posts')
  .get((req, res) => {

  });


  module.exports = router;