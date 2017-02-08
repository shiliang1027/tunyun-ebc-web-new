/**
 * Created by gaojinbao on 2015/12/10.
 */
var channelSalesTrend = {
    chart: {
        type: 'spline',
        events: {
            load: function (event) {
                for (var i = this.series.length - 1; i > 0; i--) {
                    this.series[i].hide();        //设置只显示第一条线，其他都不显示
                }
            }
        }
    },

    plotOptions: {
        series: {
            marker: {
                enabled: false
            }
        }
    },

    title: {
        text: ''
    },

    xAxis: [{
        categories: [],
        title: {
            text: null
        }
    }],

    yAxis: [{
        title: {
            text: null
        },
    },
        {
            title: {
                text: null
            },
            opposite: true,
        }],

    tooltip: {
        shared: true,
        pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: <b>{point.y}</b><br/>'
    },

    series: []
}
module.exports = channelSalesTrend;