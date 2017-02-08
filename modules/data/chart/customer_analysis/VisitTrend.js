var visitTrend = {
    chart: {
        type: 'spline'
    },

    plotOptions: {
        series: {
            marker: {
                enabled: false
            }
        }
    },

    title: {
        text: '电商【淘宝】2015-09-10 访客流量趋势'
    },

    xAxis: [{
        categories: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
        title: {
            text: null
        }
    }],

    yAxis: [{
        title: {
            text: null
        },
        min: 0,
        max: 2000
    },
        {
            title: {
                text: null
            }
        }],

    tooltip: {
        shared: true,
        pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: <b>{point.y}</b><br/>'
    },

    series: [{
        name: '浏览量',
        data: [1876, 1865, 1321, 1100, 1665, 1098, 1788, 998, 899, 700, 654, 890, 1089, 1344, 1200, 1500, 1689, 1988, 1722, 1346, 1290, 1056, 1700, 1432]
    }, {
        name: '访客数',
        data: [876, 865, 321, 200, 665, 398, 788, 198, 299, 89, 154, 190, 189, 344, 200, 500, 689, 988, 722, 346, 290, 356, 500, 432]
    }]
};

module.exports = visitTrend;