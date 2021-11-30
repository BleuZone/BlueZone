const { userModel, usernameModel, postModel, pageModel, commentModel, saveModel } = require('../Models/FunctionExports.js');
const bcrypt = require('bcrypt');


const createUser = (req, res) => {
  const reqBody = req.body;
  const user_email = reqBody.user_email;
  const password = reqBody.password;
  const saltRounds = 10;
  bcrypt.hash(reqBody.password, saltRounds, (err, hash) => {
    if(err){
      res.sendStatus(400);
    }
    else{
      userModel.createUser(user_email, hash, (err, result) => {
        if(err){
          res.sendStatus(400);
        }
        else{
          res.status(201).send(result);
        }
      });
    }
  });
}

const authenticateUser = (req, res) => {
  const reqBody = req.body;
  const user_email = reqBody.user_email;
  const user_password= reqBody.password;
  userModel.getEncryptedPassword(user_email, (err, result) => {
    if(err){
      res.status(400).send({error : "Could not get password for user"});
    }
    else{
      let hash = result.user_password;
      const user_id = result.id
      bcrypt.compare(user_password, hash, (err, result) => {
        if(err) {
          res.status(400).send({error: "Passwords do not match"})
        } else {
          res.status(201).send({user_id: user_id});
        }
      })
    }
  })
}

const saveData = (req, res) => {
  const reqBody = req.body;
  const user_id = req.params.id;
  const post_id = reqBody.post_id || null;
  const comment_id = reqBody.comment_id || null;

  saveModel.saveData(user_id, post_id, comment_id, (err, result) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.status(201).send(result);
    }
  })
}

const getSaved = (req, res) => {
  const reqBody = req.body;
  const user_id = req.params.id;
  const dataType = parseInt(req.query.type);

  if (dataType === 1) {
    saveModel.getSavedPosts(user_id, (err, result) => {
      if (err) {
        res.sendStatus(403);
      } else {
        res.status(200).send(result);
      }
    })
  } else if (dataType === 2) {
    saveModel.getSavedComments(user_id, (err, result) => {
      if (err) {
        res.sendStatus(403);
      } else {
        res.status(200).send(result)
      }
    })
  } else {
    res.status(404).send({error: 'dataType did not match 1 or 2', dataType: dataType});
  }
}

const deleteSave = (req, res) => {
  const reqBody = req.body;
  const save_id = reqBody.save_id;

  saveModel.deleteSave(save_id, (err, result) => {
    if (err) {
      res.sendStatus(400)
    } else {
      res.status(200).send(result);
    }
  })
}

module.exports = {createUser, authenticateUser, saveData, getSaved, deleteSave };

