let database = require ('../../db/index.js');

let getPosts = (id, callback) => {
    database.query('SELECT * FROM posts WHERE post_id= ?', [id], (err,result) => {
      if (err) {
        console.log(err);
      } else {
        callback(null, result);
      }
    })
  };

let addPost = (post_id, post_title, post_body, points, page_id, creation_time, comment_count, username, callback) => {
  database.query(`INSERT INTO posts(post_id, post_title, post_body, points, page_id, creation_time, comment_count, username) VALUES (${post_id}, '${post_title}', ${post_body}, ${points}, ${page_id}, ${creation_time}, ${comment_count}, ${username})`, (err, result) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, result)
    }
  })
};

let updatePostPoints = (post_id, points, callback) => {
  database.query(`UPDATE posts SET points = ${points} WHERE post_id = ${post_id}'`, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
}

let getPageID = (post_id, callback) => {
  database.query(`SELECT page_id FROM posts WHERE post_id = ${post_id}`, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
}

let updatePostBody = (post_id, post_body,callback) => {
  database.query(`UPDATE posts SET post_body = ${post_body} WHERE post_id = ${post_id}'`, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
}

  
  getPosts(1, (err, result) => {
    if (err) {
      console.error('error getting posts');
    } else {
      console.log(result);
    }
  });