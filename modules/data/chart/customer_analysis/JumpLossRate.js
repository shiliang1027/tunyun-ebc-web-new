/**
 * Created by gaojinbao on 2015/12/11.
 */

var JumpLossRate = {
    chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false
    },
    title: {
        text: null
    },

    tooltip: {
        pointFormat: '{series.name}: <b>{point.y:.1f}%</b>'
    },

    pane: {
        startAngle: -135,
        endAngle: 135,
        background: null,
        size: 200
    },

    // the value axis
    yAxis: {
        min: 0,
        max: 100,

        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10,
        minorTickPosition: 'inside',
        minorTickColor: '#fff',

        tickPixelInterval: 50,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 32,
        tickColor: '#fff',
        labels: {
            step: 1,
            rotation: 'auto',
            distance: -35,
            style: {color: '#097ab3'}
        },
        title: {
            text: '跳失率'
        },
        plotBands: [{
            from: 0,
            to: 25,
            color: '#86c400', // green
            innerRadius: '100%',
            outerRadius: '78%'
        }, {
            from: 25,
            to: 75,
            color: '#49baf2', // yellow
            innerRadius: '100%',
            outerRadius: '78%'
        }, {
            from: 75,
            to: 100,
            color: '#c40000', // red
            innerRadius: '100%',
            outerRadius: '78%'
        }]
    },

    plotOptions: {
        gauge: {
            dial: {//仪表盘指针
                radius: '73%',
                rearLength: '10%',
                backgroundColor: '#097ab3',
                borderColor: '#097ab3',
                borderWidth: 1,
                baseWidth: 5,
                topWidth: 0,
                baseLength: '1%'
            },
            dataLabels: {
                enabled: true,
                borderColor: null,
                format: '<b style="font-size:18px;color:#097ab3">{point.y:.1f}%</b>',
                padding: 40
            }
        }
    },

    series: [{
        name: '跳失率',
        data: [45.8],
        tooltip: {
            valueSuffix: ' %'
        }
    }]

};

module.exports = JumpLossRate;