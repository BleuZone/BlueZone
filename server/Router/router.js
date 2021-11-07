const router = require('express').Router();
const PostController = require('../Controllers/PostController.js')


//Users:

router.route('/User')
  .post((req, res) => {
    PostPostControllers.addUser(req, res);

  });

// router.route('/User/:id')
//   .delete((req, res))
//   .put((req, res))

//Pages (or Groups)

//Posts
const testPost = {
  username: 'jsboss5',
  post_title: 'The best post ever',
  post_body: 'I\'m writing the best post ever',
  page_id : '1',
  creation_time : '2021-11-06 23:45:02'
}
router.route('/Posts')
  .post((req, res) => {
    PostController.createPost(req, res);
  });

router.route('/Posts/:id/Comments')
  .get((req, res) => {
    //add this function to posts models
    //PostControllers.getPostComments(req, res)
  });

router.route('/Posts/:id')
  .get((req, res) => {
    PostControllers.getPosts(req, res);
  })
  .delete((req, res) => {
    PostControllers.deletePost(req, res)
  })
  .put((req, res) => {
    PostControllers.editPost(req, res)
  });

  //maybe add a flag to points function for increment or decrement- both in same route
router.route('/Posts/Points/:id')
  .put((req, res) => {
    PostControllers.incrementPoints(req, res)
  });


//Comments

router.route('/Comments')
  .get((req, res) => {
    PostControllers.getComments(req, res)
  })
  .post((req, res) => {
    PostControllers.createComment(req, res)
  })
  .put((req, res) => {
    PostControllers.editComment(req, res)
  })
  .delete((req, res) => {
    PostControllers.deleteComment(req, res)
  });

router.route('/')

router.route('/posts')
  .get((req, res) => {

  })

  module.exports = router;