const{savePetModel}=require("../models/saveModel")
const savePet = async(req,res)=>{
    
        try {
            const savedPet = {
              ...req.body
            };
            const id = await savePetModel(savedPet);
            savedPet.id = id;
            res.send(savedPet);
          } catch (err) {
            console.log(err);
            res.status(500).send(err);
          }
  }
module.exports={savePet}