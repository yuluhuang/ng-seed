var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/doLogin', function(req, res, next) {
  res.send({
    code: 0,
    data: {
      token: "MIGfMA0GC",
      loginInfo: {}
    }
  });
});
router.post('/authorKey', function (req, res) {
  res.send({
    code: 0,
    data: {
      publickey: "MIGfMA0GC",
      unityAuther: '0'
    }
  });
})

module.exports = router;
