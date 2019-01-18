var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('you have requested a user ressource');
});

router.post('/', function(req, res, next) {
    const collection = client.db("test").collection("devices");
    res.send("insert test into devices dataBase a user ressource");
});


module.exports = router;
