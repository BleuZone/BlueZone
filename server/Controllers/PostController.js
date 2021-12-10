/**
 * @authors: Zachary Lewitton, Jodi Yeh, Joshua Boss, Arjun Rao
 */


const { userModel, usernameModel, postModel, pageModel, commentModel } = require('../Models/FunctionExports.js');

const createPost = (req, res) => {
  const reqBody = req.body;

  const post_title = reqBody.post_title;
  const post_body = reqBody.post_body;
  const page_id = reqBody.page_id;
  const creation_time = reqBody.creation_time;
  const username = reqBody.username;

  postModel.createPost(post_title, post_body, page_id, creation_time, username, (err, result) => {
    if (err) {
      res.sendStatus(400);
    } else {
      let postResult = result;
      pageModel.incrementPostCount(page_id, (err, result) => {
        if (err) {
          res.sendStatus(401);
        } else {
          res.status(201).send(postResult);
        }
      })

    }
  })
}

// const getSinglePost = (req, res) => {
//   const reqBody = req.body;
//   const post_id = req.params.id
// }

const getComments = (req, res) => {
  const post_id = req.params.id;

  commentModel.getComments(post_id, (err, result) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.status(200).send(result);
    }
  })
}

const deletePost = (req, res) => {
  const post_id = req.params.id;
  const reqBody = req.body;
  const page_id = reqBody.page_id;

  postModel.deletePost(post_id, (err,result) => {
    if (err) {
      res.sendStatus(404);
    } else {
      let postResult = result;
      pageModel.decrementPostCount(page_id, (err, result) => {
        if (err) {
          res.sendStatus(401);
        } else {
          res.status(201).send(postResult);
        }
      })
    }
  })
}

const editPost = (req, res) => {
  const reqBody = req.body;
  const post_id = req.params.id;
  const post_body = reqBody.post_body;
  const post_title = reqBody.post_title;

  postModel.editPost(post_id, post_title, post_body, (err,result) => {
    if (err) {
      res.sendStatus(204);
    } else {
      res.status(201).send(result)
    }
  })
}

const incrementPoints = (req, res) => {
  const post_id = req.params.id;

  postModel.incrementPoints(post_id, (err,result) => {
    if (err) {
      res.sendStatus(202);
    } else {
      res.status(406).send(result)
    }
  })
}

const decrementPoints = (req, res) => {
  const post_id = req.params.id;

  postModel.decrementPoints(post_id, (err,result) => {
    if (err) {
      res.sendStatus(202);
    } else {
      res.status(406).send(result)
    }
  })
}

/**
 * This function unreports a post and moves it back
 * @param {*} req 
 * @param {*} res 
 */
 const reportPost = (req,res) => {
  const post_id = req.params.id;
  postModel.reportPost(post_id, (err,result) => {
    if (err) {
      res.sendStatus("This post does not exist in the posts, it may be reported already.");
    } else {
      let postResult = result;
      postModel.deletePost(post_id, (err, result) => {
        if (err) {
          res.sendStatus(401).send("This post does not exist in the posts, it may be reported already. Cannot be deleted.");
        } else {
          res.status(201).send(result);
        }
      })
    }
  })
}

/**
 * This function reports a post and moves it from the post table to the reported table
 * @param {*} req 
 * @param {*} res 
 */
 const deleteReportedPost = (req,res) => {
  const post_id = req.params.id;

  postModel.deleteReportedPost(post_id, (err,result) => {
    if (err) {
      res.sendStatus(204);
    } else {
      res.status(201).send(result)
    }
  })
}

/**
 * This function unreports a post and moves it back
 * @param {*} req 
 * @param {*} res 
 */
 const unreportPost = (req,res) => {
  const post_id = req.params.id;
  postModel.unreportPost(post_id, (err,result) => {
    if (err) {
      res.sendStatus(404).send("The post is not already reported");
    } else {
      let postResult = result;
      postModel.deleteReportedPost(post_id, (err, result) => {
        if (err) {
          res.sendStatus(401).send("The post is not already reported");
        } else {
          res.status(201).send(result);
        }
      })
    }
  })
}

/**
 * This function returns all reported posts
 * @param {*} req 
 * @param {*} res 
 */
 const getReportedPosts = (req,res) => {
  postModel.getReportedPosts((err,result) => {
    if (err) {
      res.sendStatus(204);
    } else {
      res.status(201).send(result)
    }
  })
}

/**
 * This function returns all reported posts
 * @param {*} req 
 * @param {*} res 
 */
 const getAllPosts = (req,res) => {
  postModel.getAllPosts((err,result) => {
    if (err) {
      res.sendStatus(204);
    } else {
      res.status(201).send(result)
    }
  })
}



module.exports = {createPost, deletePost, getComments, editPost, incrementPoints, decrementPoints, deleteReportedPost,reportPost, unreportPost, getReportedPosts, getAllPosts};