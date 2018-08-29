'use strict';
var express = require('express') ;
import checkLogin from  '../controller/checkLogin';
const router  = express.Router();
router.get('/check',checkLogin.login);
module.exports =   router;