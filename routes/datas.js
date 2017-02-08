/**
 * Created by shiliang on 2016/7/29.
 */
var express = require('express');
var router = express.Router();
/* GET data.JSON */
router.get('/', function (req, res) {

});
router.get('/menus/menus', function (req, res) {
//    systemMgrServ.accessPermission(JSON.stringify(req.session.user), function (apData) {
//        return res.json(apData.menuInfo);
//    });
    res.json([
        {name: '首页', url: '#/main/home', icon: 'fa fa-home', children: [
        ]},
        {name: '产业前沿', url: '#/main/indufront', icon: 'fa fa-list', children: [
        ]},
        {name: '行业分析', url: '#/main/induanalysis', icon: 'fa fa-line-chart', children: [
        ]},
        {name: '销售分析', url: '#/main/salesanalysis', icon: 'fa fa-bar-chart', children: [
        ]},
        {name: '竞争分析', url: '#/main/competanalysis', icon: 'fa fa-flag', children: []},
        {name: '客户分析', url: '#/main/customanalysis', icon: 'fa fa-users', children: [
        ]},
        {name: '智能营销', url: '#/main/smartmarketing', icon: 'fa fa-lightbulb-o', children: [
        ]},
        {name: '买卖分析', url: '#/main/tradanalysis', icon: 'fa fa-shopping-cart', children: [
        ]},
        {name: '库存分析', url: '#/main/inventanalysis', icon: 'fa fa-institution', children: [
        ]},
        {name: '新品研发', url: '#/main/newprod', icon: 'fa fa-cube', children: [
        ]},
        {name: '生产线分析', url: '#/main/prodanalysis', icon: 'fa fa-cogs', children: [
        ]},
        {name: '在线ERP', url: '#/main/onlineERP', icon: 'fa fa-share-alt-square', children: [
        ]},
        {name: '专属定制', url: '#/main/exclusivecustom', icon: 'fa fa-wrench', children: [
        ]}
    ]);
});

router.get('/users/:id', function (req, res) {
    console.info("参数：%s",req.params.id)
    if(req.params.id=="logined"){
        res.json(req.session.user);
    }
});

router.get('/industry/:industry', function (req, res) {
    console.info("参数：%s",req.params.industry)
    commonReq.execute('0',JSON.stringify({industry: req.params.industry}), function (data) {
        res.json(data);
    });
});
router.get('/cates/:indu_id', function (req, res) {
    console.info("参数：%s",req.params.indu_id)
    commonReq.execute('1',JSON.stringify({indu_id: req.params.indu_id}), function (data) {
        res.json(data);
    });
});

var commonReq = require('../modules/request/commonReq.js');
var mainReq = require('../modules/request/main.js');
var induStryReq = require('../modules/request/industry.js');
var induAnalysisReq = require('../modules/request/induanalysis.js');
var newprodReq = require('../modules/request/newprod.js');

router.get('/home/:indu_id', function (req, res) {
    mainReq.firstScreenData(JSON.stringify({indu_id: req.params.indu_id}), function (data) {
        res.json(data);
    });
});
router.get('/indufront/:type/:indu_id/:tab', function (req, res) {
    if(req.params.type=='0'){
        switch (req.params.tab){
            case '0':
                induStryReq.trendDynamic(JSON.stringify({indu_id: req.params.indu_id,searchContent: req.query.keyword}), function (data) {
                    res.json(data);
                });
                break;
            case '1':
                induStryReq.sentimentAnalysis(JSON.stringify({indu_id: req.params.indu_id}), function (data) {
                    res.json(data);
                });
                break;
        }
    }else{
        induStryReq.trendDynamicAsync(JSON.stringify({indu_id: req.params.indu_id}), function (data) {
            res.json(data);
        });
    }

});

router.get('/indufrontdetail/:indu_id/:info_id', function (req, res) {
    induStryReq.dynamicDetail(JSON.stringify({indu_id: req.params.indu_id, info_id: req.params.info_id}), function (data) {
        console.info(data)
        res.json(data);
    });
});


router.get('/induanalysis/:indu_id/:tab', function (req, res) {
    switch (req.params.tab){
        case '0':
            induAnalysisReq.comprehensive(JSON.stringify({indu_id: req.params.indu_id}), function (data) {
                res.json(data);
            });
            break;
        case '1':
            induAnalysisReq.category(JSON.stringify({indu_id: req.params.indu_id, cat_id: req.query.cat_id}), function (data) {
                res.json(data);
            });
            break;
        case '2':
            induAnalysisReq.channel(JSON.stringify({indu_id: req.params.indu_id, chan_id: req.query.chan_id}), function (data) {
                res.json(data);
            });
            break;

    }
//    if(req.query.cat_id){
//        induAnalysisReq.category(JSON.stringify({indu_id: req.params.indu_id, cat_id: req.query.cat_id}), function (data) {
//            res.json(data);
//        });
//    }else if(req.query.chan_id){
//        induAnalysisReq.channel(JSON.stringify({indu_id: req.params.indu_id, chan_id: req.query.chan_id}), function (data) {
//            res.json(data);
//        });
//    }else{
//        induAnalysisReq.comprehensive(JSON.stringify({indu_id: req.params.indu_id}), function (data) {
//            res.json(data);
//        });
//    }

});

router.get('/newprod/:type/:pageSize/:pageNo/:cid', function (req, res) {
    console.info("参数：%s,%s,%s,%s,%s",req.params.cid,req.query.keyword,req.params.pageSize,req.params.pageNo,req.params.type)
    var item='';
    switch (req.params.type){
        case 'programmes':
            item='10100101';
            break;
        case 'programmeAttrs':
            item='10100102';
            break;
        case 'trconfigtypes':
            item='10100103';
            break;
        case 'timelist':
            item='10100104';
            break;
        case 'programmetypes':
            item='10100105';
            break;
    }
    newprodReq.execute(item,JSON.stringify({'cid': req.params.cid,'keyword': req.params.keyword,'pageSize':req.params.pageSize,'pageNo':req.params.pageNo,'prog_id':req.query.prog_id,'startTime':req.query.startTime,'type_id':req.query.type_id}), function (data) {
        res.send(data);
    });
});

module.exports = router;