const { userModel, usernameModel, postModel, pageModel, commentModel } = require('../Models/FunctionExports.js');

const createPost = (req, res) => {
  console.log(postModel);
  const reqBody = req.body;
  console.log(req);
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

module.exports = {createPost};