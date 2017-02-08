/**
 * Created by gaojinbao on 2015/12/10.
 */
var ChartUtil = require('../util/ChartUtil.js');
var timeFormat = require('../util/TimeFormat.js');
var ThriftClient = require('../thrift/thrift-client.js');
//获取首页数据
var indexData = require('../data/index.json');

var InduAnalysisReq = function () {

}

var comprehensiveData = undefined;
var PieChart = require('../data/chart/pie.js');
var channelSalesDyna = require('../data/chart/induanalysis/ChannelSalesDynamic.js');
InduAnalysisReq.comprehensive = function (parameters, callback) {
    var thriftClient = new ThriftClient();
    thriftClient.client.execute("1003", "10030101", parameters, function (err, res) {
        if (err) {
            console.error("comprehensive method call error:" + err);
        } else {
            try {
                comprehensiveData = JSON.parse(res);
                comprehensiveData = assembleChart(comprehensiveData);
                callback.call(null, comprehensiveData);
            } catch (e) {
                console.error("comprehensive method handler error:" + e);
            } finally {
                thriftClient.connection.end();
            }
        }
    });
    function assembleChart(data) {
        if (data["ChannelSalesDyna"]) {
            channelSalesDyna.title.text = '渠道销售趋势';
            channelSalesDyna.xAxis[0].categories = data["ChannelSalesDyna"]["categories"];
            channelSalesDyna.series = data["ChannelSalesDyna"]["series"];
            data["ChannelSalesDyna"] = channelSalesDyna;
        }
        if (data["ChannelSalesRatio"]) {
            console.log(ChartUtil.pieDataVerify(data["ChannelSalesRatio"]));
            var channelSalesRatio = new PieChart('渠道销售额比例', [{
                name: '渠道销售比例',
                innerSize: '60%',
                data: ChartUtil.pieDataVerify(data["ChannelSalesRatio"])
            }]);
            data["ChannelSalesRatio"] = channelSalesRatio.establish();
        }

        if (data["HotSalesBrandRatio"]) {
            var hotSalesBrandRatio = new PieChart('热销品牌销售分布', [{
                name: '品牌销售比例',
                innerSize: '60%',
                data: ChartUtil.pieDataVerify(data["HotSalesBrandRatio"])
            }]);
            data["HotSalesBrandRatio"] = hotSalesBrandRatio.establish();
        }

        if (data["HotSalesCategoryRatio"]) {
            var hotSalesCategoryRatio = new PieChart('热销品类销售分布', [{
                name: '品类销售比例',
                innerSize: '60%',
                data: ChartUtil.pieDataVerify(data["HotSalesCategoryRatio"])
            }]);
            data["HotSalesCategoryRatio"] = hotSalesCategoryRatio.establish();
        }

        return data;
    }
}


InduAnalysisReq.comprehensiveAsync = function (parameters, callback) {
    if (comprehensiveData) {
        callback.call(null, comprehensiveData);
        //console.log("comprehensiveAsync:" + JSON.stringify(comprehensiveData));
    } else {
        console.error("comprehensiveAsync method call error,nodata......");
    }
}


var categoryData = undefined;
var channelSalesTrend = require('../data/chart/induanalysis/ChannelSalesTrend.js');
InduAnalysisReq.category = function (parameters, callback) {
    var thriftClient = new ThriftClient();
    thriftClient.client.execute("1003", "10030201", parameters, function (err, res) {
        if (err) {
            console.error("category method call error:" + err);
        } else {
            try {
                categoryData = JSON.parse(res);
                categoryData = assembleChart(categoryData);
                callback.call(null, categoryData);
            } catch (e) {
                console.error("category method handler error:" + e);
            } finally {
                thriftClient.connection.end();
            }
        }
    });
    function assembleChart(data) {
        channelSalesTrend.title.text = '品类销售趋势';
        channelSalesTrend.xAxis[0].categories = data["ChanSalesTrend"]["categories"];
        channelSalesTrend.series = data["ChanSalesTrend"]["series"];
        data["ChanSalesTrend"] = channelSalesTrend;

        var chanSalesDistributedRatio = new PieChart('渠道行业占比', [{
            name: '渠道行业比例',
            innerSize: '60%',
            data: ChartUtil.pieDataVerify(data["ChanSalesDistributedRatio"])
        }]);
        data["ChanSalesDistributedRatio"] = chanSalesDistributedRatio.establish();

        var hotBrandSalesTopRatio = new PieChart('热销品牌销售分布', [{
            name: '品牌销售比例',
            innerSize: '60%',
            data: ChartUtil.pieDataVerify(data["HotBrandSalesTopRatio"])
        }]);
        data["HotBrandSalesTopRatio"] = hotBrandSalesTopRatio.establish();

        var consumptionPowerTopRatio = new PieChart('消费能力分布', [{
            name: '能力分布比例',
            innerSize: '60%',
            data: ChartUtil.pieDataVerify(data["ConsumptionPowerTopRatio"])
        }]);
        data["ConsumptionPowerTopRatio"] = consumptionPowerTopRatio.establish();

        return data;
    }
}

InduAnalysisReq.categoryAsync = function (parameters, callback) {
    if (categoryData) {
        callback.call(null, categoryData);
        //console.log("categoryAsync:" + JSON.stringify(categoryData));
    } else {
        console.error("categoryData method call error,nodata......");
    }
}

var channelData = undefined;
InduAnalysisReq.channel = function (parameters, callback) {
    var thriftClient = new ThriftClient();
    thriftClient.client.execute("1003", "10030301", parameters, function (err, res) {
        if (err) {
            console.error("channel method call error:" + err);
        } else {
            try {
                channelData = JSON.parse(res);
                channelData = assembleChart(channelData);
                //console.log("行业渠道分析==="+JSON.stringify(channelData));
                callback.call(null, channelData);
            } catch (e) {
                console.error("channel method handler error:" + e);
            } finally {
                thriftClient.connection.end();
            }
        }
    });
    function assembleChart(data) {
        channelSalesTrend.title.text = '渠道销售趋势';
        channelSalesTrend.xAxis[0].categories = data["ChanSalesTrend"]["categories"];
        channelSalesTrend.series = data["ChanSalesTrend"]["series"];
        data["ChanSalesTrend"] = channelSalesTrend;

        var hotCatSalesTopRatio = new PieChart('热销品类销售分布', [{
            name: '品类销售比例',
            innerSize: '60%',
            data: ChartUtil.pieDataVerify(data["HotCatSalesTopRatio"])
        }]);
        data["HotCatSalesTopRatio"] = hotCatSalesTopRatio.establish();

        var hotBrandSalesTopRatio = new PieChart('热销品牌销售分布', [{
            name: '品牌销售比例',
            innerSize: '60%',
            data: ChartUtil.pieDataVerify(data["HotBrandSalesTopRatio"])
        }]);
        data["HotBrandSalesTopRatio"] = hotBrandSalesTopRatio.establish();

        var consumptionPowerTopRatio = new PieChart('消费能力分布', [{
            name: '能力分布比例',
            innerSize: '60%',
            data: ChartUtil.pieDataVerify(data["ConsumptionPowerTopRatio"])
        }]);
        data["ConsumptionPowerTopRatio"] = consumptionPowerTopRatio.establish();

        return data;
    }
}

InduAnalysisReq.channelAsync = function (parameters, callback) {
    if (channelData) {
        //console.log("行业渠道分析异步==="+JSON.stringify(channelData));
        callback.call(null, channelData);
        //console.log("channelAsync:" + JSON.stringify(channelData));
    } else {
        console.error("channelAsync method call error,nodata......");
    }
}

module.exports = InduAnalysisReq;