var express = require('express');
var path = require('path');
var ejs = require('ejs');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var users = require('./routes/users');
var datas = require('./routes/datas');
var bgmgr = require('./routes/bgmgr.js');
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');
app.engine('.html', ejs.__express);
app.set('view engine', 'html'); //替换文件扩展名ejs为html
var log = require('./log');
log.use(app);
// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: '12345',
    name: 'webapp',
    cookie: {maxAge: 6000 * 1000},
    resave: false,
    saveUninitialized: true
}));

var options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm', 'html', 'css', 'png', 'gif', 'jpg', 'js','map'],
    maxAge:0//31557600000
};
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public'),options));
app.use(function (req, res, next) {
    if (req.session.user) {  // 判断用户是否登录
        next();
    } else {
        // 解析用户请求的路径
        var arr = req.url.split('/');
//        去除 GET 请求路径上携带的参数
        for (var i = 0, length = arr.length; i < length; i++) {
            arr[i] = arr[i].split('?')[0];
        }
        // 判断请求路径是否为根、登录、注册、登出，如果是不做拦截
        if (arr.length > 2 && (arr[2] == 'register' || arr[2] == 'login' || arr[2] == 'logout')) {
            next();
        } else {  // 登录拦截
            req.session.originalUrl = req.originalUrl ? req.originalUrl : null;  // 记录用户原始请求路径
            res.redirect('/users/login');  // 将用户重定向到登录页面
        }
    }
});

app.use('/', index);
app.use('/users', users);
app.use('/datas', datas);
app.use('/bgmanager', bgmgr);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
