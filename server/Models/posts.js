/**
 * @authors: Zachary Lewitton, Jodi Yeh, Joshua Boss, Arjun Rao
 */

const e = require('express');
let database = require ('../../db/index.js');
const { report } = require('../Router/router.js');

/**
 *
 * @param {int} page_id
 * @param {function(err, result)} callback
 */
let getPosts = (page_id, filter, callback) => {
  let insert = null;
  if (filter === 'new') {
    insert = `creation_time DESC`;
  } else {
    insert = `points DESC`;
  }
  let retArray = [];
  database.query(`SELECT * FROM posts WHERE page_id=? ORDER BY ${insert}`, [page_id], (err,result) => {
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
      database.query(`SELECT * FROM posts WHERE post_id = LAST_INSERT_ID()`, (err, result) => {
        if (err) {
          callback(err, null)
        } else {
          let retObj = {...result[0]};
          callback(null, retObj)
        }
      })
      //callback(null, result)
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
};

let searchPosts = (search_query, callback) => {
  let retArray = [];
  database.query(
    `SELECT * FROM posts WHERE post_title like ? OR post_body like ?`,
    [
      '%' + search_query + '%',
      '%' + search_query + '%'
    ],
    (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        result.map(row => {
          retArray.push({ ...row});
        })
        callback(null, retArray);
      }
    }
  );
};

/**
 * This function moves the report either to the reported or posts table
 * @param {int} post_id
 * @param {function} callback
 */
 let unreportPost = (post_id, callback) => {
     database.query(
    `INSERT INTO posts SELECT * FROM reported WHERE post_id = ?`,[post_id,],
    (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    }
  );
};

/**
 * This function deletes a reported post from the reported table
 * @param {int} post_id
 * @param {function} callback
 */
 let deleteReportedPost = (post_id, callback) => {
  database.query(
 `DELETE FROM reported WHERE post_id = ?`,
 [
   post_id,
 ],
 (err, result) => {
  if (err) {
    callback(err, null);
  } else {
    callback(null, result);
  }
});
}

/**
 * This function moves the post to the correct table and deletes it from the last
 * @param {int} post_id
 * @param {function} callback
 */
 let reportPost = (post_id, callback) => {
    database.query(
      `INSERT INTO reported SELECT * FROM posts WHERE post_id = ?`,
      [
        post_id,
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
 * This function returns the reported posts
 * @param {function(err, result)} callback
 */
 let getReportedPosts = (callback) => {

  let retArray = [];
  database.query(`SELECT * FROM reported `, (err,result) => {
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
 * This function returns the reported posts
 * @param {function(err, result)} callback
 */
 let getAllPosts = (callback) => {
  let retArray = [];
  database.query(`SELECT * FROM posts `, (err,result) => {
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

// REPORT POSTS TESTS

//getReportedPosts((err,result) => {
//  if(err){
//    console.loge(err);
//  }
//  else{
//    console.log(result);
//  }
//});

//deleteReportedPost(10,(err,result) => {
//  if(err){
//    console.log(err);
//  }
//  else{
//    console.log(result);
//  }
//})

//unreportPost(6, true, (err,result) => {
//  if(err){
//    console.log(err);
//  }
//  else{
//    console.log(result);
//  }
//})

//reportPost(8,true,(err,result) => {
//  if(err){
//    console.log(err);
//  }
//  else{
//    console.log(result);
//  }
//})

    


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
// createPost('English Department', 'Thoughts on whether the department is any good?', 4, '2021-11-08 16:27:40', 'zlewitton', (err, result) => {
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

// Search POSTS TESTS
// searchPosts("bEsT", (err, result) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(result);
//   }
// })

module.exports = {getPosts, createPost, createPost, editPost, deletePost, incrementPoints, decrementPoints, incrementCommentCount, decrementCommentCount, searchPosts, reportPost, deleteReportedPost,unreportPost, getReportedPosts, getAllPosts};