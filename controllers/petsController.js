const {
  deletePetModel,
  readAllPetsModel,
  addPetModel,
  getPetByIdModel,
  getSearchPetModel,
  getAdvancedSearchPetModel,
  adoptionStatusPetModel,
  returnPetModel,
  getPetsbyUserIdModel,
  joinSavedandPetsModel
} = require("../models/petModel");
const joinSavedPets=async(req,res)=>{
  try{
  const ownerId = req.params
  const joinedPets = await joinSavedandPetsModel(ownerId)
  console.log("hi",joinedPets)
  res.send(joinedPets)
  }catch(err){
    console.log(err)
  }
}
const deletePet = async (req, res) => {
  const { petId } = req.params;
  const deleted = await deletePetModel(petId);
  if (deleted) {
    res.send({ ok: true, deletedId: petId });
  }
};
const basicSearchPet = async (req, res) => {
  console.log("FIRST REQ", req.query.type);
  console.log(req.query)
  try {
    let petType = req.query.type
    console.log(petType)
    const basicSearched = await getSearchPetModel(petType);
    res.send(basicSearched);
  } catch (err) {
    console.log(err);
  }
};

const advancedSearched = async (req, res) => {
  try {
    let lowerHeight = 0;
    let upperHeight = 1000;
    let lowerWeight = 0;
    let upperWeight = 1000;

    let petTypes = req.query["type"];
    if (!petTypes) {
      petTypes = ["cat", "dog", "bird", "fish"];
    }

    const petUpperHeight = req.query["UpperHeight"];
    if (petUpperHeight) {
      lowerHeight = petUpperHeight;
    }
    
    const petAverageHeight = req.query["AverageHeight"];
    if (petAverageHeight) {
      lowerHeight = 30;
      upperHeight = 60;
    }
    const petLowerHeight = req.query["LowerHeight"];
    if (petLowerHeight) {
      upperHeight = petLowerHeight;
    }
    const petUpperWeight = req.query["UpperWeight"];
    if (petUpperWeight){
      lowerWeight = petUpperWeight;
    }
    const petAverageWeight = req.query["AverageWeight"];
    if (petAverageWeight){
      lowerWeight = 30;
      upperWeight = 60;
    }
    const petLowerWeight = req.query["LowerWeight"]
      if (petLowerWeight){
        upperWeight=petLowerWeight
    }
    
    let petAdoptionStatus = req.query["adoptionStatus"];
    if (!petAdoptionStatus){
      petAdoptionStatus = ["Availible","Fostered","Adopted"]
    }
    let petName = req.query["petName"];
    console.log("parameters",req.params
    )
    if (!petName) {
      petName = null;
    }

    const queryData = {
      "petTypes": petTypes,
      "lowerHeight": lowerHeight,
      "upperHeight": upperHeight,
      "lowerWeight": lowerWeight,
      "upperWeight": upperWeight,
      "adoptionStatus": petAdoptionStatus,
      "name": petName
    }
    
    const advancedSearched = await getAdvancedSearchPetModel(queryData);
    res.send(advancedSearched);
  } catch (err) {
    console.log(err);
  }
};

const addPet = async (req, res) => {
  try {
    // console.log("pic url",req.file.path)
    const newPet = {
      ...req.body,
      pic: req.file.path,
    };
    const id = await addPetModel(newPet);
    newPet.id = id;
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
const getPetById = async (req, res) => {
  try {
    const { id } = req.params;

    const gotPet = await getPetByIdModel(id);
    res.send(gotPet);
  
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
const getPetsByUserId = async(req,res)=>{
  try {
    const {ownerId}=req.params;
    const gotPetFromOwner = await getPetsbyUserIdModel(ownerId)
    console.log(ownerId)
    res.send(gotPetFromOwner)
  } catch (error) {
    console.log(error);
    res.status(500).send(error)
  }
}
const changePetStatus = async(req,res)=>{
  try {
    const body = req.body
    console.log(body)
    const id = await adoptionStatusPetModel(body);
    const statusChange = {
      ...req.body,
      id:req.body.petId
    }
    res.send(statusChange);
}catch(err){
  console.log(err)
  res.status(500).send(err);
}
}
const returnPet = async(req,res)=>{
  try {
    const body = req.body
    console.log(body)
    const id = await returnPetModel(body);
    const statusChange = {
      ...req.body,
      id:req.body.petId
    }
    res.send(statusChange);
}catch(err){
  console.log(err)
  res.status(500).send(err);
}
}
module.exports = { deletePet, addPet, getAllPets, getPetById, basicSearchPet,advancedSearched,changePetStatus,returnPet, getPetsByUserId,joinSavedPets};
