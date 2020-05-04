var express = require('express');
var router = express.Router();
var UserModel = require('../models/users')
var uid2 = require("uid2");
var SHA256 = require("crypto-js/sha256");
var encBase64 = require("crypto-js/enc-base64");

/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({ result: true });
});

router.get('/sign-in', async function (req, res, next) {
  var isUserExist = false;
  console.log('email from front', req.query)
  const user = await UserModel.findOne({
    email: req.query.email
  })
  console.log('user MB ', user)

  if (!user) {

    res.json({ result: true, isUserExist: false })
  } else {
    var hash = SHA256(req.query.password + user.salt).toString(encBase64);
    if (hash === user.password) {
      console.log('je suis passée la')
      res.json({ result: true, isUserExist: true })
    } else {
      console.log('else H')
      console.log(hash);
      console.log('user false', user)
      res.json({ result: true, isUserExist: false })
    }
  }
});

router.post('/sign-up', async function (req, res, next) {
  console.log('data from front', req.body)
  var connect = false;
  UserModel.findOne(
    { email: req.body.email },
    function (err, users) {
      console.log('test info =============', users);
      if (users) {
        console.log('je suis dans le if =============', users);
        res.json({ result: true, connect });
      } else {
        connect = true;
        var salt = uid2(32);
        var passHash = SHA256(req.body.password + salt).toString(encBase64);
        const newUser = new UserModel({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          password: passHash,
          token: uid2(32),
          salt: salt
        });
        const saveUser = newUser.save();
        console.log('New user in databse, je suis dans le else-->', newUser)
        res.json({ result: true, newUser, connect });
      };
    });
});

module.exports = router;
