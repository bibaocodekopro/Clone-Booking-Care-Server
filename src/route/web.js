import express from "express";
import homeController from "../controller/homeController";
let router = express.Router();

let initWebRouters= (app) =>{
    router.get('/',homeController.getHomePage);
    router.get('/registerUser',homeController.getRegisterUser);
    
   router.post('/checkRegister',homeController.checkRegister);
   router.get('/getAllUsers',homeController.getAllUsers);
   router.get('/edit-crud',homeController.getEditCRUD);
   router.post('/put-crud',homeController.getPutCRUD);
   router.get('/delete-crud',homeController.getDeleteCRUD);
    return  app.use("/",router);
}

module.exports= initWebRouters;
