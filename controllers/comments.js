

const db = require("../db/db");


let addWord = function(req, res){

    /**
     * {"word": "elephant"
     * }
     */
    let word = req.body.word;
     // get the word from the request
     if(!word){
         res.status(400).send('word is required')
         return
     }

     // this was done week 5 day 1 in class

     // send the word as an insert statement to the database
    // insert into words(word) values ("elefhant");

    let sql = `INSERT INTO words(word) values ('${word}')`; // this is like a statement in SQL
    console.log("request body words: ", word);

    db.query(sql, function(error, rows){
        if(error){
            console.log("Failed to add to database", error);
            res.sendStatus(500);
        } else {
            res.sendStatus(204);
        }
    })
}

// ****************************************************************

// for your GET
// issue the query: SELECT word FROM words
// and process the results
// if there is a error respone back with a 500 on the response
// of ther is no error,
//  1. instantiate an empty array
//  2. loop thru the results of the query, and add every word that comes back to an array
//  3. send array back to the client

let getWords = function(req, res){
    console.log("GET getWords()");

    let sql = "SELECT word FROM words;"; // this is a SQL statement

    db.query(sql, function(error, rows){
        if(error){
            res.sendStatus(500);
        } else {
            console.log("rows: ", rows)
            let wordArray =
                rows.map(function(row){
                    return row.word;
                })
            res.json(wordArray);
            
        }
    })
}


module.exports = {addWord, getWords} // list the functions to export, allow them to be read in other files