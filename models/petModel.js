const fs = require("fs");
const path = require("path");
const pathToPetsDB = path.resolve(__dirname, "../petAdoption/pets.json");
const dbConnection = require("../knex/knex");

async function readAllPetsModel() {
  try {
    const petsList = await dbConnection.from("pets");
    return petsList;
  } catch (err) {
    console.log(err);
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
async function getSearchPetModel(selectedPets) {
  try {
    console.log("hi");
    console.log(selectedPets);
    const searchedPet = await dbConnection
      .from("pets")
      .whereIn("type", selectedPets);
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

module.exports = {
  readAllPetsModel,
  addPetModel,
  deletePetModel,
  getPetByIdModel,
  getSearchPetModel,
  getAdvancedSearchPetModel
};
