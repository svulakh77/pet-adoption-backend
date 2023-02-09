const express = require("express");
const petController = require("../controllers/petsController")
const router = express.Router();
const {upload,auth,generateUrl}=require("../middleware/middleware")

router.get("/search/basic", petController.basicSearchPet);

router.get("/search/advanced",petController.advancedSearched);
router.get("/",petController.getAllPets);

router.get("/saves/:ownerId",petController.joinSavedPets)

router.post("/newPet", auth, upload.single('pic'), generateUrl,petController.addPet);
// Validate all the user input is valid





router.get("/:id", petController.getPetById);
 
router.put("/:id/adopt", auth, petController.changePetStatus);

router.put("/:id/return",petController.returnPet);

router.post("/:id/save",(req,res)=>{
//   The save PET api allows a user to save a pet for later
// The saved pet should be stored as saved in the users account

  res.send("")
});
router.delete(":id/save",petController.deletePet)
  // The save PET api allows a user to remove a saved pet.
router.get("/user/:ownerId",auth, petController.getPetsByUserId)
// This api allows a user to get the pets owned by (or saved) by a user based on the user id.
module.exports = router;
