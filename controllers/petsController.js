const { deletePetModel, readAllPetsModel, addPetModel } = require('../models/petModel');

const deletePet = async(req, res) => {
  const { petId } = req.params;
  const deleted = await deletePetModel(petId);
  if (deleted) {
    res.send({ ok: true, deletedId: petId});
  }
};

const addPet = async (req, res) => {
  try {
    const id = await addPetModel(req.body);
    const newPet = {
      ...req.body,
      id: id,
    };

    res.send(newPet);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const getAllPets = async (req, res) => {
  try {
    const allPets = await readAllPetsModel();
    res.send(allPets);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports = { deletePet, addCountry, getAllPets };