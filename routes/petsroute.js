const express = require("express");

const router = express.Router();

router.get("/pets", (req, res) => {
//   The get pets API is responsible for retrieving pets that match the criteria given.
// Can receive query parameters to search the database
// Retrieve results to match query. If no parameters are passed it should return all the results.
// Should only return the fields necessary 

  res.send("");
});

router.post("/pets", (req, res) => {
//   The add pet api is responsible for adding new pets
// Validate all the user input is valid
// Handle photo upload
// Store pet information in the database

  res.send("");
});

router.get("/pets/:id", (req, res) => {
  // Get a pet by ID should take an id and return the corresponding pet from the database. 
  res.send("");
});
router.put("/pets/:id",(req,res)=>{
//   The add pet api is responsible for editing pets
// Validate all the user input is valid
// Handle photo upload
// Store pet information in the database

  res.send('')
})
router.post("/pets/:id/adopt", (req, res) => {
//   The Adopt/Foster API is responsible for adding the pet to the current users pets.
// This API also should change the pet’s adoption status. 

// Field: 
// Type (Adopt or foster)

  res.send("");
});
router.post("/pets/:id/return",(req,res)=>{
//   The Return Pet API is responsible for returning the pet to the agency. 
// The API should change the pets status back to available
// The API should remove the pet from the users pets.

  res.send("")
});
router.post("/pets/:id/save",(req,res)=>{
//   The save PET api allows a user to save a pet for later
// The saved pet should be stored as saved in the users account

  res.send("")
});
router.delete("/pets/:id/save",(req,res)=>{
  // The save PET api allows a user to remove a saved pet.
  res.send("")
})
module.exports = router;
