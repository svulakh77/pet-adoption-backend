const path = require('path');
const pathToPetsDB = path.resolve(__dirname, '../database/petsDB.json');
const dbConnection = require('../knex/knex')


async function readAllPetsModel() {
  try {
    const petsList = await dbConnection.from('pets')
    return petsList
  } catch (err) {
    console.log(err);
  }
}

async function addPetModel(newPet) {
  try {
    const [id] = await dbConnection.from('pets').insert(newPet)
    return id;
  } catch (err) {
    console.log(err);
  }
}

async function deletePetModel(petId) {
  try {

    const deleted = await dbConnection.from('pets').where({id:petId}).del()
    return deleted
  } catch (err) {
    console.log(err);
  }
}

module.exports = { readAllPetsModel, addPetModel, deletePetModel };