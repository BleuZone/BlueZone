let database = require ('../../db/index.js');

/**
 *
 * @param {int} page_id
 * @param {function(err, result)} callback
 */
let getPosts = (page_id, callback) => {
  let retArray = [];
  database.query(`SELECT * FROM posts WHERE page_id=? ORDER BY points DESC`, [page_id], (err,result) => {
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

/**
 *
 * @param {string} post_title
 * @param {string} post_body
 * @param {int} page_id
 * @param {string of timestamp form (YYYY-MM-DD HH:MM:SS)} creation_time
 * @param {string} username
 * @param {function(err, result)} callback
 */
let createPost = (post_title, post_body, page_id, creation_time, username, callback) => {
  database.query(`INSERT INTO posts(post_title, post_body, points, page_id, creation_time, comment_count, username) VALUES (?, ?, ?, ?, ?, ?, ?)`, [post_title, post_body, 0, page_id, creation_time, 0, username], (err, result) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, result)
    }
  })
};

/**
 *
 * @param {int} post_id
 * @param {function(err, result)} callback
 */
const deletePost = (post_id, callback) => {
  database.query(`DELETE from posts WHERE post_id = ?`, [post_id], (err, result) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, result)
    }
  });
};

/**
 *
 * @param {int} post_id
 * @param {string} post_title
 * @param {string} post_body
 * @param {function(err, result)} callback
 */
let editPost = (post_id, post_title, post_body, callback) => {
  database.query(`UPDATE posts SET post_title=?, post_body=? WHERE post_id=?`, [post_title, post_body, post_id], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

/**
 *
 * @param {int} post_id
 * @param {function(err, result)} callback
 */
let incrementPoints = (post_id, callback) => {
  database.query(`UPDATE posts SET points = points + 1 WHERE post_id = ?`, [post_id], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
}

/**
 *
 * @param {int} post_id
 * @param {function(err, result)} callback
 */
let decrementPoints = (post_id, callback) => {
  database.query(`UPDATE posts SET points = points - 1 WHERE post_id=?`, [post_id], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result)
    }
  });
}

/**
 *
 * @param {int} post_id
 * @param {function} callback
 */
 let incrementCommentCount = (post_id, callback) => {
  database.query(
    `UPDATE posts SET comment_count = comment_count + 1 WHERE post_id = ?`,
    [
      post_id
    ],
    (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    }
  );
}

/**
 *
 * @param {int} post_id
 * @param {function} callback
 */
let decrementCommentCount = (post_id, callback) => {
  database.query(
    `UPDATE posts SET comment_count = comment_count - 1 WHERE post_id = ?`,
    [
      post_id
    ],
    (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    }
  );
}


// GET POSTS TESTS
// getPosts(1, (err, result) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(result);
//   }
// })

// CREATE POST TESTS (post_title, post_body, page_id, creation_time, username, callback)
// createPost('My second post!', 'I cannot believe this is the seocnd post I have ever created!!! What a joy. Is this site this great for you too? I cannot believe how good it is. I want to; SELECT * FROM USERS. I love this website so so much. Dont you? ???? ??? -- DROP TABLE pages.', 1, '2021-11-5 16:34:07', 'zlewitton', (err, result) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(result);
//   }
// });
// createPost('test', 'test', 1, '2021-11-06 16:48:40', 'zlewitton', (err, result) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(result);
//   }
// })

// DELETE POST TESTS
// deletePost(3, (err, result) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(result);
//   }
// })

// EDIT POST TESTS (post_id, post_title, post_body, callback)
// editPost(4, 'NEW TEST POST', 'DID THE TEST OF THE TEST WORK?', (err, result) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(result);
//   }
// });

// ADD POINTS TESTS
// addPoints(1, (err, result) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(result);
//   }
// })

// DELETE POINTS TESTS
// deletePoints(1, (err, result) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(result);
//   }
// })

// ADD COMMENTS TEST
// incrementCommentCount(9, (err, result) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(result);
//   }
// })

// DELETE COMMENTS TEST
// decrementCommentCount(9, (err, result) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(result);
//   }
// })

module.exports = {getPosts, createPost, createPost, editPost, deletePost, incrementPoints, decrementPoints, incrementCommentCount, decrementCommentCount };