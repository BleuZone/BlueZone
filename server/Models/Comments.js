let database = require('../../db/index.js');

let getComments = (post_id, callback) => {
  //commentChain with fake data: [comment, username, points, comment_id, {subcomments: [subcomment1, user, points, subcomments: {sub-subcomment1, }]}]
  let commentObject = {
    username: '',
    comment: '',
    points: '',
    creationTime: '',
    subComments: {}
  };
  // let commentChain = []
  // let organizeComments = (parent_id, level) => {
  //   database.query(`SELECT * FROM comments WHERE post_id = ${parent_id}`, (err, result) => {
  //     if (err) {
  //       return;
  //     } else {

  //     }
  //   })
  // }
  database.query(`SELECT * FROM comments WHERE post_id = ${post_id} ORDER BY points DESC`, (err, result) => {
    if(err) {
      callback(err, null)
    } else {
      console.log("The result object is: ", result);
      for (let x = 0; x < result.length; x++) {
        console.log(result[x].comment_id);
      }
      // let data = JSON.parse(JSON.stringify(result));
      // console
    }
  });
}

getComments(2, (err, result) => {
  if (err) {
    console.log(err);
  } else {
    console.log(result)
  }
})