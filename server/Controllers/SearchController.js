/**
 * @authors: Zachary Lewitton, Jodi Yeh, Joshua Boss, Arjun Rao
 */


const { response } = require('express');
const { userModel, usernameModel, postModel, pageModel, commentModel } = require('../Models/FunctionExports.js');

const makeSearch = (req, res) => {
    const searchQuery = req.body.searchQuery;

    //  TODO - split query into individual words. Loop through words and search for all items with those words
    //  exlude words like the, in, to, ...ect
    //  then create map mapping the id's of the comments/posts to their frequency, reuturn in order of highest score
    //  eventually use elastic or somethign better... for now we will search the whole query

    let queryResults = [];

    let numErrors = 0;


    postModel.searchPosts(searchQuery, (err, result)=>{
        if(err){
            numErrors = 1;
        }
        else{
            queryResults.push(...result);
        }
    });

    commentModel.searchComments(searchQuery, (err, result)=>{
        if(err){
            if(numErrors ==1){
                res.sendStatus(400)
            }
            else{
                res.status(200).send(queryResults);
            }
        }
        else{
            queryResults.push(...result);
            res.status(200).send(queryResults);
        }
    });

}


module.exports = {makeSearch};

