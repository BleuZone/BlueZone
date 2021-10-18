let database = require('../../db/index.js');

let getPages = (id, callback) => {
  database.query('SELECT * FROM pages WHERE page_id= ?', [id], (err,result) => {
    if (err) {
      console.log(err);
    } else {
      callback(null, result);
    }
  })
};

let getChildPages = (parent_id, callback) => {
  database.query(`SELECT * FROM pages WHERE page_parent_id = ${parent_id} ORDER BY post_count DESC`, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
}

let addPage = (page_id, page_title, parent_page, page_parent_id, callback) => {
  database.query(`INSERT INTO pages(page_id, page_title, parent_page, page_parent_id) VALUES (${page_id}, '${page_title}', ${parent_page}, ${page_parent_id})`, (err, result) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, result)
    }
  })
};

let updatePostCount = (page_id, callback) => {
  database.query(`UPDATE pages SET post_count = post_count + 1 WHERE page_id = ${page_id}`, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
}

// getPages(1, (err, result) => {
//   if (err) {
//     console.error('error getting pages');
//   } else {
//     console.log(result);
//   }
// });

// addPage(5, 'Group Page 5', 1, 0, (err, result) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(result);
//   }
// });

// updatePostCount(0, (err, result) => {
//   if (err){
//     console.log(err);
//   } else {
//     console.log(result);
//   }
// });

// getChildPages(0, (err, result) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(result);
//   }
// })

