/**
 * Created by gaojinbao on 2015/12/3.
 */

var brandDynamic = {
    chart: {
        type: 'bubble',
        zoomType: 'xy'
    },

    title: {
        text: ''
    },

    plotOptions: {
        bubble: {
            /*dataLabels :{
             enabled:true,
             style: {
             color: '#666666',
             font: '16px Tahoma, "microsoft yahei", 微软雅黑, 宋体;',
             fontWeight: 'normal'
             }
             },*/
            maxSize: 60
        }
    },

    xAxis: {
        title: {
            text: '褒贬度'
        }
    },

    yAxis: {
        title: {
            enabled: true,
            text: '关注度'
        }
    },

    tooltip: {
        headerFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}<br>'
    },

    series: []
};

module.exports = brandDynamic;
