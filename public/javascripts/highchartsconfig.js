/**
 * Created by shiliang on 2016/12/13.
 */
define(['highcharts'], function (Highcharts) {
    Highcharts.setOptions({
        lang: {
            //设置highcharts的全局常量的中文值，如月份、星期、按钮文字等
            months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            shortMonths: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            weekdays: ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
            resetZoom: '查看全图',
            resetZoomTitle: '查看全图',
            downloadPNG: '下载PNG',
            downloadJPEG: '下载JPEG',
            downloadPDF: '下载PDF',
            downloadSVG: '下载SVG',
            exportButtonTitle: '导出成图片',
            printButtonTitle: '打印图表',
            loading: '数据加载中，请稍候...'
        },

        exporting: false,

        chart: {
            borderWidth: 0,
            style: {
                fontFamily: 'Tahoma, "microsoft yahei", 微软雅黑, 宋体;'
            }
        },

        title: {
            style: {
                color: '#666666',
                font: '16px Tahoma, "microsoft yahei", 微软雅黑, 宋体;'
            }
        },
        subtitle: {
            style: {
                color: '#999999',
                font: '14px Tahoma, "microsoft yahei", 微软雅黑, 宋体;'
            }
        },

        colors: ['#62C87F', '#5D9CEC', '#FC863F', '#F15755', '#7053B6', '#FFCE55', '#6ED5E6', '#F57BC1', '#DCB186', '#647C9D'],

        xAxis: {
            lineColor: '#999',
            tickColor: '#e8e8e8',
            labels: {
                style: {
                    color: '#666666',
                    font: '12px Tahoma, "microsoft yahei", 微软雅黑, 宋体;'
                }
            },
            title: {
                style: {
                    color: '#666666',
                    font: '12px Tahoma, "microsoft yahei", 微软雅黑, 宋体;'
                }
            }
        },

        yAxis: {
            lineWidth: 0,
            tickWidth: 0,
            lineColor: '#999',
            tickColor: '#e8e8e8',
            gridLineDashStyle: 'Dash',
            labels: {
                style: {
                    color: '#666666',
                    font: '12px Tahoma, "microsoft yahei", 微软雅黑, 宋体;'
                }
            },
            title: {
                style: {
                    color: '#666666',
                    font: '12px Tahoma, "microsoft yahei", 微软雅黑, 宋体;'
                }
            }
        },

        tooltip: {
            style: {
                color: '#666666',
                font: '12px Tahoma, "microsoft yahei", 微软雅黑, 宋体;'
            },
            crosshairs: {
                width: 1,
                color: '#7ac943',
                dashStyle: 'ShortDot'
            }
        },

        legend: {
            enabled: true,
            itemStyle: {
                color: '#666666',
                font: '12px Tahoma, "microsoft yahei", 微软雅黑, 宋体;',
                fontWeight: 'normal'
            }
        },

        credits: {
            enabled: false
        }
    });
});