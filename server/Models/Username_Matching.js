let database = require('../../db/index.js');

let fetchUsername = (user_id, callback) => {
    database.query(`SELECT * FROM username_matching WHERE id= ${user_id}`, (err,result) => {
        if (err) {
          callback(err, null)
        } else {
          callback(null, result);
        }
      });
}
let createUsername = (user_id, username, callback) => {
    database.query(`INSERT INTO username_matching(id, username, points) VALUES (${user_id}, '${username}', ${0})`, (err, result) => {
        if(err){
            callback(err, null);
        }else{
            callback(null, result);
        }
    });
}

createUsername(0, 'arjunrao', (err, result) => {
    if(err){
        console.log(err);
    }else{
console.log(result);
    }
});

fetchUsername(0, (err, result) => {
    if(err){
        console.log(err);
    }else{
        console.log(result);
    }
    
});



