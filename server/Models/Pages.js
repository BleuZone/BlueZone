/**
 * @authors: Zachary Lewitton, Jodi Yeh, Joshua Boss, Arjun Rao
 */

let database = require('../../db/index.js');

/**
 *
 * @param {*} parent_id
 * @param {function(null, Array[object])} callback
 */
let getChildPages = (parent_id, callback) => {
  database.query(`SELECT * FROM pages WHERE page_parent_id = ? ORDER BY post_count DESC`,
    [
      parent_id
    ],
    (err, result) => {
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

/**
 *
 * @param {String} page_title
 * @param {int} page_parent_id
 * @param {String} page_description
 * @param {function} callback
 */
let createPage = (page_title, page_parent_id, page_description, callback) => {
  database.query(
    `INSERT INTO pages(page_title, page_parent_id, post_count, page_description) VALUES (?, ?, 0, ?)`,
    [
      page_title,
      page_parent_id,
      page_description
    ],
    (err, result) => {
      if (err) {
        callback(err, null)
      } else {
        database.query(`SELECT * FROM pages WHERE page_id = LAST_INSERT_ID()`, (err, result) => {
          if (err) {
            callback(err, null);
          } else {
            let retObj = {...result[0]}
            callback(null, retObj);
          }
        })
      }
    }
  );
};

/**
 *
 * @param {int} page_id
 * @param {function} callback
 */
let incrementPostCount = (page_id, callback) => {
  database.query(
    `UPDATE pages SET post_count = post_count + 1 WHERE page_id = ?`,
    [
      page_id
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
 * @param {int} page_id
 * @param {function} callback
 */
let decrementPostCount = (page_id, callback) => {
  database.query(
    `UPDATE pages SET post_count = post_count - 1 WHERE page_id = ?`,
    [
      page_id
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
 * @param {function} callback
 */
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

/**
 *
 * @param {*} page_id
 * @param {function(null, Array[object])} callback
 */
 let getPageById = (page_id, callback) => {
  database.query(`SELECT * FROM Pages WHERE page_id = ?`, [page_id],
    (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
}



// CREATE PAGE TESTS
// createPage('CS', 2, 'For comp sci stuff', (err, result) => {
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

// getChildPages(1, (err, result) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(result);
//   }
// })

// getTopPage((err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(result);
//     }
//   })

module.exports = {getChildPages, createPage, incrementPostCount, decrementPostCount, getPageById};