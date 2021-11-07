const { userModel, usernameModel, postModel, pageModel, commentModel } = require('../Models/FunctionExports.js');

const createComment = (req,res) => {
  const reqBody = req.body;
  const username = reqBody.username;
  const comment = reqBody.comment;
  const parent_id = reqBody.parent_id;
  const post_id = reqBody.post_id;
  const creation_time = reqBody.creation_time;

  commentModel.createComment(username,comment,parent_id,post_id,creation_time, (err,result) => {
    if (err) {
        res.sendStatus(405);
      } else {
        res.status(201).send(result);
      }
    })
}

const editComment = (req,res) => {
  const comment_id = req.params.id;
  const comment = reqBody.comment;
  commentModel.editComment(comment_id, comment, (err, result) => {
      if (err) {
          res.sendStatus(400);
      }
      else {
          res.status(202).send(result);
      }
  })
}

const deleteComment = (req,res) => {
    const comment_id = req.params.id;
    const comment = reqBody.comment;
    commentModel.deleteComment(comment_id, comment, (err, result) => {
        if (err) {
            res.sendStatus(400);
        }
        else {
            res.status(202).send(result);
        }
    })
  }

const incrementPoints = (req, res) => {
    const comment_id = req.params.id;
    commentModel.incrementPoints(comment_id, (err,result) => {
        if (err) {
            res.sendStatus(406);
        }
        else {
            res.status(202).send(result)
        }
    })
}

const decrementPoints = (req, res) => {
    const comment_id = req.params.id;
    commentModel.decrementPoints(comment_id, (err,result) => {
        if (err) {
            res.sendStatus(406);
        }
        else {
            res.status(202).send(result)
        }
    })
}

module.exports = {createComment, editComment, deleteComment, incrementPoints, decrementPoints};