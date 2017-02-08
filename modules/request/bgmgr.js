/**
 * 后台管理
 * Created by gaojinbao on 2016/4/13.
 */
var ThriftClient = require('../thrift/thrift-client.js');

var nodeExcel = require('excel-export');

var bgMgr = function () {
}

bgMgr.execute = function (item,parameters,callback) {
    var thriftClient = new ThriftClient();
    thriftClient.client.execute("9999", item,parameters, function (err, res) {
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


/**
 * 下载属性值审核数据
 * @param parameters
 * @param callback
 */
bgMgr.downLoadAttrValueAduitData = function (parameters, callback) {
    var thriftClient = new ThriftClient();
    thriftClient.client.execute("9999", "99990004", JSON.stringify(parameters), function (err, res) {
        if (err) {
            console.error("downLoadAttrValueAduitData method call error:" + err);
        } else {
            try {
//                console.log(res);
                var data = JSON.parse(res);
                var configs = [];
                //已审核属性
                if (data.approvedAttr && data.approvedAttr.length > 0) {
                    var appConfig = {};
                    appConfig.cols = [
                        {caption: 'pid', type: 'string'},
                        {caption: 'cid', type: 'string'},
                        {caption: 'vid', type: 'string'},
                        {caption: 'vname', type: 'string'},
                        {caption: 'valias', type: 'string'}
                    ];
                    appConfig.rows = [];
                    for (var i = 0; i < data.approvedAttr.length; i++) {
                        var appConfigRow = [];
                        appConfigRow.push(data.approvedAttr[i].pid);
                        appConfigRow.push(data.approvedAttr[i].cid);
                        appConfigRow.push(data.approvedAttr[i].vid);
                        appConfigRow.push(data.approvedAttr[i].vname);
                        var appConfigRowVAlias = [];
                        for (var j = 0; j < data.approvedAttr[i].valias.length; j++) {
                            appConfigRowVAlias.push(data.approvedAttr[i].valias[j].name);
//                            appConfigRowVAlias = j > 0 ? appConfigRowVAlias + ',' + data.approvedAttr[i].valias[j].vname : data.approvedAttr[i].valias[j].vname;
                        }
                        appConfigRow.push(appConfigRowVAlias.join("、"));
                        appConfig.rows.push(appConfigRow);
                    }
                    appConfig.name = '已审核';
                    configs.push(appConfig);
                }
                //未审核属性
                if (data.notApprovedAttr && data.notApprovedAttr.length > 0) {
                    var notAppConfig = {};
                    notAppConfig.cols = [
                        {caption: 'vname', type: 'string'},
                        {caption: 'valias', type: 'string'}
                    ];
                    notAppConfig.rows = [];
                    for (var i = 0; i < data.notApprovedAttr.length; i++) {
                        var notAppConfigRow = [];
                        notAppConfigRow.push(data.notApprovedAttr[i].vname);
                        var notAppConfigRowVAlias = [];
                        for (var j = 0; j < data.notApprovedAttr[i].valias.length; j++) {
                            notAppConfigRowVAlias.push(data.notApprovedAttr[i].valias[j].name);
//                            notAppConfigRowVAlias = j > 0 ? notAppConfigRowVAlias + ',' + data.notApprovedAttr[i].valias[j].vname : data.notApprovedAttr[i].valias[j].vname;
                        }
                        notAppConfigRow.push(notAppConfigRowVAlias.join("、"));
                        notAppConfig.rows.push(notAppConfigRow);
                    }
                    notAppConfig.name = '未审核';
                    configs.push(notAppConfig);
                }
                //创建excel数据流
                var result = nodeExcel.execute(configs);
                callback.call(null, result);
            } catch (e) {
                console.error("downLoadAttrValueAduitData method handler error:" + e);
            } finally {
                thriftClient.connection.end();
            }
        }
    });
}


module.exports = bgMgr;