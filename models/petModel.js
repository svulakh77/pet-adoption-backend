const fs = require("fs");
const path = require("path");
const pathToPetsDB = path.resolve(__dirname, "../petAdoption/pets.json");
const pathToSavesDB = path.resolve(__dirname, "../petAdoption/saves.json");
const dbConnection = require("../knex/knex");

async function readAllPetsModel() {
  try {
    const petsList = await dbConnection.from("pets");
    return petsList;
  } catch (err) {
    console.log(err);
  }
}
async function joinSavedandPetsModel(ownerId){
  try {
    const joinPetsSaved = await dbConnection.from("saves").join("pets","pets.ownerId","saves.ownerId").select("*").where("saves.ownerId",ownerId)
    console.log("hi",joinPetsSaved)
    return joinPetsSaved
  } catch (error) {
    
  }
}
async function getPetByIdModel(petId) {
  try {
    const fetchedPet = await dbConnection.from("pets").where({ id: petId });
    return fetchedPet;
  } catch (err) {
    console.log(err);
  }
}
async function getPetsbyUserIdModel(userId){
  try {
    const petByUser = await dbConnection.from("pets").where({ownerId:userId})
    
    return petByUser
  } catch (error) {
    console.log(error)
  }
}
async function getSearchPetModel(selectedPets) {
  try {
    console.log(selectedPets);
    const searchedPet = await dbConnection
      .from("pets")
      .where("type", selectedPets);
    return searchedPet;
  } catch (err) {
    console.log(err);
  }
}

async function getAdvancedSearchPetModel(searchOptions) {
  try {
    console.log("hi");
    console.log(searchOptions);
    const petTypes = searchOptions["petTypes"];
    const lowerHeight = searchOptions["lowerHeight"];
    const upperHeight = searchOptions["upperHeight"];
    const lowerWeight = searchOptions["lowerWeight"];
    const upperWeight = searchOptions["upperWeight"];
    const petAdoptionStatus = searchOptions["adoptionStatus"];
    const petsName = searchOptions["name"];

    const results = await dbConnection.from("pets").where(function () {
        this.whereIn("type", petTypes).orWhere(!petTypes);
      })
      .andWhere(function () {
        this.whereBetween("height", [lowerHeight, upperHeight]);
      })
      .andWhere(function () {
        this.whereBetween("weight", [lowerWeight, upperWeight]);
      })
      .andWhere(function () {
        this.whereIn("adoptionStatus", petAdoptionStatus).orWhere(
          !petAdoptionStatus
        );
      })
      .andWhere(function () {
        this.where("petName", petsName).orWhere(!petsName);
      });

    return results;
  } catch (err) {
    console.log(err);
  }
}

async function addPetModel(newPet) {
  try {
    console.log(newPet);
    const [id] = await dbConnection.from("pets").insert(newPet);
    return id;
  } catch (err) {
    console.log(err);
  }
}

async function deletePetModel(petId) {
  try {
    const deleted = await dbConnection.from("pets").where({ id: petId }).del();
    return deleted;
  } catch (err) {
    console.log(err);
  }
}
async function adoptionStatusPetModel(body) {
  const { id, ownerId, adoptionStatus } = body;
  try {
    const adopted = await dbConnection
      .from("pets")
      .where({ id: id })
      .update({ adoptionStatus: adoptionStatus, ownerId: ownerId });
      console.log(adopted);
      return adopted
  } catch (error) {
    console.log(error);
  }
}
async function returnPetModel(body){
  const { id } = body;
  try {
    const returned = await dbConnection
      .from("pets")
      .where({ id: id })
      .update({ adoptionStatus: "Available", ownerId: 0 });
      console.log(returned);
      return returned
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  readAllPetsModel,
  addPetModel,
  deletePetModel,
  getPetByIdModel,
  getSearchPetModel,
  getAdvancedSearchPetModel,
  adoptionStatusPetModel,
  returnPetModel,
  getPetsbyUserIdModel,
  joinSavedandPetsModel
};
