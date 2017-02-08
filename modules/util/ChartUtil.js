/**
 * 图表工具类
 * Created by gaojinbao on 2016/1/28.
 */
var ChartUtil = function () {
}

/**
 * 饼图数据校验，如果数据加起来不足100，则增加其他项数据
 * @param data
 * @param callback
 */
ChartUtil.pieDataVerify = function (data) {

    if (data) {
        var count = 0;
        for (var i = 0; i < data.length; i++) {
            count += data[i][1];
        }
        if (count < 100) {
            data[data.length] = ['其它', 100 - count];
        }
    }
    return data;
}
module.exports = ChartUtil;
