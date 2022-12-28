const { removePet, readAllCountriesModel, addCountryModel } = require('../models/countriesModels');

const deletePet = async(req, res) => {
  const { petId } = req.params;
  const deleted = await removePet(petId);
  if (deleted) {
    res.send({ ok: true, deletedId: countryId });
  }
};

const addCountry = async (req, res) => {
  try {
    const id = await addCountryModel(req.body);
    const newCountry = {
      ...req.body,
      id: id,
    };

    res.send(newCountry);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const getAllCountries = async (req, res) => {
  try {
    const allCountries = await readAllCountriesModel();
    res.send(allCountries);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports = { deletePet, addCountry, getAllCountries };