import userServices from "../services/userServices";

let handleLogin = async(req,res)=>{
    let email=req.body.email;
    let password=req.body.password;
    if(!email || !password){
            return res.status(500).json({
                errCode : 1,
                message: ' Missing input parameters!',
            }); 
        }
       
    let userData = await userServices.handleUserLogin(email,password);
    return  await res.status(200).json({
        errCode: userData.errCode,
        message: userData.userMessage,
        user: userData.user ? userData.user :{},
    })
}
module.exports = {
    handleLogin: handleLogin,
}