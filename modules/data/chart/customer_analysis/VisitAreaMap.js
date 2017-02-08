/**
 * Created by gaojinbao on 2015/12/17.
 */
var VisitAreaMap = {
    tooltip: {
        trigger: 'item'
    },
    dataRange: {
        orient: 'horizontal',
        min: 0,
        max: 3789,
        x: 'center',
        y: 'bottom',
        text: ['高', '低'],           // 文本，默认为数值文本
        calculable: true
    },
    series: [
        {
            name: '访客数:',
            type: 'map',
            mapType: 'china',
            data: [
                {name: '北京', value: 1705},
                {name: '天津', value: 1280},
                {name: '上海', value: 1842},
                {name: '重庆', value: 1268},
                {name: '河北', value: 1324},
                {name: '河南', value: 1673},
                {name: '云南', value: 986},
                {name: '辽宁', value: 876},
                {name: '黑龙江', value: 842},
                {name: '湖南', value: 1345},
                {name: '安徽', value: 1643},
                {name: '山东', value: 2078},
                {name: '新疆', value: 1054},
                {name: '江苏', value: 2679},
                {name: '浙江', value: 3789},
                {name: '江西', value: 1470},
                {name: '湖北', value: 1367},
                {name: '广西', value: 1234},
                {name: '甘肃', value: 678},
                {name: '山西', value: 1345},
                {name: '内蒙古', value: 1237},
                {name: '陕西', value: 1890},
                {name: '吉林', value: 1098},
                {name: '福建', value: 1678},
                {name: '贵州', value: 1467},
                {name: '广东', value: 3987},
                {name: '青海', value: 324},
                {name: '西藏', value: 456},
                {name: '四川', value: 2034},
                {name: '宁夏', value: 547},
                {name: '海南', value: 1063},
                {name: '台湾', value: 2452},
                {name: '香港', value: 2687},
                {name: '澳门', value: 2345}
            ]
        }
    ]
};

module.exports = VisitAreaMap;