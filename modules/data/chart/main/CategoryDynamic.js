/**
 * Created by gaojinbao on 2015/12/3.
 */

var categoryDynamic = {
    chart: {
        type: 'column'
    },
    title: {
        text: ''
    },

    legend: {
        enabled: false
    },

    xAxis: {
        categories: [],
        title: {
            text: null
        },
        labels: {
            rotation: -30
        }
    },

    yAxis: {
        title: {
            text: '成交金额'
        },
        endOnTick: false,
        maxPadding: 0.01
    },

    tooltip: {
        headerFormat: '{point.x}<br/>',
        pointFormat: '成交金额: <b>{point.y}</b><br/>',
        valueSuffix: ' RMB',
        shared: true
    },

    series: [{
        color: '#0099e6',
        data: []
    }]
};

module.exports = categoryDynamic;