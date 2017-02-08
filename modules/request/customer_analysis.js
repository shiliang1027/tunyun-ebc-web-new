/**
 * Created by gaojinbao on 2015/12/11.
 */
var ChartUtil = require('../util/ChartUtil.js');
var timeFormat = require('../util/TimeFormat.js');
var ThriftClient = require('../thrift/thrift-client.js');
//获取chart模型
var PieChart = require('../data/chart/pie.js');
//获取访问趋势模型
var VisitTrend = require('../data/chart/customer_analysis/VisitTrend.js');
//获取跳失率模型
var JumpLossRate = require('../data/chart/customer_analysis/JumpLossRate.js');
//地图模型
var VisitAreaMap = require('../data/chart/customer_analysis/VisitAreaMap.js');
//客户分析
var CustomerAnalysisReq = function () {

}
//电商访客分析
var ecommerceData = undefined;
CustomerAnalysisReq.ecommerce = function (parameters, callback) {
    var thriftClient = new ThriftClient();
    thriftClient.client.execute("1006", "10060101", parameters, function (err, res) {
        if (err) {
            console.error("ecommerce method call error:" + err);
        } else {
            try {
                ecommerceData = JSON.parse(res);
                ecommerceData = assembleChart(ecommerceData);
                callback.call(null, ecommerceData);
            } catch (e) {
                console.error("ecommerce method handler error:" + e);
            } finally {
                thriftClient.connection.end();
            }
        }
    });

    function assembleChart(data) {
        var format = new timeFormat();
        var cdate = format.format();

        VisitTrend.title.text = '电商【淘宝】' + cdate + '访客流量趋势';
        VisitTrend.xAxis[0].categories = data["VisitTrend"]["categories"];
        VisitTrend.series = data["VisitTrend"]["series"];
        data["VisitTrend"] = VisitTrend;


        JumpLossRate.series = data["JumpLossRate"]["series"];
        data["JumpLossRate"] = JumpLossRate;

        var flowSourceRatio = new PieChart('流量来源比例', [{
            name: '来源比例',
            innerSize: '60%',
            data: ChartUtil.pieDataVerify(data["FlowSourceRatio"])
        }]);
        data["FlowSourceRatio"] = flowSourceRatio.establish();

        var mWRatio = new PieChart('男女比例', [{
            name: '男女比例',
            innerSize: '60%',
            data: ChartUtil.pieDataVerify(data["MWRatio"])
        }]);
        data["MWRatio"] = mWRatio.establish();

        VisitAreaMap.series[0].name = '访客数';
        VisitAreaMap.series[0].data = data["VisitAreaMap"];
        data["VisitAreaMap"] = VisitAreaMap;

        return data;
    }
}
CustomerAnalysisReq.ecommerceAnyAsync = function (parameters, callback) {
    if (ecommerceData) {
        callback.call(null, ecommerceData);
    } else {
        console.error("ecommerceAnyAsync method call error,nodata......");
    }
}

module.exports = CustomerAnalysisReq;