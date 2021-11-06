let database = require('../../db/index.js');

/**
 * 
 * @param {*} user_id of username
 * @param {*} callback 
 * Fetch username for specific user id from username_matching table
 */
let fetchUsername = (user_id, callback) => {
    database.query(`SELECT * FROM username_matching WHERE id= ${user_id}`, (err,result) => {
        if (err) {
          callback(err, null)
        } else {
          callback(null, result);
        }
      });
}

/**
 * 
 * @param {*} user_id of username
 * @param {*} username to be created
 * @param {*} callback 
 * Create a username associated to a user id in username_matching table
 */
let createUsername = (user_id, username, callback) => {
    database.query(`INSERT INTO username_matching(id, username, points) VALUES (${user_id}, '${username}', ${0})`, (err, result) => {
        if(err){
            callback(err, null);
        }else{
            callback(null, result);
        }
    });
}

/**
 * 
 * @param {*} user_id of username
 * @param {*} username to be changed
 * @param {*} callback 
 * update a username for a specific user id in username_matching table
 */
let changeUsername = (user_id, username, callback) => {
    database.query(`UPDATE username_matching SET username = '${username}' WHERE id = ${user_id}`, (err, result) => {
        if (err) {
            callback(err, null);
          } else {
            callback(null, result);
          }
    });
}

/**
 * 
 * @param {*} id of username
 * @param {*} callback 
 * Delete the username for a specific user id in username_matching table
 * This deletes the username but does not update to (deleted) in table
 */
let deleteUsername = (id, callback) => {
    database.query(
        ` DELETE FROM username_matching WHERE id="${id}"`,
        (err,result) => {
      if (err) {
        console.log(err);
      } else {
        callback(null, result);
      }
    })
  };

// createUsername(0, 'arjunrao', (err, result) => {
//     if(err){
//         console.log(err);
//     }else{
// console.log(result);
//     }
// });

// fetchUsername(0, (err, result) => {
//     if(err){
//         console.log(err);
//     }else{
//         console.log(result);
//     }
    
// });

// changeUsername(2, 'zachary', (err, result) => {
//     if(err){
//         console.log(err);
//     }else{
//         console.log(result);
//     }
    
// });

// deleteUsername(2, (err, result) => {
//     if(err){
//         console.log(err);
//     }else{
//         console.log(result);
//     }
    
// });



