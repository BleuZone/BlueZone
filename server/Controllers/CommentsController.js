/**
 * @authors: Zachary Lewitton, Jodi Yeh, Joshua Boss, Arjun Rao
 */

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
        let commentResult = result;
        postModel.incrementCommentCount(post_id, (err, result) => {
          if (err) {
            res.sendStatus(401);
          } else {
            res.status(201).send(commentResult);
          }
        })
      }
    })
}

const editComment = (req,res) => {
  const comment_id = req.params.id;
  const reqBody = req.body;
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
    const reqBody = req.body;
    const post_id = reqBody.post_id;
    commentModel.deleteComment(comment_id, (err, result) => {
        if (err) {
            res.sendStatus(400);
        }
        else {
        let commentResult = result;
        postModel.decrementCommentCount(post_id, (err, result) => {
            if (err) {
            res.sendStatus(401);
            } else {
            res.status(201).send(commentResult);
          }
        })
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