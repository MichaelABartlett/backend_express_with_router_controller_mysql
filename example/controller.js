
const db = require('./db');

let mysql = require("mysql");

// POST
let addIngredient = function(req, res){
    console.log("Inside addIngredient");
    /**
     * { 'ingredient',
     * 'preptime',
     * 'instruction'
     * }
     */

    let ingredient = req.body.ingredient;
    let preptime = req.body.preptime;
    let instruction = req.body.instruction;
     // get the word from the request
    //let word = req.body.word;

    console.log("right before if statement")
    // inserting a response if client does not enter a field
    if(!ingredient){
        console.log("looking at missing ingredient")
        res.status(400).send('ingredient is required')
        return
      } else if (!preptime){
        console.log("looking at missing preptime")
        res.status(400).send('preptime is required')
          return
      } else if(!instruction){
        console.log("looking at missing instruction")
        res.status(400).send('instruction is required')
          return
      } else 
        console.log("made it thru the if statement")
       
    console.log("made it past if statment")
     // this was done week 5 day 1 in class

     // send the word as an insert statement to the database
    // insert into words(word) values (variabel word/ this is entered by client);

    let sql = "INSERT INTO ingredients (ingredient, preptime, instruction) values ( ? , ? , ? )"
    //console.log("request body words: ", word);

    let params = [];
    params.push(ingredient);
    params.push(preptime);
    params.push(instruction);


    db.query(sql, params,function(error, rows){
        if(error){
            console.log("Failed to add to database", error);
            res.sendStatus(500); // if something went wrong
        } else {
            res.sendStatus(204); // letting client know everything went good
        }
    })
}

// ****************************************************************

// for your LIST
// issue the query: SELECT * FROM ingredients
// and process the results
// if there is a error respone back with a 500 on the response
// if there is no error send back the result,

// LIST
let listIngredients = function(req, res){
    console.log("LIST listIngredients()");

    let sql = "SELECT * FROM ingredients;"; // this is a SQL statement to list everything in the ingreadients table

    db.query(sql, function(error, rows){
        if(error){
            res.sendStatus(500);
        } else {
            console.log("rows: ", rows)
            res.json(rows);
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

// GET
let getIngredients = function(req, res){
    console.log("GET getIngredients()");

    let sql = "SELECT ingredient FROM ingredients;"; // this is a SQL statement to put all ingredient colum in a array

    db.query(sql, function(error, rows){
        if(error){
            res.sendStatus(500);
        } else {
            console.log("rows: ", rows)
            let ingredientArray =
                rows.map(function(row){
                    return row.ingredient;
                })
            res.json(ingredientArray);
            
        }
    })
}

// ******************************************************************************************


// look at find method to find the item in ingredients table (object)
// put is almost the same use as referance

let deleteIngredientByIngredient = (req, res) => {
    deleteItem = req.params.ingredient; // this is the request from the client
    // DELETE FROM USERS WHERE INGREDIENT = <REQ PARAMS INGREDIENT>
    let sql = `delete from ingredients where ingredient = '${deleteItem}' ;` // fish will need to be replaced
   
    console.log("ingredient to delete: ", deleteItem);
      
    db.query(sql, (err, results) => {
        if(err){
            console.log("the error is: ", err)
            res.sendStatus(500); // why is it sending this
        } else {
            console.log("The ingredient deleted is: ", deleteItem)
            res.sendStatus(204)
            }
        })
  }

// ********************************************************************

// select ingredient and then change instructions
// router.put("/put", controller.putIngredients)

let putIngredients = (req, res) => {
    console.log("Inside PUT");

    let ingredient = req.body.ingredient;
    let instruction = req.body.instruction;
    console.log("ingredient: ", ingredient)
    console.log("instructions: ", instruction)
//     update ingredients set instruction = 'this is a change'
// where ingredient = 'eggs';


    let sql = `update ingredients set instruction = '${instruction}'  where ingredient =  '${ingredient}' `;

    // let params = [];
    // params.push(ingredient);
    // params.push(instruction);

    //console.log("params: ", params.json)

    db.query(sql, function(error, rows){
        if(error){
           
            console.log("Failed to change to database", error);
            res.sendStatus(500); // if something went wrong
        } else {
            console.log("sql: ",sql)
            console.log("It got to the end, did anything happen?")
            res.sendStatus(204); // letting client know everything went good
        }
    })
}


// list the functions to export, allow them to be read in other files
module.exports = { addIngredient, getIngredients, deleteIngredientByIngredient, listIngredients, putIngredients } 