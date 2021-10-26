let database = require('../../db/index.js');

let getComments = (post_id, callback) => {
  //commentChain with fake data: [comment, username, points, comment_id, {subcomments: [subcomment1, user, points, subcomments: {sub-subcomment1, }]}]


  let retArray = [];

  let organizeComments = (parent_id, level) => {
    let subComments = []

    let query_id = null;
    if (parent_id) {
      query_id = `= ${parent_id}`;
    } else {
      query_id = `IS NULL`;
    }

    database.query(`SELECT * FROM comments WHERE parent_id ${query_id} ORDER BY points DESC`, (err, result) => {
      if (err) {
        console.log(err); // Returns as there are no more queries to make
        return;
      } else {
        //Map through results (each row)
        result.map((row) => {
          console.log("Parent id is: ", parent_id);
          let commentObject = {
            username: row.username,
            comment: row.comment,
            post_id: row.post_id,
            creation_time: row.creation_time,
            points: row.points,
            subComments: [],
            level: level
          };
          commentObject.subComments = organizeComments(row.comment_id, level+1);
          if (!parent_id) {
            retArray.push(commentObject);
            callback(null, retArray);
          } else {

          }
        })
      }
    });

  }
  organizeComments(null, 0);

}

// getComments(2, (err, result) => {
//   if (err) {
//     console.log("This is an error: ", err);
//   } else {
//     console.log("This is the result data: ", result)
//   }
// })


let testAsnyc = () => {
  console.log('first')
  let test = database.query(`select * from comments`);
  console.log(test);
  console.log('second');
  return test;
};

testAsnyc();