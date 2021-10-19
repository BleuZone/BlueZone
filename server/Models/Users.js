let database = require('../../db/index.js');

/**
 * userName: string
 * password: string
 * callback: function()
 */
let createUser = (email, password, callback) => {
    database.query(
        `INSERT INTO users (user_email, user_password) VALUES("${email}",
        "${password}")`, (err,result) => {
      if (err) {
        console.log(err);
      } else {
        callback(null, result);
      }
    })
  };

createUser(
    'arjunRao13@duke.edu',
    'I like complex relationships',
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    }
);



/*
1. create user
2. update Password
3.

*/