/**
 * @authors: Zachary Lewitton, Jodi Yeh, Joshua Boss, Arjun Rao
 */


let database = require ('../../db/index.js');

/**
 *
 * @param {int} user_id
 * @param {int} post_id
 * @param {int} comment_id
 * @param {function(err, result)} callback
 */
const saveData = (user_id, post_id, comment_id, callback) => {
  database.query(`INSERT INTO saving(user_id, post_id, comment_id) VALUES (?, ?, ?)`, [user_id, post_id, comment_id], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
}

/**
 *
 * @param {int} user_id
 * @param {function(err, result)} callback
 */
const getSavedPosts = (user_id, callback) => {
  database.query(`SELECT posts.post_id, posts.post_title, posts.post_body, posts.points, posts.page_id, posts.creation_time, posts.comment_count, posts.username, saving.save_id, saving.user_id FROM posts INNER JOIN saving ON posts.post_id = saving.post_id WHERE user_id = ?`, [user_id], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      let retArray = []
      for (let savedPost of result) {
        retArray.push({...savedPost});
      }
      callback(null, retArray);
    }
  })
}

/**
 *
 * @param {int} user_id
 * @param {function(err, result)} callback
 */
const getSavedComments = (user_id, callback) => {
  database.query(`SELECT comments.comment_id, comments.username, comments.comment, comments.parent_id, comments.post_id, comments.creation_time, comments.points, saving.save_id, saving.user_id FROM comments INNER JOIN saving ON comments.comment_id = saving.comment_id WHERE user_id = ?`, [user_id], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      let retArray = [];
      for (let savedComment of result) {
        retArray.push({...savedComment})
      }
      callback(null, retArray);
    }
  })
}

/**
 * 
 * @param {int} save_id 
 * @param {func} callback 
 */
const deleteSave = (save_id, callback) => {
  database.query(`DELETE from saving WHERE save_id = ?`, [save_id], (err, result) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, result)
    }
  });
};

// Save Posts Tests
// saveData(3, null, 4, (err, result) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(result);
//   }
// })

// getSavedPosts Tests
// getSavedPosts(3, (err, result) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(result);
//   }
// })

// getSavedComments Tests
// getSavedComments(3, (err, result) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(result);
//   }
// })

// deleteSave Tests
// deleteSave(3, (err, result) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(result);
//   }
// })

module.exports = { saveData, getSavedPosts, getSavedComments, deleteSave };