/**
 * 后台管理路由
 * Created by gaojinbao on 2016/4/13.
 */

var express = require('express');

var router = express.Router();

var bgmgrReq = require('../modules/request/bgmgr.js');

var nodeExcel = require('excel-export');

var moment = require('moment');

router.get('/', function (req, res, next) {
    res.render('bgmanager/index');
});
/**
 * 属性审核界面
 */
//router.get('/attrconfirm', function (req, res, next) {
//    res.render('bgmanager/attr-confirm');
//});

/**
 * 属性审核数据
 */
router.post('/attrconfirm/searchattr', function (req, res, next) {
    bgmgrReq.execute('99990001',JSON.stringify({"cid": req.body.cid, "cname": req.body.cname,"startTime": req.body.startTime, "endTime": req.body.endTime}), function (data) {
        res.send(data);
    });
});

/**
 * 属性值详情查询
 */
router.post('/attrconfirm/queryAttrDetails', function (req, res, next) {
    bgmgrReq.execute('99990020',JSON.stringify({"cid": req.body.cid, "p_alias": req.body.p_alias, "startTime": req.body.startTime, "endTime": req.body.endTime}), function (data) {
        res.send(data);
    });
});

/**
 * 删除属性
 */
router.post('/attrconfirm/delattr', function (req, res, next) {
    bgmgrReq.execute('99990016',JSON.stringify({"params": req.body.params, "startTime": req.body.startTime, "endTime": req.body.endTime}), function (data) {
        res.send(data);
    });
});
/**
 * 合并属性
 */
router.post('/attrconfirm/mergeattr', function (req, res, next) {
    bgmgrReq.execute('99990017',JSON.stringify({"params": req.body.params, "approved": req.body.approved, "pname": req.body.pname, "cid": req.body.cid, "cname": req.body.cname, "startTime": req.body.startTime, "endTime": req.body.endTime}), function (data) {
        res.send(data);
    });
});
/**
 * 拆分属性
 */
router.post('/attrconfirm/splitattr', function (req, res, next) {
    bgmgrReq.execute('99990018',JSON.stringify({"params": req.body.params, "cid": req.body.cid, "cname": req.body.cname, "startTime": req.body.startTime, "endTime": req.body.endTime}), function (data) {
        res.send(data);
    });
});
/**
 * 新增属性
 */
router.post('/attrconfirm/addattr', function (req, res, next) {
    bgmgrReq.execute('99990019',JSON.stringify({"params": req.body.params, "cid": req.body.cid, "cname": req.body.cname, "startTime": req.body.startTime, "endTime": req.body.endTime}), function (data) {
        res.send(data);
    });
});

/**********************************************************************************************************************/
/**********************************************************************************************************************/
/**********************************************************************************************************************/
/**********************************************************************************************************************/
/**********************************************************************************************************************/
/**********************************************************************************************************************/


//router.get('/attrvalue', function (req, res, next) {
//    res.render('bgmanager/attrvalue');
//});

router.get('/attrvalue/search', function (req, res, next) {
    bgmgrReq.execute(req.query.type==0?'99990030':'99990031',JSON.stringify({"cid": req.query.cid, "cname": req.query.cname, "pid": req.query.pid, "pname": req.query.pname, "startTime": req.query.startTime, "endTime": req.query.endTime,'keyword': req.query.keyword,'keyword1': req.query.keyword1,'pageSize':req.query.pageSize,'pageNo':req.query.pageNo}), function (data) {
        res.send(data);
    });
});


/**
 * 属性值审核界面
 */
//router.get('/attrvalueconfirm', function (req, res, next) {
//    res.render('bgmanager/attrvalue-confirm');
//});

/**
 * 属性值审核属性查询
 */
router.get('/attrvalueconfirm/searchattr', function (req, res, next) {
    bgmgrReq.execute('99990003',JSON.stringify({"cid": req.query.cid, "cname": req.query.cname}), function (data) {
        res.send(data);
    });
});

/**
 * 属性值数据查询
 */
router.post('/attrvalueconfirm/searchattrvalue', function (req, res, next) {
    bgmgrReq.execute('99990004',JSON.stringify({"cid": req.body.cid, "cname": req.body.cname, "pid": req.body.pid, "pname": req.body.pname, "startTime": req.body.startTime, "endTime": req.body.endTime}), function (data) {
        res.send(data);
    });
});
/**
 * 属性值详情查询
 */
router.post('/attrvalueconfirm/queryAttrValueDetails', function (req, res, next) {
    bgmgrReq.execute('99990015',JSON.stringify({"cid": req.body.cid,"p_id":req.body.p_id,"p_name":req.body.p_name, "v_alias": req.body.v_alias, "startTime": req.body.startTime, "endTime": req.body.endTime}), function (data) {
        res.send(data);
    });
});

/**
 * 删除属性值数据
 */
router.post('/attrvalueconfirm/delattrvalue', function (req, res, next) {
    bgmgrReq.execute('99990011',JSON.stringify({"params": req.body.params,"params1": req.body.params1, "vname": req.body.vname, "cid": req.body.cid, "cname": req.body.cname, "pid": req.body.pid, "pname": req.body.pname,"startTime": req.body.startTime, "endTime": req.body.endTime}), function (data) {
        res.send(data);
    });
});

/**
 * 合并属性值数据
 */
router.post('/attrvalueconfirm/mergeattrvalue', function (req, res, next) {
    bgmgrReq.execute('99990012',JSON.stringify({"params": req.body.params, "approved": req.body.approved, "vname": req.body.vname, "cid": req.body.cid, "cname": req.body.cname, "pid": req.body.pid, "pname": req.body.pname, "startTime": req.body.startTime, "endTime": req.body.endTime}), function (data) {
        res.send(data);
    });
});

/**
 * 拆分属性值数据
 */
router.post('/attrvalueconfirm/splitattrvalue', function (req, res, next) {
    bgmgrReq.execute('99990013',JSON.stringify({"params": req.body.params, "cid": req.body.cid, "cname": req.body.cname, "pid": req.body.pid, "pname": req.body.pname, "startTime": req.body.startTime, "endTime": req.body.endTime}), function (data) {
        res.send(data);
    });
});

/**
 * 新增属性值数据
 */
router.post('/attrvalueconfirm/addattrvalue', function (req, res, next) {
    bgmgrReq.execute('99990014',JSON.stringify({"params": req.body.params,"params1": req.body.params1, "cid": req.body.cid, "cname": req.body.cname, "pid": req.body.pid, "pname": req.body.pname, "startTime": req.body.startTime, "endTime": req.body.endTime}), function (data) {
        res.send(data);
    });
});

/**
 * 属性值下载
 */
router.get('/attrvalueconfirm/attrvalueDownload', function (req, res, next) {
    var cid = req.query.cid;
    var pid = req.query.pid;
    var time = moment().format('YYYYMMDD_HHmmss');//获取当前时间
    var fileName = '属性值_' + time + '.xlsx';//下载文件名称
    bgmgrReq.downLoadAttrValueAduitData({"cid": cid, "pid": pid}, function (data) {
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader("Content-Disposition", "attachment; filename=" + encodeURIComponent(fileName));
        res.end(data, 'binary');
    });
});

/**********************************************************************************************************************/
/**********************************************************************************************************************/
/**********************************************************************************************************************/
/**********************************************************************************************************************/
/**********************************************************************************************************************/
/**********************************************************************************************************************/

/**
 * 商品详情页面
 */
//router.get('/goods-detail', function (req, res, next) {
//    res.render('bgmanager/goods-detail', {"chanid": req.query.chanid, "gid": req.query.gid, "categid": req.query.categid});
//});

/**
 * 商品详情页-查询
 */
router.get('/goods-detail/search', function (req, res, next) {
    var chanid = req.query.chanid;
    var gid = req.query.gid;
    bgmgrReq.execute('99990006',JSON.stringify({"gid": gid, "chanid": chanid}), function (data) {
        res.send(data);
    });
});

router.get('/chans/search', function (req, res, next) {
    bgmgrReq.execute('99990007',JSON.stringify({}), function (data) {
        res.send(data);
    });
});
router.get('/categs/search', function (req, res, next) {
    bgmgrReq.execute('99990009',JSON.stringify({'p_id':req.query.p_id}), function (data) {
        res.send(data);
    });
});
/**
 * 产品详情页面
 */
//router.get('/product-detail', function (req, res, next) {
//    res.render('bgmanager/product-detail', {"categid": req.query.categid, "prodid": req.query.prodid});
//});

/**
 * 产品详情页-查询
 */
router.get('/product/search', function (req, res, next) {
    var uid = req.query.uid;
    var prodid = req.query.prodid;
    bgmgrReq.execute('99990010',JSON.stringify({"uid": uid, "prodid": prodid}), function (data) {
        res.send(data);
    });
});
/**********************************************************************************************************************/
/**********************************************************************************************************************/
/**********************************************************************************************************************/
/**********************************************************************************************************************/
/**********************************************************************************************************************/
/**********************************************************************************************************************/

/**
 * 属性规则配置
 */
//router.get('/attrrule', function (req, res, next) {
//    res.render('bgmanager/attrrule');
//});
router.get('/attrrule/search', function (req, res, next) {
    bgmgrReq.execute('99990021',JSON.stringify({"cid": req.query.cid,"chan_id":req.query.chan_id,"p_name":req.query.p_name}), function (data) {
        res.send(data);
    });
});
router.post('/attrrule/save', function (req, res, next) {
    bgmgrReq.execute('99990022',req.body.params, function (data) {
        res.send(data);
    });
});
router.post('/attrrule/clear', function (req, res, next) {
    bgmgrReq.execute('99990023',req.body.params, function (data) {
        res.send(data);
    });
});
router.post('/attrrule/test', function (req, res, next) {
    bgmgrReq.execute('99990024',JSON.stringify({"shell": "/home/op/process/ebc/ResStandard/detailTest.sh "+req.body.cid+" "+req.body.p_name+" "+req.body.time+" "+req.body.chan_id}), function (data) {
        res.send(data);
    });
});
//router.get('/attrrule/test', function (req, res, next) {
//    res.render('bgmanager/attrruletest', {"time":req.query.time,"pageNo":req.query.pageNo,"pageSize":req.query.pageSize,"cid": req.query.cid,"chan_id":req.query.chan_id,"p_value":req.query.p_value});
//});
router.get('/attrrule/testQuery', function (req, res, next) {
    bgmgrReq.execute('99990025',JSON.stringify({"time":req.query.time,"pageNo":req.query.pageNo,"pageSize":req.query.pageSize,"cid": req.query.cid,"chan_id":req.query.chan_id,"p_value":req.query.p_value}), function (data) {
        res.send(data);
    });
});

//router.get('/attrrule/config', function (req, res, next) {
//    res.render('bgmanager/attrruleconfig', {"time":req.query.time,"cid": req.query.cid,"chan_id":req.query.chan_id});
//});
router.get('/attrrule/config/create', function (req, res, next) {
    bgmgrReq.execute('99990024',JSON.stringify({"shell": "/home/op/process/ebc/ResStandard/modelTest.sh "+req.query.cid+" "+req.query.chan_id+" "+req.query.time}), function (data) {
        res.send(data);
    });
});
router.get('/attrrule/config/search', function (req, res, next) {
    bgmgrReq.execute('99990026',JSON.stringify({"time":req.query.time,"pageNo":req.query.pageNo,"pageSize":req.query.pageSize,"cid": req.query.cid,"chan_id":req.query.chan_id}), function (data) {
        res.send(data);
    });
});
router.post('/attrrule/config/save', function (req, res, next) {
    bgmgrReq.execute('99990027',req.body.params, function (data) {
        res.send(data);
    });
});


//router.get('/attrrule/regtest', function (req, res, next) {
//    res.render('bgmanager/attrruleregtest', {"time":req.query.time,"cid": req.query.cid,"chan_id":req.query.chan_id,"pid": req.query.pid,"p_name":req.query.p_name});
//});

router.get('/attrrule/regtest/create', function (req, res, next) {
    bgmgrReq.execute('99990024',JSON.stringify({"shell": "/home/op/process/ebc/ResStandard/valueTest.sh "+req.query.cid+" "+req.query.chan_id+" "+req.query.p_name+" "+req.query.time}), function (data) {
        res.send(data);
    });
});

router.get('/attrrule/regtest/search', function (req, res, next) {
    bgmgrReq.execute('99990028',JSON.stringify({"time":req.query.time,"pageNo":req.query.pageNo,"pageSize":req.query.pageSize,"cid": req.query.cid,"chan_id":req.query.chan_id,"p_name":req.query.p_name,"p_value":req.query.p_value}), function (data) {
        res.send(data);
    });
});
router.get('/attrrule/attrs/search', function (req, res, next) {
    bgmgrReq.execute('99990029',JSON.stringify({"cid": req.query.cid, "cname": req.query.cname,"chan_id": req.query.chan_id}), function (data) {
        res.send(data);
    });
});

/**********************************************************************************************************************/
/**********************************************************************************************************************/
/**********************************************************************************************************************/
/**********************************************************************************************************************/
/**********************************************************************************************************************/
/**********************************************************************************************************************/

//router.get('/word/config', function (req, res, next) {
//    res.render('bgmanager/wordconfig', {"time":req.query.time,"cid": req.query.cid,"p_id":req.query.p_id});
//});
router.get('/word/search', function (req, res, next) {
    bgmgrReq.execute('99990032',JSON.stringify({'is_check':req.query.is_check,'check_result':req.query.check_result,"cid": req.query.cid, "cname": req.query.cname, "pid": req.query.pid, "pname": req.query.pname, "startTime": req.query.startTime, "endTime": req.query.endTime,'keyword': req.query.keyword,'pageSize':req.query.pageSize,'pageNo':req.query.pageNo}), function (data) {
        res.send(data);
    });
});

router.post('/word/save', function (req, res, next) {
    bgmgrReq.execute('99990033',JSON.stringify({"params": req.body.params,"cid": req.body.cid,"startTime": req.body.startTime, "endTime": req.body.endTime}), function (data) {
        res.send(data);
    });
});
router.post('/word/del', function (req, res, next) {
    bgmgrReq.execute('99990034',JSON.stringify({"params": req.body.params,"cid": req.body.cid,"startTime": req.body.startTime, "endTime": req.body.endTime}), function (data) {
        res.send(data);
    });
});
router.post('/word/update', function (req, res, next) {
    bgmgrReq.execute('99990035',JSON.stringify({"params": req.body.params,"cid": req.body.cid,"startTime": req.body.startTime, "endTime": req.body.endTime}), function (data) {
        res.send(data);
    });
});

//router.get('/shell', function (req, res, next) {
//    res.render('bgmanager/shell', {"time":req.query.time,"cid": req.query.cid,"p_id":req.query.p_id});
//});

router.post('/shell', function (req, res, next) {
    console.info(req.body)
    bgmgrReq.execute('99990036',JSON.stringify(req.body), function (data) {
        res.send(data);
    });
});


//router.get('/newprod/config', function (req, res, next) {
//    res.render('bgmanager/newprodconfig');
//});
router.get('/newprod/config/search', function (req, res, next) {
    bgmgrReq.execute('99990037',JSON.stringify({'cid':req.query.cid,'pid':req.query.pid,'keyword': req.query.keyword,'keyword1': req.query.keyword1,'pageSize':req.query.pageSize,'pageNo':req.query.pageNo} ), function (data) {
        res.send(data);
    });
});
router.post('/newprod/config/save', function (req, res, next) {
    bgmgrReq.execute('99990038',req.body.params, function (data) {
        res.send(data);
    });
});

module.exports = router;
