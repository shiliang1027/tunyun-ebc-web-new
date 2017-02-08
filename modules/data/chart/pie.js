/**
 * 饼图
 * Created by gaojinbao on 2015/12/7.
 */
//var timeFormat = require('../../util/TimeFormat.js');
var PieChart = function (_title, _series) {
    this._chart = {
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
                    enabled: true,
                    style: {
                        color: "#666666",
                        fontSize: "12px",
                        fontWeight: "normal",
                        textShadow: "0 0 0px contrast, 0 0 0px contrast"
                    }
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

        series: []
    };

    this._title = _title;
    this._series = _series;
    //this._date = new timeFormat().format();
}

PieChart.prototype.establish = function () {
    this._chart.title.text = this._title;
    for (var i = 0; i < this._series.length; i++) {
        var _serie = {};
        _serie.type = 'pie';
        _serie.name = this._series[i].name;
        _serie.innerSize = this._series[i].innerSize;
        _serie.data = this._series[i].data;
        this._chart.series[i] = _serie;
    }
    //console.log(JSON.stringify(this._chart));
    return this._chart;
}
module.exports = PieChart;
