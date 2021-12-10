/**
 * @authors: Zachary Lewitton, Jodi Yeh, Joshua Boss, Arjun Rao
 */

let database = require('../../db/index.js');

/**
 * user_id: user id value from users table an int
 * callback: (err, null)
*/
let fetchUsername = (user_id, callback) => {
    database.query(`SELECT * FROM username_matching WHERE id= ?`, [user_id], (err,result) => {
        if (err) {
          callback(err, null)
        } else {
            retArray = [];
            for (let row of result) {
                let dataObj = {id: row.id, username: row.username, points: row.points};
                retArray.push(dataObj);
            }
            callback(null, JSON.stringify(retArray));
        }
      });
}

/**
 *
 * @param {int} user_id of username
 * @param {string} username to be created
 * @param {func} callback
 * Create a username associated to a user id in username_matching table
 */
let createUsername = (user_id, username, callback) => {
    database.query(`INSERT INTO username_matching(id, username, points) VALUES (?, ?, ?)`, [user_id, username, 0],(err, result) => {
        if(err){
            callback(err, null);
        }else{
            callback(null, result);
        }
    });
}

/**
 *
 * @param {int} user_id of username
 * @param {string} username to be changed
 * @param {func} callback
 * update a username for a specific user id in username_matching table
 */
let changeUsername = (user_id, username, callback) => {
    database.query(`UPDATE username_matching SET username = ? WHERE id = ?`, [username, user_id], (err, result) => {
        if (err) {
            callback(err, null);
          } else {
            callback(null, result);
          }
    });
}


/**
 *
 * @param {int} id of username
 * @param {func} callback
 * Delete the username for a specific user id in username_matching table
 * This deletes the username but does not update to (deleted) in table
 */
let deleteUsername = (id, callback) => {
    database.query(
        ` DELETE FROM username_matching WHERE id=?`, [id],
        (err,result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    })
  };

// createUsername(0, 'arjunrao', (err, result) => {
//     if(err){

// FETCH USERNAME TESTS
// fetchUsername(2, (err, result) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(result);
//     }
// });

// CREATE USERNAME TESTS
// createUsername(3, 'arjunRao', (err, result) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(result);
//     }
// });
// createUsername(2, 'zlewitton', (err, result) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log(result);
//     }
// });
// createUsername(2, 'zlewitton; AND DROP TABLE pages;', (err, result) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(result);
//     }
// })


//DELETE USERNAME TESTS
// deleteUsername(2, (err, result) => {
//     if(err){
//         console.log(err);
//     }else{
//         console.log(result);
//     }

// });



// CHANGE USERNAME TESTS
// changeUsername(2, 'zlewitton14', (err, result) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(result);
//     }
// })

module.exports = {fetchUsername, createUsername, changeUsername, deleteUsername};
