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
 * @param {int} user_id
 * @param {string} username
 * @param {function(err,null)} callback
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
 * @param {int} user_id
 * @param {string} username
 * @param {function(err, result)} callback
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

// CHANGE USERNAME TESTS
// changeUsername(2, 'zlewitton14', (err, result) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(result);
//     }
// })

module.exports = {fetchUsername, createUsername, changeUsername};
