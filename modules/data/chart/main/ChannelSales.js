/**
 * Created by gaojinbao on 2015/12/3.
 */

var channelSales = {
    chart: {
        zoomType: 'xy'
    },
    title: {
        text: '2015-10-01 渠道销售分布'
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
        labels: {
            style: {color: '#097ab3'}
        }
    },
        {
            title: {
                text: null
            },
            opposite: true,
            labels: {
                style: {color: '#8fc31f'}
            },
            max: '108970'
        }],

    tooltip: {
        shared: true
    },

    legend: {
        layout: 'vertical',
        align: 'left',
        x: 300,
        verticalAlign: 'top',
        y: 50,
        floating: true,
        backgroundColor: '#FFFFFF'
    },

    series: [{
        name: '30天销售额(万元)',
        color: '#097ab3',
        type: 'column',
        data: []
    }, {
        name: '30天销售量(笔)',
        color: '#8fc31f',
        type: 'spline',
        yAxis: 1,
        data: []

    }]
};

module.exports = channelSales;