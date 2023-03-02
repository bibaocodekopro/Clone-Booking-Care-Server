import db from "../models/index";
import servicesCRUD from "../services/servicesCRUD";

let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    return res.render("homePage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (e) {
    console.log(e);
  }
};
let getRegisterUser = async (req, res) => {
  try {
    return res.render("registerUser.ejs");
  } catch (e) {
    console.log(e);
  }
};
let checkRegister = async (req, res) => {
  let message = await servicesCRUD.createNewUser(req.body);
  console.log(message);
  return res.send("post from server");
};
let getAllUsers = async (req, res) => {
  let data = await servicesCRUD.getAllUsers();
  console.log("--------------------------------");
  console.log(data);
  console.log("--------------------------------");
  return res.render("display-CRUD.ejs", {
    dataTable: data,
  });
};
let getEditCRUD = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let userData = await servicesCRUD.getUserInfoById(userId);
    console.log("------------------------------------------------");
    console.log(userData);
    console.log("------------------------------------------------");
    return res.render('edit-CRUD.ejs', {
      dataUser: userData
    });
  } else {
    console.log("no user id defined");
  }
};
let getPutCRUD = async (req, res) => {
  let data = req.body;
  await servicesCRUD.updateUserData(data);
    let Users = await servicesCRUD.getAllUsers();
  return res.render("display-CRUD.ejs", {
    dataTable: Users,
  });
}
let getDeleteCRUD = async(req, res) => {
  let id = req.query.id;
  await servicesCRUD.getDeleteCRUD(id);
  return res.send('delete user successfully');
}

module.exports = {
  getHomePage: getHomePage,
  getRegisterUser: getRegisterUser,
  checkRegister: checkRegister,
  getAllUsers: getAllUsers,
  getEditCRUD: getEditCRUD,
  getPutCRUD: getPutCRUD,
  getDeleteCRUD:getDeleteCRUD,

};
