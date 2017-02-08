/**
 * Created by shiliang on 2017/1/4.
 */
define(['angularAMD'], function (angularAMD) {
    var app = angular.module('app', ['ui.router', 'ui.bootstrap','ngResource','ngAnimate']);
    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('attr',angularAMD.route({
            url: "/attr",
            templateUrl: "/tpl/bgmgr/attr.html",
            controllerUrl: "/javascripts/bgmgr/controllers/attr.js"
        })).state('attrrule',angularAMD.route({
            url: "/attrrule",
            templateUrl: "/tpl/bgmgr/attrrule.html",
            controllerUrl: "/javascripts/bgmgr/controllers/attrrule.js"
        })).state('attrruleconfig',angularAMD.route({
            url: "/attrruleconfig",
            templateUrl: "/tpl/bgmgr/attrruleconfig.html",
            controllerUrl: "/javascripts/bgmgr/controllers/attrruleconfig.js"
        })).state('attrruleregtest',angularAMD.route({
            url: "/attrruleregtest",
            templateUrl: "/tpl/bgmgr/attrruleregtest.html",
            controllerUrl: "/javascripts/bgmgr/controllers/attrruleregtest.js"
        })).state('attrruletest',angularAMD.route({
            url: "/attrruletest",
            templateUrl: "/tpl/bgmgr/attrruletest.html",
            controllerUrl: "/javascripts/bgmgr/controllers/attrruletest.js"
        })).state('attrvalue',angularAMD.route({
            url: "/attrvalue",
            templateUrl: "/tpl/bgmgr/attrvalue.html",
            controllerUrl: "/javascripts/bgmgr/controllers/attrvalue.js"
        })).state('goods',angularAMD.route({
            url: "/goods",
            templateUrl: "/tpl/bgmgr/goods.html",
            controllerUrl: "/javascripts/bgmgr/controllers/goods.js"
        })).state('goodsdetail',angularAMD.route({
            url: "/goods/:chanid/:gid",
            templateUrl: "/tpl/bgmgr/goods.html",
            controllerUrl: "/javascripts/bgmgr/controllers/goods.js"
        })).state('newprodconfig',angularAMD.route({
            url: "/newprodconfig",
            templateUrl: "/tpl/bgmgr/newprodconfig.html",
            controllerUrl: "/javascripts/bgmgr/controllers/newprodconfig.js"
        })).state('product',angularAMD.route({
            url: "/product",
            templateUrl: "/tpl/bgmgr/product.html",
            controllerUrl: "/javascripts/bgmgr/controllers/product.js"
        })).state('productdetail',angularAMD.route({
            url: "/product/:categid/:prodid",
            templateUrl: "/tpl/bgmgr/product.html",
            controllerUrl: "/javascripts/bgmgr/controllers/product.js"
        })).state('shell',angularAMD.route({
            url: "/shell",
            templateUrl: "/tpl/bgmgr/shell.html",
            controllerUrl: "/javascripts/bgmgr/controllers/shell.js"
        })).state('wordconfig',angularAMD.route({
            url: "/wordconfig",
            templateUrl: "/tpl/bgmgr/wordconfig.html",
            controllerUrl: "/javascripts/bgmgr/controllers/wordconfig.js"
        }));
        $urlRouterProvider.otherwise('/attr');
    }]);
    return angularAMD.bootstrap(app);
});