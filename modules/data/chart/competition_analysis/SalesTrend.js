/**
 * Created by gaojinbao on 2015/12/10.
 */
var salesThend = {
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
        text: '2015-07 品类【小型车】销售趋势'
    },

    xAxis: [{
        categories: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
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

    series: [{
        name: '30天销售额(万元)',
        color: '#0099e6',
        yAxis: 0,
        data: [1876, 1865, 1321, 1100, 1665, 1098, 1788, 998, 899, 700, 654, 890, 1089, 1344, 1200, 1500, 1689, 1988, 1722, 1346, 1290, 1056, 1700, 1432, 1234, 1675, 1944, 1457, 1586, 970, 1045]
    }, {
        name: '30天销售量(笔)',
        color: '#86c400',
        yAxis: 1,
        data: [58970, 49760, 46783, 45076, 33121, 39874, 29652, 48970, 39760, 56783, 25076, 43121, 59874, 32952, 45370, 32460, 12583, 43433, 76543, 23455, 74522, 21235, 39760, 32465, 23876, 45654, 32445, 34564, 32434, 45983, 23445]

    }]
}
module.exports = salesThend;