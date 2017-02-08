/**
 * Created by gaojinbao on 2015/12/3.
 */
var consumptionPower = {
    chart: {
        zoomType: 'xy'
    },
    title: {
        text: ''
    },

    legend: {
        margin: 0
    },

    xAxis: [{
        categories: [],
        title: {
            text: null
        },

        labels: {
            rotation: -30
        }
    }],

    yAxis: [{
        title: {
            text: null
        },
        labels: {
            style: {color: '#49baf2'}
        }
    },
        {
            title: {
                text: null
            },
            opposite: true,
            labels: {
                style: {color: '#a5c462'}
            },
            max: '108970'
        }],

    tooltip: {
        shared: true
    },

    series: [{
        name: '消费金额(万元)',
        color: '#49baf2',
        type: 'column',
        data: []
    }, {
        name: '消费笔数(笔)',
        color: '#a5c462',
        type: 'spline',
        yAxis: 1,
        data: []

    }]
};

module.exports = consumptionPower;