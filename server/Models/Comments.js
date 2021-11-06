let database = require('../../db/index.js');
const util = require('util');

const dbQuery = util.promisify(database.query).bind(database);

const getComments = (post_id, callback) => {
  let rawData = recurseQuery(post_id, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      console.log(result);
    }
  })
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

getComments(1, (err, result) => {
  if (err) {
    console.log(err);
  } else {
    console.log(result);
  }
});