/**
 * @authors: Zachary Lewitton, Jodi Yeh, Joshua Boss, Arjun Rao
 */


const { userModel, usernameModel, postModel, pageModel, commentModel } = require('../Models/FunctionExports.js');

const getChildPages = (req, res) => {
    const page_id = req.params.id;

    pageModel.getChildPages(page_id, (err, result) => {
        if (err) {
          res.sendStatus(404);
        } else {
          res.status(200).send(result);
        }
      })
    }

const getPosts = (req, res) => {
  const page_id = req.params.id;
  const filter = req.query.filter; //MAKE LOWERCASE AS FILTER



  postModel.getPosts(page_id, filter, (err, result) => {
    if (err) {
        res.sendStatus(400);
    } else {
        res.status(200).send(result);
    }
    })
}

const createPage = (req,res) => {
  const reqBody = req.body;
  const page_title = reqBody.page_title;
  const page_parent_id = reqBody.page_parent_id;
  const page_description = reqBody.page_description;

  pageModel.createPage(page_title,page_parent_id, page_description, (err,result) => {  
    if (err) {
        res.sendStatus(404);
      } else {
        res.status(201).send(result);
      }
    })
}

const getPageById = (req, res) => {
  const page_id = req.params.id;

  pageModel.getPageById(page_id, (err, result) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.status(200).send(result);
    }
  })
}


module.exports = {getChildPages,createPage, getPosts, getPageById};