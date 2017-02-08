/**
 */
var ThriftClient = require('../thrift/thrift-client.js');

var CommonReq = function () {
}

CommonReq.execute = function (item,parameters,callback) {
    var thriftClient = new ThriftClient();
    thriftClient.client.execute("8888", item,parameters, function (err, res) {
        if (err) {
            console.error("execute method call "+item+" error:" + err);
        } else {
            try {
                var data = JSON.parse(res);
                callback.call(null, data);
            } catch (e) {
                console.error("execute method "+item+" handler error:" + e);
            } finally {
                thriftClient.connection.end();
            }
        }
    });
};

module.exports = CommonReq;