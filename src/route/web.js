import express from "express";
import homeCotroller from "../controller/homeCotroller";
let router = express.Router();

let initWebRouters= (app) =>{
    router.get('/',homeCotroller.getHomePage);
    return  app.use("/",router);
}

module.exports= initWebRouters;
