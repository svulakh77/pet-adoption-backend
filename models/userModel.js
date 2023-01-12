const dbConnection = require("../knex/knex");

async function readAllUsers() {
  try {
    const userList = await dbConnection.from("users");
    console.log(userList);
    return userList;
  } catch (err) {
    console.log(err);
  }
}
async function readUserModel(userID) {
  try {
    const readUser = await dbConnection
      .from("users")
      .where({ id: userID })
      .first();
    console.log("Reading User");
    return readUser;
  } catch (err) {
    console.log(err);
  }
}

const addUser = async (newUser) => {
  try {
    const user = await dbConnection.from("users").insert(newUser);
    console.log(user);
    return user;
  } catch (error) {
    console.log(error);
  }
};
const updateUser = async (body) => {
  console.log("body????", body);
  //     console.log('Updating user: '+
  //    JSON.stringify(userId))

  const { userId, email, password, firstName, lastName, phoneNumber, bio } = body;
  console.log("newFirsName", firstName);
  try {
    const user = await dbConnection.from("users").where("id", userId).update({
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      bio: bio,
    });
    console.log(user);
    return user;
  } catch (error) {
    console.log(error);
  }
};
const getUserByEmailModel = async (email) => {
  try {
    const user = await dbConnection
      .from("users")
      .where({ email: email })
      .first();
    return user;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  readAllUsers,
  updateUser,
  addUser,
  getUserByEmailModel,
  readUserModel,
};
