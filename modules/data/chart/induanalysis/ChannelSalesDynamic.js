/**
 * Created by gaojinbao on 2015/12/10.
 */
var channelSalesDyna = {
    chart: {
        type: 'line'
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
        },
        tickInterval: 2
    }],

    yAxis: [{
        title: {
            text: null
        },
        labels: {
            style: {color: '#0099e6'}
        },
        min: 0
    }],

    tooltip: {
        shared: true,
        pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: <b>{point.y}</b><br/>'
    },

    series: []
};

module.exports = channelSalesDyna;