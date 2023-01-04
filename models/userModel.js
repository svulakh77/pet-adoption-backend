const dbConnection = require('../knex/knex');

async function readAllUsers() {
    try {
      const userList = await dbConnection.from('users')
      console.log(userList)
      return userList
    } catch (err) {
      console.log(err);
    }
  }
  async function readUserModel(userID) {
    try {
      const readUser = await dbConnection.from('users').where({id:userID}).first()
      console.log('Reading User')
      return readUser
    } catch (err) {
      console.log(err);
    }
  }
  
const addUser = async(newUser)=>{
    try {
       const  user = await dbConnection.from('users').insert(newUser)
       console.log(user)
       return user
    } catch (error) {
        console.log(error)
    }
}
const getUserByEmailModel = async (email) => {
    try {
      const user = await dbConnection.from('users').where({ email: email }).first();
      return user;
    } catch (err) {
      console.log(err);
    }
  };

module.exports = {readAllUsers,addUser,getUserByEmailModel,readUserModel}