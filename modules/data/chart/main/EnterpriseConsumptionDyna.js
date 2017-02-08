/**
 * Created by gaojinbao on 2015/12/3.
 */
var enterpriseConsumptionDyna = {
    chart: {
        type: 'spline',
        events: {
            load: {}
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
        text: '2015-10-01 企业销售趋势动态'
    },

    xAxis: [{
        categories: [],
        title: {
            text: null
        },
        tickInterval: 2
    }],

    yAxis: [{
        title: {
            text: null
        },
        labels: {
            style: {color: '#0099e6'}
        }
    },
        {
            title: {
                text: null
            },
            opposite: true,
            labels: {
                style: {color: '#cccccc'}
            },
            max: '58970'
        }],

    tooltip: {
        shared: true,
        pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: <b>{point.y}</b><br/>'
    },

    series: [{
        name: '30天销售额(万元)',
        color: '#0099e6',
        data: []
    }, {
        name: '30天销售数(笔)',
        color: '#86c400',
        yAxis: 1,
        data: []

    }]
};

module.exports = enterpriseConsumptionDyna;