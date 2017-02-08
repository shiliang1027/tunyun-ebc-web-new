/**
 * 登录控制
 * Created by gaojinbao on 2016/3/2.
 */
var ThriftClient = require('../thrift/thrift-client.js');

var systemMgrServ = function () {
}

/**
 * 登录验证
 * @param parameters
 * @param callback
 */
systemMgrServ.loginAuth = function (parameters, callback) {
    var tf = new ThriftClient();
    tf.client.execute("0000", "00000001", parameters, function (err, res) {
        if (err) {
            console.error("loginAuth method call error:" + err);
        } else {
            try {
                var data = JSON.parse(res);
                callback.call(null, data);
            } catch (e) {
                console.error("loginAuth method handler error:" + err);
            } finally {
                tf.connection.end();
            }
        }
    });
}

/**
 * 获取访问权限
 * @param parameters
 * @param callback
 */
systemMgrServ.accessPermission = function (parameters, callback) {
    var tf = new ThriftClient();
    tf.client.execute("0000", "00000002", parameters, function (err, res) {
        if (err) {
            console.error("accessPermission method call error:" + err);
        } else {
            try {
                console.log(res);
                var data = JSON.parse(res);
                callback.call(null, data);
            } catch (e) {
                console.error("accessPermission method handler error:" + err);
            } finally {
                tf.connection.end();
            }
        }
    });
}

/**
 * 密码修改
 * @param parmeters
 * @param callback
 */
systemMgrServ.changePasswd = function (parameters, callback) {
    var tf = new ThriftClient();
    tf.client.execute("0000", "00000003", parameters, function (err, res) {
        if (err) {
            console.error("changePasswd method call error:" + err);
        } else {
            try {
                var data = JSON.parse(res);
                callback.call(null, data);
            } catch (e) {
                console.error("changePasswd method handler error:" + err);
            } finally {
                tf.connection.end();
            }
        }
    });
}

module.exports = systemMgrServ;
