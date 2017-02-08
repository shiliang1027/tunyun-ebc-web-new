/**
 * Created by gaojinbao on 2015/12/2.
 */
var thrift = require('thrift');

var DataServer = require('../../modules/thrift/gen-nodejs/DataServer.js');
var wtypes = require('../../modules/thrift/gen-nodejs/web_types.js');
var mainData = require('../../modules/data/main.json');
var trend_dynamic = require('../../modules/data/indu/trend_dynamic.json');
var dynamic_detail = require('../../modules/data/indu/dynamic_detail.json');
var sentiment_analysis = require('../../modules/data/indu/sentiment_analysis.json');
var induanalysis_comprehensive = require('../../modules/data/induanalysis/comprehensive.json');
var induanalysis_category_analysis = require('../../modules/data/induanalysis/category_analysis.json');
var induanalysis_channel_analysis = require('../../modules/data/induanalysis/channel_analysis.json');
var comprehensive_brand_analysis = require('../../modules/data/competition_analysis/brand_analysis.json');
var comprehensive_shop_analysis = require('../../modules/data/competition_analysis/shop_analysis.json');
var comprehensive_single_analysis = require('../../modules/data/competition_analysis/single_product.json');
var customer_ecommerce_analysis = require('../../modules/data/customer_analysis/ecommerce.json');
var setiment_analysis_drill = require('../../modules/data/indu/sentiment_analysis_drill.json');
var setiment_analysis_drill_detail = require('../../modules/data/indu/sentiment_analysis_drill_detail.json');
var user_info = require('../../modules/data/user_info.json');
var access_permission = require('../../modules/data/access_permission.json');
var attr_aduit = require('../../modules/data/bgmgr/attr_aduit.json');
var attrvalue_aduit = require('../../modules/data/bgmgr/attrvalue_aduit.json');
var cat_attr_aduit = require('../../modules/data/bgmgr/cat_attr_aduit.json');
var goods_detail = require('../../modules/data/bgmgr/goods_detail.json');
var channel = require('../../modules/data/bgmgr/channel.json');

var newprod = require('../../modules/data/newprod.json');
var count = 0;

var server = thrift.createServer(DataServer, {
    execute: function (model, item, input, callback) {
        console.log("**" + model + "--" + item + "--" + input + "**");
        if (model == "0000") {
            if (item == "00000001") {
                var param = JSON.parse(input);
                if (param.user_account == 'gjb') {
                    callback(null, JSON.stringify(user_info.user1));
                } else {
                    callback(null, JSON.stringify(user_info.user2));
                }
            } else if (item == "00000002") {
                var param = JSON.parse(input);
                if (param.uid == 100001) {
                    callback(null, JSON.stringify(access_permission.user1));
                } else {
                    callback(null, JSON.stringify(access_permission.user2));
                }
            }
        } else if (model == "1001") {
            if (item == "10010001") {
                callback(null, JSON.stringify(mainData));
            }
        } else if (model == "1002") {
            if (item == "10020101") {
                callback(null, JSON.stringify(trend_dynamic));
            } else if (item == "10020201") {
                callback(null, JSON.stringify(sentiment_analysis));
            } else if (item == "10020001") {
                callback(null, JSON.stringify(dynamic_detail));
            } else if (item == "10020203") {
                callback(null, JSON.stringify(setiment_analysis_drill));
            } else if (item == "10020204") {
                callback(null, JSON.stringify(setiment_analysis_drill_detail));
            }
        } else if (model == "1003") {
            if (item == "10030101") {
                callback(null, JSON.stringify(induanalysis_comprehensive));
            } else if (item == "10030201") {
                callback(null, JSON.stringify(induanalysis_category_analysis));
            } else if (item == "10030301") {
                callback(null, JSON.stringify(induanalysis_channel_analysis));
            }
        } else if (model == "1005") {
            if (item == "10050101") {
                callback(null, JSON.stringify(comprehensive_brand_analysis));
            } else if (item == "10050201") {
                callback(null, JSON.stringify(comprehensive_shop_analysis));
            } else if (item == "10050301") {
                callback(null, JSON.stringify(comprehensive_single_analysis));
            }
        } else if (model == "1006") {
            if (item == "10060101") {
                callback(null, JSON.stringify(customer_ecommerce_analysis));
            }
        } else if (model == "1010") {
            if (item == "10100101") {
                callback(null, JSON.stringify(newprod.programmes));
            } else if (item == "10100102") {
                callback(null, JSON.stringify(newprod.programmeAttrs));
            }else if (item == "10100103") {
                callback(null, JSON.stringify(newprod.trConfigTypes));
            }else if (item == "10100104") {
                callback(null, JSON.stringify(newprod.timeList));
            }else if (item == "10100105") {
                callback(null, JSON.stringify(newprod.programmes));
            }
        } else if (model == "9999") {
            if (item == "99990000") {
                callback(null, JSON.stringify(cat_attr_aduit));
            } else if (item == "99990001") {
                callback(null, JSON.stringify(attr_aduit));
            } else if (item == "99990002") {
                callback(null, JSON.stringify({state: 1}));
            } else if (item == "99990003") {
                callback(null, JSON.stringify(cat_attr_aduit.attrInput));
            } else if (item == "99990004") {
                if (count++ % 2 == 0) {
                    callback(null, JSON.stringify(attrvalue_aduit.a));
                } else {
                    callback(null, JSON.stringify(attrvalue_aduit.b));
                }

            } else if (item == "99990005") {
                callback(null, JSON.stringify({state: 1}));
            } else if (item == "99990006") {
                callback(null, JSON.stringify(goods_detail));
            } else if (item == "99990007") {
                callback(null, JSON.stringify(channel.channel));
            }else if (item == "99990008") {
                callback(null, JSON.stringify(attrvalue_aduit.b));
            }else if (item == "99990009") {
                callback(null, JSON.stringify(channel.categs));
            }else if (item == "99990036") {
                callback(null, JSON.stringify({code:1,detail:'提交成功'}));
            }else if (item == "99990037") {
                callback(null, JSON.stringify(channel.newprodconfig));
            }else if (item == "99990038") {
                callback(null, JSON.stringify(channel.newprodconfig));
            }
        } else if (model == "8888") {
            var result="";
            switch (item){
                case "0":
                    result=JSON.stringify(channel.industry);
                    break;
                case "1":
                    result=JSON.stringify(channel.cates);
                    break;
            }
            callback(null, result);
        } else {
            console.log("no data,please wait......");
        }
    }
});

server.listen(8999);
console.log("server start......");

server.on("error", function (e) {
    console.log(e);
});
