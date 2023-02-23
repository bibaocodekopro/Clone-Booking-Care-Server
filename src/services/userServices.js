import db from "../models/index";
import bcrypt from "bcryptjs";

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};

            let isExist = await checkUserEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    attributes: ["email", "password", "roleId"],
                    where: { email: email },
                    raw: true,
                });
                if (user) {
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.userMessage = "success";
                        delete user.password;
                        userData.user = user;
                    } else {
                        (userData.errCode = 3), (userData.userMessage = `wrong password`);
                    }
                } else {
                    userData.errCore = 2;
                    userData.userMessage = `user's not found`;
                }
            } else {
                (userData.errCode = 1),
                    (userData.userMessage = `your's email isn't exist in your system`);
            }
            resolve(userData);
        } catch (e) {
            reject(e);
        }
    });
};
let compareUserPassword = () => {
    return new Promise((resolve, reject) => {
        try {
        } catch (e) {
            reject(e);
        }
    });
};
let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail },
            });
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    });
};
module.exports = {
    handleUserLogin: handleUserLogin,
    checkUserEmail: checkUserEmail,
    compareUserPassword: compareUserPassword,
};
