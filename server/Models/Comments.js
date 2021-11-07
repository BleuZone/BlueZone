let database = require('../../db/index.js');
const util = require('util');

const dbQuery = util.promisify(database.query).bind(database);

/**
 *
 * @param {int} post_id
 * @param {func} callback
 */
const getComments = (post_id, callback) => {
  let rawData = recurseQuery(post_id, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  })
}

let sortComments = (commentArray) => {

  for (let comment of commentArray) {

  }
}

const recurseQuery = (post_id, callback) => {
  database.query(
    `WITH RECURSIVE cte (comment_id, username, comment, parent_id, post_id, creation_time, points) as (
      select comment_id, username, comment, parent_id, post_id, creation_time, points
       FROM comments
        WHERE post_id = ${post_id}
        UNION ALL
        SELECT p.comment_id, p.username, p.comment, p.parent_id, p.post_id, p.creation_time, p.points
        FROM comments p
        INNER JOIN cte ON p.parent_id = cte.comment_id
        )
        SELECT DISTINCT * FROM cte;
        `, (err, result) => {
          if (err) {
            callback(err, null);
          } else {
            retArray = []
            for (let row of result) {
              let commentObject = {
                comment_id: row.comment_id,
                username: row.username,
                comment: row.comment,
                parent_id: row.parent_id,
                post_id: row.post_id,
                creation_time: row.creation_time,
                points: row.points,
                subComments: []
              }
              retArray.push(commentObject);
            }
            callback(null, retArray);
          }
        }
  )
}

/**
 *
 * @param {String} username
 * @param {String} comment
 * @param {int} parent_id
 * @param {int} post_id
 * @param {TimeStamp strings} creation_time
 * @param {*} callback
 */
const createComment = (username, comment, parent_id, post_id, creation_time, callback) => {
  database.query('INSERT INTO comments (username, comment, parent_id, post_id, creation_time, points) VALUES (?, ?, ?, ?, ?, 0)',
  [
    username,
    comment,
    parent_id,
    post_id,
    creation_time
  ],
  (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

/**
 *
 * @param {int} comment_id
 * @param {String} comment
 * @param {function} callback
 */
const editComment = (comment_id, comment, callback) => {
  database.query('UPDATE comments SET comment = ? WHERE comment_id = ?',
  [
    comment,
    comment_id
  ],
  (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

/**
 *
 * @param {int} comment_id
 * @param {function} callback
 */
const deleteComment = (comment_id, callback) => {
  database.query('DELETE FROM comments WHERE comment_id = ?',
  [
    comment_id
  ],
  (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

/**
 *
 * @param {int} comment_id
 * @param {function} callback
 */
let incrementPoints = (comment_id, callback) => {
  database.query(
    'UPDATE comments SET points = points + 1 WHERE comment_id = ?',
    [
      comment_id
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

const decrementPoints = (comment_id, callback) => {
  database.query(
    'UPDATE comments SET points = points - 1 WHERE comment_id = ?',
    [
      comment_id
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

// getComments(1, (err, result) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(result);
//   }
// });

// createComment('zlewitton', 'this is my second comment', 1, 1, '2021-11-5 20:33:58', (err, result) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(result);
//   }
// });

// editComment(5, 'Ive edited my second comment!', (err, result) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(result);
//   }
// });

// deleteComment(5, (err, result) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(result);
//   }
// });

// incrementPoints(6, (err, result) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(result);
//   }
// });

// decrementPoints(6, (err, result) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(result);
//   }
// });

module.exports = {getComments, createComment, editComment, deleteComment, incrementPoints, decrementPoints};