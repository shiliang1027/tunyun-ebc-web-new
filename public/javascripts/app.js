/**
 * Created by shiliang on 2016/7/6.
 */
define(['angularAMD'], function (angularAMD) {
    var app = angular.module('app', ['ui.router', 'ui.bootstrap', 'angular-jqcloud','ngResource','ngAnimate']);
    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('main',angularAMD.route({
            url: "/main",
            templateUrl: "/tpl/index.html",
            controllerUrl: "/javascripts/controllers/index.js"
        })).state('main.home',angularAMD.route({
            url: "/home",
            templateUrl: "/tpl/home.html",
            controllerUrl: "/javascripts/controllers/home.js"
        })).state('main.indufrontdetail',angularAMD.route({
            url: "/indufront/detail/:id",
            templateUrl: "/tpl/indufront/detail.html",
            controllerUrl: "/javascripts/controllers/indufrontdetail.js"
        })).state('main.indufront',angularAMD.route({
            url: "/indufront",
            templateUrl: "/tpl/indufront.html",
            controllerUrl: "/javascripts/controllers/indufront.js"
        })).state('main.induanalysis',angularAMD.route({
            url: "/induanalysis",
            templateUrl: "/tpl/induanalysis.html",
            controllerUrl: "/javascripts/controllers/induanalysis.js"
        })).state('main.salesanalysis',angularAMD.route({
            url: "/salesanalysis",
            templateUrl: "/tpl/salesanalysis.html",
            controllerUrl: "/javascripts/controllers/salesanalysis.js"
        })).state('main.competanalysis',angularAMD.route({
            url: "/competanalysis",
            templateUrl: "/tpl/competanalysis.html",
            controllerUrl: "/javascripts/controllers/competanalysis.js"
        })).state('main.customanalysis',angularAMD.route({
            url: "/customanalysis",
            templateUrl: "/tpl/customanalysis.html",
            controllerUrl: "/javascripts/controllers/customanalysis.js"
        })).state('main.smartmarketing',angularAMD.route({
            url: "/smartmarketing",
            templateUrl: "/tpl/smartmarketing.html",
            controllerUrl: "/javascripts/controllers/smartmarketing.js"
        })).state('main.tradanalysis',angularAMD.route({
            url: "/tradanalysis",
            templateUrl: "/tpl/tradanalysis.html",
            controllerUrl: "/javascripts/controllers/tradanalysis.js"
        })).state('main.inventanalysis',angularAMD.route({
            url: "/inventanalysis",
            templateUrl: "/tpl/inventanalysis.html",
            controllerUrl: "/javascripts/controllers/inventanalysis.js"
        })).state('main.newprod',angularAMD.route({
            url: "/newprod",
            templateUrl: "/tpl/newprod.html",
            controllerUrl: "/javascripts/controllers/newprod.js"
        })).state('main.prodanalysis',angularAMD.route({
            url: "/prodanalysis",
            templateUrl: "/tpl/prodanalysis.html",
            controllerUrl: "/javascripts/controllers/prodanalysis.js"
        })).state('main.onlineERP',angularAMD.route({
            url: "/onlineERP",
            templateUrl: "/tpl/onlineERP.html",
            controllerUrl: "/javascripts/controllers/onlineERP.js"
        })).state('main.exclusivecustom',angularAMD.route({
            url: "/exclusivecustom",
            templateUrl: "/tpl/exclusivecustom.html",
            controllerUrl: "/javascripts/controllers/exclusivecustom.js"
        }));
        $urlRouterProvider.otherwise('/main/home');
    }]);
    return angularAMD.bootstrap(app);
});