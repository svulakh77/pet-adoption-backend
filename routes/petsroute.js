const express = require("express");
const petController = require("../controllers/petsController")
// const { auth } = require('../middleware/middleware');
const router = express.Router();
const {upload,auth,generateUrl}=require("../middleware/middleware")

router.get("/", petController.getAllPets);
//   The get pets API is responsible for retrieving pets that match the criteria given.
// Can receive query parameters to search the database
// Retrieve results to match query. If no parameters are passed it should return all the results.
// Should only return the fields necessary 


router.post("/newPet", auth, petController.addPet);
//   The add pet api is responsible for adding new pets
// Validate all the user input is valid
// Handle photo upload




router.get("/:id", petController.getPetById);
  // Get a pet by ID should take an id and return the corresponding pet from the database. 
 
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
router.delete(":id/save",petController.deletePet)
  // The save PET api allows a user to remove a saved pet.


module.exports = router;
