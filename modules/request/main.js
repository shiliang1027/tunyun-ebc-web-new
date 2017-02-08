/**
 * Created by gaojinbao on 2015/12/2.
 */
//var timeFormat = require('../util/TimeFormat.js');
var ThriftClient = require('../thrift/thrift-client.js');

var MainReq = function () {

}

var mainData = undefined;
var PieChart = require('../data/chart/pie.js');
var brandDynamic = require('../data/chart/main/BrandDynamic.js');
var channelSales = require('../data/chart/main/ChannelSales.js');
var categoryDynamic = require('../data/chart/main/CategoryDynamic.js');
var consumptionPower = require('../data/chart/main/ConsumptionPower.js');
var enterprisePassengerFlow = require('../data/chart/main/EnterprisePassengerFlow.js');
var enterpriseConsumptionDyna = require('../data/chart/main/EnterpriseConsumptionDyna.js');
MainReq.firstScreenData = function (parameters, callback) {
    var thriftClient = new ThriftClient();
    thriftClient.client.execute("1001", "10010001", parameters, function (err, res) {
        if (err) {
            console.error("firstScreen method call error:" + err);
        } else {
            try {
                mainData = JSON.parse(res);
                mainData = assembleChart(mainData);
                callback.call(null, mainData);
            } catch (e) {
                console.error("firstScreen method handler error:" + e);
            } finally {
                thriftClient.connection.end();
            }
        }
    });
    function assembleChart(data) {
        //var format = new timeFormat();
        //var cdate = format.format();
        brandDynamic.title.text = '品牌动态(TOP 10)';
        brandDynamic.series = data["BrandDynamic"];
        data["BrandDynamic"] = brandDynamic;

        categoryDynamic.title.text = '品类动态(TOP 10)';
        categoryDynamic.xAxis.categories = data["CategoryDynamic"]["categories"];
        categoryDynamic.series = data["CategoryDynamic"]["series"];
        data["CategoryDynamic"] = categoryDynamic;

        var channelDutyRatio = new PieChart('渠道行业占比', [{
            name: '行业比例',
            innerSize: '50%',
            data: data["ChannelDutyRatio"]
        }]);
        data["ChannelDutyRatio"] = channelDutyRatio.establish();

        channelSales.title.text = '渠道销售分布';
        channelSales.xAxis[0].categories = data["ChannelSales"]["categories"];
        channelSales.series= data["ChannelSales"]["series"];
        data["ChannelSales"] = channelSales;
        //console.log("#######" + JSON.stringify(data["ChannelSales"]));

        consumptionPower.title.text = '消费能力动态';
        consumptionPower.xAxis[0].categories = data["ConsumptionPower"]["categories"];
        consumptionPower.series = data["ConsumptionPower"]["series"];
        data["ConsumptionPower"] = consumptionPower;

        enterprisePassengerFlow.title.text = '企业客流趋势动态';
        enterprisePassengerFlow.xAxis[0].categories = data["enterprisePassengerFlow"]["categories"];
        enterprisePassengerFlow.series = data["enterprisePassengerFlow"]["series"];
        data["enterprisePassengerFlow"] = enterprisePassengerFlow;

        enterpriseConsumptionDyna.title.text = '企业销售趋势动态';
        enterpriseConsumptionDyna.xAxis[0].categories = data["enterpriseConsumptionDyna"]["categories"];
        enterpriseConsumptionDyna.series = data["enterpriseConsumptionDyna"]["series"];
        data["enterpriseConsumptionDyna"] = enterpriseConsumptionDyna;

        var enterpriseConsumptionDutyRatio = new PieChart('销售渠道分布', [{
            name: '渠道比例',
            innerSize: '60%',
            data: data["enterpriseConsumptionDutyRatio"]
        }]);
        data["enterpriseConsumptionDutyRatio"] = enterpriseConsumptionDutyRatio.establish();

        return data;
    }
}

MainReq.asyncData = function (parameters, callback) {
    if (mainData) {
        callback.call(null, mainData);
    } else {
        console.error("MainAsyncData method call error,nodata......");
    }
}

module.exports = MainReq;