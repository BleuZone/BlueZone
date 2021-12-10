/**
 * @authors: Zachary Lewitton, Jodi Yeh, Joshua Boss, Arjun Rao
 */

let database = require('../../db/index.js');

/**
 * userName: string
 * password: string (should be hashed and salted before this step)
 * callback: function()
 */
const createUser = (user_email, user_password, callback) => {
    database.query(`INSERT INTO users (user_email, user_password) VALUES (?, ?)`
    , [user_email, user_password], (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        database.query(`SELECT id, user_email FROM users WHERE id = LAST_INSERT_ID()`, (err, result) => {
          if (err) {
            callback(err, null)
          } else {
            let retObj = {...result[0]};
            callback(null, retObj)
          }
        })
      }
    })
  };

/**
 * Updates user_password for a certain user
 *
 * id: user id (int)
 * user_email: string
 * user_password: string (should be hashed before this step)
 * callback: function()
 */
 const changePassword = (id, user_email, user_password, callback) => {
    database.query(`UPDATE users SET user_password = ? WHERE id = ? AND user_email = ?`, [user_password, id, user_email],
    (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    })
  };

/**
 * NOT SURE IF WE NEED THIS
 * checks if user exists: callback should check if there is anything returned from query
 * user_email: string
 * callback: function()
 */
const getEncryptedPassword = (user_email, callback) => {
  database.query(
    `SELECT user_password, id FROM users WHERE user_email = ?`, [user_email], (err,result) => {
      if(err) {
        callback(err, null);
      }
      else {
        userObject = {id: result[0].id, user_password: result[0].user_password};
        callback(null, userObject);
      }
    });
}

  /**
 * deletes user with given id
 * id: int
 * callback: function()
 */
  const deleteUser = (id, callback) => {
    database.query(
        ` DELETE FROM users WHERE id=?`, [id],
        (err,result) => {
      if (err) {
                callback(err, null);
      } else {
        callback(null, result);
      }
    })
  };

/**
 * gets username
 * id: int
 * callback: function()
 */
  const getUsername = (id, callback) => {
    database.query(
        ` SELECT username FROM username_matching WHERE id=?`, [id],
        (err,result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    })
  };

  /**
 * gets username
 * email: char
 * callback: function()
 */
  const getId = (email, callback) => {
    database.query(
        ` SELECT id FROM users WHERE user_email=?`, [email],
        (err,result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    })
  };

    /**
 * gets all posts from a user given username
 * callback: function()
 */
  const getAllUserPosts = (username, callback) => {
    let retArray = [];
    database.query(
        ` SELECT * FROM posts WHERE username=?`, [username],
        (err,result) => {
      if (err) {
        callback(err, null);
      } else {
        result.map((row) => {
          retArray.push({ ...row});
        })
        callback(null, retArray);
      }
    })
  };


// GET ALL USER POSTS TESTS
  
// getAllUserPosts(
//     'zlewitton',
//     (err, result) => {
//         if (err) {
//             console.log("Error creating user");
//         } else {
//             console.log('Success! ', result);
//         }
//     }
// );


  //  when they delete user, really it should delete the usernames, and then change the posts associated with that user

// CREATE USER TESTS
// createUser(
//     'zlew@me.edu',
//     'HASHEDPASSWORD',
//     (err, result) => {
//         if (err) {
//             console.log("Error creating user");
//         } else {
//             console.log('Success! ', result);
//         }
//     }
// );


// CHANGE PASSWORD TESTS
// changePassword(
//     3,
//     'arjunRao13@duke.edu',
//     'passwordFIDFIIF',
//     (err, result) => {
//         if (err) {
//             console.log("error changing password");
//         } else {
//             console.log(result);
//         }
//     }
// );

// CHECK USER TESTS
// checkUserExists(
//     'jsb91@duke.edu',
//     (err, result) => {
//         if (err) {
//             console.log("Error checking user");
//         } else {
//             console.log(result);
//         }
//     }
// );

// DELETE USER TESTS
// deleteUser(
//     6,
//     (err, result) => {
//         if (err) {
//             console.log("Error checking user");
//         } else {
//             console.log(result);
//         }
//     }
// );

// GET ENCRYPTED PASSWORD TESTS
// getEncryptedPassword('arjun@him.com', (err, result) => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(result);
//   }
// });

module.exports = {createUser, changePassword, getEncryptedPassword, deleteUser, getId, getUsername, getAllUserPosts};
