
import db from '../models/index';
import servicesCheckRegister from "../services/servicesCheckRegister";

let getHomePage = async(req , res) =>{
    try{
        let data= await db.User.findAll();
        return res.render('homePage.ejs',{
            data: JSON.stringify(data)
        });
    }catch(e){
        console.log(e);
    }
}
let getRegisterUser = async(rep , res) =>{
    try {
        return res.render('registerUser.ejs');
    } catch (e) {
        console.log(e);
    }
}
let checkRegister   = async(req, res) =>{
    let message =await servicesCheckRegister.createNewUser(req.body);
    console.log(message);
    return res.send('post from server');
}

module.exports= {
    getHomePage: getHomePage,
    getRegisterUser: getRegisterUser,
    checkRegister: checkRegister,

}