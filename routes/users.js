/**
 * Created by shiliang on 2016/7/28.
 */
var express = require('express');
var router = express.Router();
var systemMgrServ = require('../modules/request/systemMgrServ.js');
/* GET login page. */
router.get('/login', function (req, res) {
    res.render('login', { title: '登录' });
});
router.post('/login', function (req, res) {
    var param = new Object();
    param.user_account = req.body.user;
    param.pwd = req.body.passwd;
    console.log(JSON.stringify(param));
    systemMgrServ.loginAuth(JSON.stringify(param), function (data) {
        if (data.StatusCode == 404) {
            req.session.errmsg = '* 用户名或者密码错,请您重新输入!';
            return res.redirect('/login'+req.body.hash);
        } else if (data.StatusCode == 200) {
            req.session.user = data;
//            systemMgrServ.accessPermission(JSON.stringify(data), function (apData) {
//                req.session.menuInfo = apData.menuInfo;
//                req.session.induInfo = apData.induInfo;
//                return res.redirect('/');
//            });
            return res.redirect('/'+req.body.hash);
        }
    });
});
router.get('/logout', function (req, res) {
    delete req.session.user;
    res.redirect('/'+req.query.hash);
});

router.get('/register', function (req, res) {
    res.render('register', { title: '注册' });
});

module.exports = router;