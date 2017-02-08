/**
 * Created by gaojinbao on 2015/12/3.
 */
var induTopicSet = {
    chart: {
        zoomType: 'xy'
    },
    title: {
        text: '2015-07 行业话题(TOP 10)舆情'
    },

    legend: {
        margin: 0
    },

    xAxis: [{
        categories: ['行业政策', '汽车价格', '新能源', '汽车产销', '产业动态', '大排量车', '新品信息', '汽车环保', '汽车库存', '汽车燃油'],
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
            max: 5,
            min: -5
        }],

    tooltip: {
        shared: true
    },

    series: [{
        name: '热情指数',
        color: '#49baf2',
        type: 'column',
        data: [340, 133, 114, 97, 90, 79, 67, 48, 32, 30]
    }, {
        name: '舆论表情',
        color: '#a5c462',
        type: 'line',
        yAxis: 1,
        data: [3.5, 0.8, 2.1, 2.8, 1.2, 1.6, -4.3, 4.1, 0.9, 1.9]

    }]
};

module.exports = induTopicSet;