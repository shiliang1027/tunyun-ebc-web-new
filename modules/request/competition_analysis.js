/**
 * Created by gaojinbao on 2015/12/11.
 */
var ChartUtil = require('../util/ChartUtil.js');
var timeFormat = require('../util/TimeFormat.js');
var ThriftClient = require('../thrift/thrift-client.js');
//获取首页数据
var indexData = require('../data/index.json');
//获取chart模型
var PieChart = require('../data/chart/pie.js');
var SalesTrend = require('../data/chart/competition_analysis/SalesTrend.js');

//竞争分析
var CompAnalysisReq = function () {

}
//竞争品牌
var brandAnyData = undefined;
CompAnalysisReq.brandAny = function (parameters, callback) {
    var thriftClient = new ThriftClient();
    thriftClient.client.execute("1005", "10050101", parameters, function (err, res) {
        if (err) {
            console.error("brandAny method call error:" + err);
        } else {
            try {
                brandAnyData = JSON.parse(res);
                brandAnyData = assembleChart(brandAnyData);
                callback.call(null, brandAnyData);
            } catch (e) {
                console.error("brandAny method handler error:" + e);
            } finally {
                thriftClient.connection.end();
            }
        }
    });
    function assembleChart(data) {

        SalesTrend.title.text = '品牌销售趋势';
        SalesTrend.xAxis[0].categories = data["SalesTrend"]["categories"];
        SalesTrend.series = data["SalesTrend"]["series"];
        data["SalesTrend"] = SalesTrend;

        var chanSalesDistributedRatio = new PieChart('渠道行业占比', [{
            name: '行业比例',
            innerSize: '60%',
            data: ChartUtil.pieDataVerify(data["ChanSalesDistributedRatio"])
        }]);
        data["ChanSalesDistributedRatio"] = chanSalesDistributedRatio.establish();

        var hotCatSalesTopRatio = new PieChart('热销品类销售分布', [{
            name: '销售分布比例',
            innerSize: '60%',
            data: ChartUtil.pieDataVerify(data["HotCatSalesTopRatio"])
        }]);
        data["HotCatSalesTopRatio"] = hotCatSalesTopRatio.establish();

        var consumptionPowerTopRatio = new PieChart('消费能力分布', [{
            name: '能力分布比例',
            innerSize: '60%',
            data: ChartUtil.pieDataVerify(data["ConsumptionPowerTopRatio"])
        }]);
        data["ConsumptionPowerTopRatio"] = consumptionPowerTopRatio.establish();

        return data;
    }
}
CompAnalysisReq.brandAnyAsync = function (parameters, callback) {
    if (brandAnyData) {
        callback.call(null, brandAnyData);
    } else {
        console.error("brandAnyAsync method call error,nodata......");
    }
}

//竞争店铺
var shopAnyData = undefined;
CompAnalysisReq.shopAny = function (parameters, callback) {
    var thriftClient = new ThriftClient();
    thriftClient.client.execute("1005", "10050201", parameters, function (err, res) {
        if (err) {
            console.error("shopAny method call error:" + err);
        } else {
            try {
                shopAnyData = JSON.parse(res);
                shopAnyData = assembleChart(shopAnyData);
                callback.call(null, shopAnyData);
            } catch (e) {
                console.error("shopAny method call error,nodata......");
            } finally {
                thriftClient.connection.end();
            }
        }
    });
    function assembleChart(data) {

        SalesTrend.title.text = '店铺销售趋势';
        SalesTrend.xAxis[0].categories = data["SalesTrend"]["categories"];
        SalesTrend.series = data["SalesTrend"]["series"];
        data["SalesTrend"] = SalesTrend;

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
CompAnalysisReq.shopAnyAsync = function (parameters, callback) {
    if (shopAnyData) {
        callback.call(null, shopAnyData);
    } else {
        console.error("shopAnyAsync method call error,nodata......");
    }
}
//单品
var singleAnyData = undefined;
CompAnalysisReq.singleAny = function (parameters, callback) {
    var thriftClient = new ThriftClient();
    thriftClient.client.execute("1005", "10050301", parameters, function (err, res) {
        if (err) {
            console.error("singleAny method call error:" + err);
        } else {
            try {
                singleAnyData = JSON.parse(res);
                singleAnyData = assembleChart(singleAnyData);
                callback.call(null, singleAnyData);
            } catch (e) {
                console.error("singleAny method call error,nodata......");
            } finally {
                thriftClient.connection.end();
            }
        }
    });
    function assembleChart(data) {

        SalesTrend.title.text = '品类销售趋势';
        SalesTrend.xAxis[0].categories = data["SalesTrend"]["categories"];
        SalesTrend.series = data["SalesTrend"]["series"];
        data["SalesTrend"] = SalesTrend;

        var chanSalesDistributedRatio = new PieChart('渠道行业占比', [{
            name: '行业比例',
            innerSize: '60%',
            data: ChartUtil.pieDataVerify(data["ChanSalesDistributedRatio"])
        }]);
        data["ChanSalesDistributedRatio"] = chanSalesDistributedRatio.establish();

        var hotShopSalesTopRatio = new PieChart('热销品牌销售分布', [{
            name: '分布比例',
            innerSize: '60%',
            data: ChartUtil.pieDataVerify(data["HotShopSalesTopRatio"])
        }]);
        data["HotShopSalesTopRatio"] = hotShopSalesTopRatio.establish();

        return data;
    }
}
CompAnalysisReq.singleAnyAsync = function (parameters, callback) {
    if (singleAnyData) {
        callback.call(null, singleAnyData);
    } else {
        console.error("singleAnyAsync method call error,nodata......");
    }
}

module.exports = CompAnalysisReq;