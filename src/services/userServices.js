import db from "../models/index";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);
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
                        userData.userMessage = "LOGIN SUCCESS!";
                        delete user.password;
                        userData.user = user;
                    } else {
                        (userData.errCode = 3), (userData.userMessage = `Wrong password, try another password`);
                    }
                } else {
                    userData.errCore = 2;
                    userData.userMessage = `User's not found`;
                }
            } else {
                (userData.errCode = 1),
                    (userData.userMessage = `Your's email isn't exist in your system`);
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

let getAllUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password',]
                    }
                })

            } if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password',]
                    }
                })
            }
            resolve(users)
        } catch (error) {

        }
    })
}

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkUserEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    message: 'your email is already in used,please try another email'
                })
            }
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === 1 ? true : false,
                roleId: data.roleId,
            })
            resolve({
                errCode: 0,
                message: 'ok'
            });
        } catch (e) {
            reject(e);
        }
    })
}
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    }
    )
}
let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            })
            if (!user) {
                resolve({
                    errCode: 2,
                    errMessage: 'user not found'
                })
            }
            await db.User.destroy({
                where: { id: userId }
            });
            resolve({
                errCode: 0,
                errMessage: 'User deleted'
            })
        } catch (e) {
            reject(e)
        }
    })
}
let updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters!'
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;

                await user.save();
                resolve({
                    errCode: 0,
                    message: 'update succeeds!'

                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'user not found'
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    handleUserLogin: handleUserLogin,
    checkUserEmail: checkUserEmail,
    compareUserPassword: compareUserPassword,
    getAllUser: getAllUser,
    createNewUser: createNewUser,
    hashUserPassword: hashUserPassword,
    deleteUser: deleteUser,
    updateUser: updateUser,

};
