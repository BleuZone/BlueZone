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
      res.status(201).send(result)
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

  postModel.deletePost(post_id, (err,result) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.status(200).send(result)
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

module.exports = {createPost, deletePost, getComments, editPost, incrementPoints, decrementPoints};