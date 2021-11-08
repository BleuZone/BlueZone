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

const authenticateUser = (req, res) => {
  const reqBody = req.body;
  const user_email = reqBody.user_email;
  const user_password= reqBody.user_password;
  userModel.getEncryptedPassword(user_email, (err, result) => {
    if(err){
      res.sendStatus(400);
    }
    else{
      const hash = result.user_password;
      const user_id = result.id
      bcrypt.compare(user_password, hash, (err, result) => {
        if(err) {
          res.sendStatus(400);
        } else {
          res.status(201).send({user_id: user_id});
        }
      })
    }
  })


}

module.exports = {createUser, authenticateUser};

