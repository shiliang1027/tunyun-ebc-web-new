/**
 * Created by gaojinbao on 2015/12/3.
 */
var enterpriseConsumptionDutyRatio = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false
    },
    title: {
        text: '2015-10-01 销售额渠道比例'
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
        name: '渠道比例',
        innerSize: '60%',
        data: [
            ['淘宝', 45.0],
            ['天猫', 26.8],
            ['京东', 10.8],
            ['苏宁易购', 8.5],
            ['当当', 6.2],
            ['一号店', 1.7],
            ['唯品会', 1.7]
        ]
    }]
};

module.exports = enterpriseConsumptionDutyRatio;