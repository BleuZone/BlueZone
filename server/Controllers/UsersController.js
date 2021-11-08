const { userModel, usernameModel, postModel, pageModel, commentModel } = require('../Models/FunctionExports.js');
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

module.exports = {createUser};

