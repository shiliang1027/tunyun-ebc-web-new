/**
 * Created by shiliang on 2016/12/13.
 */
var ThriftClient = require('../thrift/thrift-client.js');
var NewprodReq = function () {
}
NewprodReq.execute = function (item,parameters,callback) {
    var thriftClient = new ThriftClient();
    thriftClient.client.execute("1010", item,parameters, function (err, res) {
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
module.exports = NewprodReq;
