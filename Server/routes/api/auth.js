const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const auth = require('../../middleware/auth');
// Load input validation
const validateLoginInput = require("../../validation/login");
// Load User model
const User = require("../../models/User");


// @route POST api/auth
// @desc auth user
// @access Public

router.post("/", (req, res) => {
    // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  const sdt = req.body.sdt;
    const password = req.body.password;
  // Find user by sdt
    User.findOne({ sdt }).then(user => {
      // Check if user exists
      if (!user) {
        return res.status(404).json({ sdtnotfound: "Số điện thoại không tồn tại" });
      }
  // Check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            id: user.id,
            name: user.name
          };
  // Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 3600 
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Mật khẩu không đúng" });
        }
      });
    });
  });
  
  router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
      .select('-password')
      .then(user => res.json(user));
  });

  module.exports = router;