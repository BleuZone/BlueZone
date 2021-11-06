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
        callback(null, result);
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
const checkUserExists = (user_email, callback) => {
  database.query(
        `SELECT EXISTS(SELECT * FROM users WHERE user_email='${user_email}')`, (err,result) => {
      if (err) {
        console.log(err);
      } else {
        const resultObject = result[0];
        const keys = Object.keys(resultObject);
        callback(null, resultObject[keys[0]]);
      }
    })
  };

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


module.exports = {createUser, changePassword, checkUserExists, deleteUser};