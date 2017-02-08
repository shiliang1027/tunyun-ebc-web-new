/**
 * Created by gaojinbao on 2015/12/3.
 */

var hotBrandSetRatio = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false
    },
    title: {
        text: ''
    },

    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },

    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true
            },
            point: {
                events: {
                    legendItemClick: function () {
                        this.select();
                        this.show();
                    },
                }
            }
        }
    },

    series: [{
        type: 'pie',
        name: '热情度比例',
        innerSize: '60%',
        data: []
    }]
};

module.exports = hotBrandSetRatio;