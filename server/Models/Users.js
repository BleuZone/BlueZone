let database = require('../../db/index.js');

/**
 * userName: string
 * password: string
 * callback: function()
 */
const createUser = (user_email, user_password, callback) => {
    database.query(
        `INSERT INTO users (user_email, user_password) VALUES("${user_email}",
        "${user_password}")`, (err,result) => {
      if (err) {
        console.log(err);
      } else {
        callback(null, result);
      }
    })
  };

/**
 * Updates user_password for a certain user
 *
 * id: int
 * user_email: string
 * user_password: string
 * callback: function()
 */

 const changePassword = (id, user_email, user_password, callback) => {
    database.query(
        `UPDATE users SET user_password = '${user_password}' WHERE id = '${id}' AND user_email = '${user_email}';`, (err,result) => {
      if (err) {
        console.log(err);
      } else {
        callback(null, result);
      }
    })
  };
/**
 * checks if user exists: callback should check if there is anything returned from query
 * user_email: string
 * callback: function()
 */
const checkUserExists = (user_email, callback) => {
    database.query(
        `SELECT * FROM users WHERE user_email = '${user_email}'`, (err,result) => {
      if (err) {
        console.log(err);
      } else {
        callback(null, result);
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
        ` DELETE FROM users WHERE id="${id}"`,
        (err,result) => {
      if (err) {
        console.log(err);
      } else {
        callback(null, result);
      }
    })
  };


  //  when they delete user, really it should delete the usernames, and then change the posts associated with that user

 //tests the function by adding sample user
// createUser(
//     'arjunRao13@duke.edu',
//     'I like complex relationships',
//     (err, result) => {
//         if (err) {
//             console.log("Error creating user");
//         } else {
//             console.log(result);
//         }
//     }
// );

//  tests the function by adding sample user
// changePassword(
//     5,
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

//  tests the function by adding sample user
// checkUserExists(
//     'jsb91@duke.edu',
//     (err, result) => {
//         if (err) {
//             console.log("Error checking user");
//         } else {
//             console.log(result && result.length);
//         }
//     }
// );

//  tests the function by deleting sample user
// deleteUser(
//     7,
//     (err, result) => {
//         if (err) {
//             console.log("Error checking user");
//         } else {
//             console.log(result);
//         }
//     }
// );
