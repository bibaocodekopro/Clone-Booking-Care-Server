import express from "express";
import homeController from "../controller/homeController";
import userController from "../controller/userController";
let router = express.Router();
let initWebRouters = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/registerUser', homeController.getRegisterUser);
    router.post('/checkRegister', homeController.checkRegister);
    router.get('/getAllUsers', homeController.getAllUsers);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.post('/put-crud', homeController.getPutCRUD);
    router.get('/delete-crud', homeController.getDeleteCRUD);

    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-users', userController.handleGetAllUser);
    router.post('/api/create-new-user',userController.handleCreateNewUser);
    router.put('/api/edit-user',userController.handleEditUser);
    router.delete('/api/delete-user',userController.handleDeleteUser);
    return app.use("/", router);

}

module.exports = initWebRouters;
