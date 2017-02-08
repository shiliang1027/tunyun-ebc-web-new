/**
 * Created by gaojinbao on 2015/12/3.
 */
//var fs= require('fs');
//var path = require('path');
var Common = require('../util/Common.js');
var ChartUtil = require('../util/ChartUtil.js');
var timeFormat = require('../util/TimeFormat.js');
var ThriftClient = require('../thrift/thrift-client.js');

var InduStryReq = function () {

}
var trendDynamicData = undefined;

InduStryReq.trendDynamic = function (parameters, callback) {
    var thriftClient = new ThriftClient();
    thriftClient.client.execute("1002", "10020101", parameters, function (err, res) {
            if (err) {
                console.error("trendDynamic method call error:" + err);
            } else {
                try {
                    trendDynamicData = JSON.parse(res);
                    //字符串截取
                    if (trendDynamicData.article_summary) {
                        var _length = 350;//截取长度
                        for (var i = 0; i < trendDynamicData.article_summary.length; i++) {
                            if (trendDynamicData.article_summary[i].summary != undefined) {
                                trendDynamicData.article_summary[i].summary = Common.Cutstr(trendDynamicData.article_summary[i].summary, _length);
                            }
                        }
                    }
                    callback.call(null, trendDynamicData);
                }
                catch (e) {
                    console.error("trendDynamic method handler error:" + err);
                }
                finally {
                    thriftClient.connection.end();
                }
            }
        }
    );
}

InduStryReq.trendDynamicAsync = function (parameters, callback) {
    if (trendDynamicData) {
        callback.call(null, trendDynamicData);
        //console.log("trendDynamicAsync:" + JSON.stringify(trendDynamicData));
    } else {
        console.error("trendDynamicAsync method call error,nodata......");
    }
}

var sentimentAnalysisData = undefined;
var PieChart = require('../data/chart/pie.js');
var induTopicSet = require('../data/chart/industry/InduTopicSet.js');
InduStryReq.sentimentAnalysis = function (parameters, callback) {
    var thriftClient = new ThriftClient();
    thriftClient.client.execute("1002", "10020201", parameters, function (err, res) {
        if (err) {
            console.error("sentimentAnalysis method call error:" + err);
        } else {
            try {
                sentimentAnalysisData = JSON.parse(res);
                sentimentAnalysisData = assembleChart(sentimentAnalysisData);
                callback.call(null, sentimentAnalysisData);
            } catch (e) {
                console.error("sentimentAnalysis method handler error:" + err);
            } finally {
                thriftClient.connection.end();
            }
        }
    });
    function assembleChart(data) {
        var format = new timeFormat();
        var cdate = format.format();
        induTopicSet.title.text = cdate + ' 行业话题(TOP 10)舆情';
        induTopicSet.xAxis[0].categories = data["InduTopicSet"]["categories"];
        induTopicSet.series = data["InduTopicSet"]["series"];
        induTopicSet.series[0].type = "column";//柱状图
        induTopicSet.series[0].color = "#49baf2";
        induTopicSet.series[1].type = "line";//线图
        induTopicSet.series[1].color = "#a5c462";
        induTopicSet.series[1].yAxis = 1;
        data["InduTopicSet"] = induTopicSet;

        var induPolicyRatio = new PieChart('行业政策舆情分布', [{
            name: '政策舆情比例',
            innerSize: '60%',
            data: ChartUtil.pieDataVerify(data["InduPolicyRatio"])
        }]);
        data["InduPolicyRatio"] = induPolicyRatio.establish();

        var hotBrandSetRatio = new PieChart('热门品牌舆情分布', [{
            name: '品牌舆情比例',
            innerSize: '60%',
            data: ChartUtil.pieDataVerify(data["HotBrandSetRatio"])
        }]);
        data["HotBrandSetRatio"] = hotBrandSetRatio.establish();

        var hotCategorySetRatio = new PieChart('热门品类舆情分布', [{
            name: '品类舆情比例',
            innerSize: '60%',
            data: ChartUtil.pieDataVerify(data["HotCategorySetRatio"])
        }]);
        data["HotCategorySetRatio"] = hotCategorySetRatio.establish();

        return data;
    }
}

InduStryReq.sentimentAnalysisAsync = function (parameters, callback) {
    if (sentimentAnalysisData) {
        callback.call(null, sentimentAnalysisData);
        console.log("sentimentAnalysisAsync:" + JSON.stringify(sentimentAnalysisData));
    } else {
        console.error("sentimentAnalysisAsync method call error,nodata......");
    }
}

InduStryReq.dynamicDetail = function (parameters, callback) {
    var thriftClient = new ThriftClient();
    thriftClient.client.execute("1002", "10020001", parameters, function (err, res) {
        if (err) {
            console.error("dynamicDetail method call error:" + err);
        } else {
            try {
                var data = JSON.parse(res);
                callback.call(null, data);
            } catch (e) {
                console.error("dynamicDetail method call error,nodata......");
            } finally {
                thriftClient.connection.end();
            }
        }
    });
}

//行业政策舆情钻取
InduStryReq.policySentimentDrill = function (parameters, callback) {
    var thriftClient = new ThriftClient();
    thriftClient.client.execute("1002", "10020203", parameters, function (err, res) {
        if (err) {
            console.error("sentimentDrill method call error:" + err);
        } else {
            try {
                var data = JSON.parse(res);
                callback.call(null, data);
            } catch (e) {
                console.error("sentimentDrill method handler error:" + err);
            } finally {
                thriftClient.connection.end();
            }
        }
    });
}

InduStryReq.sentimentDrill = function (parameters, callback) {
    var thriftClient = new ThriftClient();
    thriftClient.client.execute("1002", "10020203", parameters, function (err, res) {
        if (err) {
            console.error("sentimentDrill method call error:" + err);
        } else {
            try {
                var data = JSON.parse(res);
                callback.call(null, data);
            } catch (e) {
                console.error("sentimentDrill method handler error:" + err);
            } finally {
                thriftClient.connection.end();
            }
        }
    });
}

InduStryReq.sentimentDrillDetail = function (parameters, callback) {
    var thriftClient = new ThriftClient();
    thriftClient.client.execute("1002", "10020204", parameters, function (err, res) {
        if (err) {
            console.error("sentimentDrillDetail method call error:" + err);
        } else {
            try {
                var data = JSON.parse(res);
                callback.call(null, data);
            } catch (e) {
                console.error("sentimentDrillDetail method handler error:" + err);
            } finally {
                thriftClient.connection.end();
            }
        }
    });
}


module.exports = InduStryReq;