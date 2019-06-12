const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const User = require("../../models/User");
const mongoose = require("mongoose");
const multer = require('multer');

var app = express();
var server = require('http').Server(app)
var io = require('socket.io')(server)
var arr_pos=[];
router.get('/users', function(req, res, next) {
  
});

module.exports = router;

//const path = require('path');


// @route POST api/users/register
// @desc Register user
// @access Public

/* const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 3840 * 2160  * 5
  },
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
});

function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb.status(400).json({ imageProduct: "Tập tin ko phải ảnh" });
  }
} */
  
router.post("/", (req, res) => {
    // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  User.findOne({ sdt: req.body.sdt }).then(user => {
      if (user) {
        return res.status(400).json({ sdt: "Số điện thoại đã tồn tại" });
      } else {
        const newUser = new User({
          sdt: req.body.sdt,
          name: req.body.name,
          gender: req.body.gender,
          password: req.body.password,
          typeBike: req.body.typeBike,
          bsxe: req.body.bsxe,
          //imageProduct: req.file.path,
          activeUser: false,
          isAdmin: false
        });
  // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user =>
                jwt.sign(
                  { id: user.id},
                  keys.secretOrKey,
                  {
                    expiresIn: 3600 
                  },
                  (err, token) => {
                    if(err) throw err;
                    token,
                    res.json(user)
                  }
                )
              )
                
              .catch(err => console.log(err));
          });
        });
      }
    });
  });

  module.exports = router;