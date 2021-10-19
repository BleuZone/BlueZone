let database = require('../../db/index.js');

let getComments = (post_id, callback) => {
  //commentChain with fake data: [comment, username, points, comment_id, {subcomments: [subcomment1, user, points, subcomments: {sub-subcomment1, }]}]
  let commentChain = []
  let organizeComments = (parent_id, level) => {
    database.query(`SELECT * FROM comments WHERE pose_id = ${post_id} AND `)
  }
  database.query(`SELECT * FROM comments WHERE post_id = ${post_id} ORDER BY points DESC`)
}