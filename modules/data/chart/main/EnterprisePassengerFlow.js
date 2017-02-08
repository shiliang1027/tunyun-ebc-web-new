/**
 * Created by gaojinbao on 2015/12/3.
 */
var enterprisePassengerFlow = {
    chart: {
        type: 'area'
    },

    plotOptions: {
        area: {
            stacking: 'normal',
            lineWidth: 1,
            marker: {
                lineWidth: 1,
            }
        }
    },

    title: {
        text: '2015-07 企业客流趋势动态'
    },

    xAxis: [{
        categories: ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'],
        title: {
            text: null
        },
        tickInterval: 3,
        tickmarkPlacement: 'on'
    }],

    yAxis: [{
        title: {
            text: null
        }
    }],

    tooltip: {
        shared: true
    },

    series: [{
        name: '进店数',
        color: '#0099e6',
        data: [1876, 1865, 1321, 1100, 1665, 1098, 1788, 998, 899, 700, 654, 890, 1089, 1344, 1200, 1500, 1689, 1988, 1722, 1346, 1290, 1056, 1700, 1432, 1234, 1675, 1944, 1457, 1586, 970, 1045]
    }, {
        name: '路过数',
        color: '#e7eff3',
        data: [8970, 9760, 6783, 5076, 3121, 9874, 9652, 8970, 9760, 6783, 5076, 3121, 9874, 2952, 5370, 2460, 2583, 3433, 6543, 3455, 4522, 2235, 9760, 2465, 3876, 5654, 2445, 3564, 2434, 4983, 2445]

    }]
};
module.exports = enterprisePassengerFlow;