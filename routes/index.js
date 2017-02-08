/**
 * Created by shiliang on 2016/7/28.
 */
var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res) {
    res.render('index');
});

module.exports = router;