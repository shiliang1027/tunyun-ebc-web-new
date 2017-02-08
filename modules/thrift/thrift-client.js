/**
 * thrift客户端
 * Created by gaojinbao on 2015/12/2.
 */
var thrift = require('thrift');

var DataServer = require('./gen-nodejs/DataServer.js');
var wtypes = require('./gen-nodejs/web_types.js');
var config = require('../config.js');

var ThriftClient = function () {
    this.thriftIp = config["thrift-ip"];
    this.thriftPort = config["thrift-port"];
    this.connection = thrift.createConnection(this.thriftIp, this.thriftPort);
    this.client = thrift.createClient(DataServer, this.connection);
    console.log("thrift-client connection success ip:[" + this.thriftIp + "]" + "port:[" + this.thriftPort + "]");
    this._init();
}
ThriftClient.prototype._init = function () {
    this.connection.on("error", function (e) {
        console.log("thrift call server error:" + e);
    });
}

module.exports = ThriftClient;