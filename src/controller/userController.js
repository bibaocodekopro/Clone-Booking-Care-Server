import userServices from "../services/userServices";

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: ' Missing input parameters!',
        });
    }

    let userData = await userServices.handleUserLogin(email, password);
    return await res.status(200).json({
        errCode: userData.errCode,
        message: userData.userMessage,
        user: userData.user ? userData.user : {},
    })
}

let handleGetAllUser = async (req, res) => {
    let id = req.query.id; //ALL, ID
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing input parameter',
            users: []
        })
    }
    let users = await userServices.getAllUser(id);
    console.log(users);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        users
    })
}

let handleCreateNewUser = async (req, res) => {
    let message = await userServices.createNewUser(req.body);
    console.log(message);
    return res.status(200).json(message);
}
let handleDeleteUser = async (req, res) => {
    console.log(req.query.id)
    if (!req.query.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!'
        })
    }
    let message = await userServices.deleteUser(req.query.id);
    return res.status(200).json(message);
}
let handleEditUser = async (req, res) => {
    let data = req.body;
    let message = await userServices.updateUser(data);
    return res.status(200).json(message);
}
module.exports = {
    handleLogin: handleLogin,
    handleGetAllUser: handleGetAllUser,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,

}