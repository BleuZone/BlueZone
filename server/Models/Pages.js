let database = require('../../db/index.js');

let getChildPages = (parent_id, callback) => {
  database.query(`SELECT * FROM pages WHERE page_parent_id = ${parent_id} ORDER BY post_count DESC`, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      let resultArray = [];
      result.map((data) => {
        resultArray.push({ ...data});
      });
      callback(null, resultArray);
    }
  });
}

let addPage = (page_title, parent_page, page_parent_id, callback) => {
  database.query(`INSERT INTO pages(page_title, parent_page, page_parent_id, post_count) VALUES ('${page_title}', ${parent_page}, ${page_parent_id}, 0)`, (err, result) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, result)
    }
  })
};

let incrementPostCount = (page_id, callback) => {
  database.query(`UPDATE pages SET post_count = post_count + 1 WHERE page_id = ${page_id}`, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
}

let decrementPostCount = (page_id, callback) => {
  database.query(`UPDATE pages SET post_count = post_count - 1 WHERE page_id = ${page_id}`, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
}

let getTopPage = (callback) => {
  database.query(`SELECT * FROM pages WHERE page_parent_id is NULL`, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      let resultArray = [];
      result.map((data) => {
        resultArray.push({ ...data});
      });
      callback(null, resultArray);
    }
  });
}

// addPage('Group Page 5', 1, 0, (err, result) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(result);
//   }
// });

// incrementPostCount(1, (err, result) => {
//   if (err){
//     console.log(err);
//   } else {
//     console.log(result);
//   }
// });

// decrementPostCount(1, (err, result) => {
//   if (err){
//     console.log(err);
//   } else {
//     console.log(result);
//   }
// });

getChildPages(0, (err, result) => {
  if (err) {
    console.log(err);
  } else {
    console.log(result);
  }
})

// getTopPage((err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(result);
//     }
//   })
