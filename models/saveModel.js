const fs = require("fs");
const path = require("path");
const pathToSavesDB = path.resolve(__dirname, "../petAdoption/saves.json");
const dbConnection = require("../knex/knex");

async function savePetModel(savePet) {
    try {
      console.log(savePet);
      const [id] = await dbConnection.from("saves").insert(savePet);
      return id;
    } catch (err) {
      console.log(err);
    }
  }
  async function readAllSaves() {
    try {
      const savesList = await dbConnection.from("saves");
      return savesList;
    } catch (err) {
      console.log(err);
    }
  }
  module.exports={savePetModel,readAllSaves}