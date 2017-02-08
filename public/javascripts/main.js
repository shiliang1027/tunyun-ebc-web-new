/**
 * Created by shiliang on 2016/7/29.
 */
require
    .config({
        baseUrl: "./javascripts",
//        urlArgs: "v=1.0",
        waitSeconds: 0,
        packages: [],
        paths: {
            'jquery': '../bower_components/jquery/dist/jquery.min',
            'angular': '../bower_components/angular/angular.min',
            'angularAMD': '../bower_components/angularAMD/angularAMD.min',
            'ngload': '../bower_components/angularAMD/ngload',
            'angular-locale_zh-cn': '../bower_components/angular-i18n/angular-locale_zh-cn',
            'angular-route': '../bower_components/angular-route/angular-route.min',
            'angular-resource': '../bower_components/angular-resource/angular-resource.min',
            'ui-bootstrap': '../bower_components/angular-bootstrap/ui-bootstrap.min',
            'ui-bootstrap-tpls': '../bower_components/angular-bootstrap/ui-bootstrap-tpls.min',
            'angular-animate': '../bower_components/angular-animate/angular-animate.min',
            'angular-touch': '../bower_components/angular-touch/angular-touch.min',
            'angular-sanitize': '../bower_components/angular-sanitize/angular-sanitize.min',
            'angular-jqcloud': '../bower_components/angular-jqcloud/angular-jqcloud',
            'angular-translate': '../bower_components/angular-translate/angular-translate.min',
            'angular-ui-router': '../bower_components/angular-ui-router/release/angular-ui-router.min',
            'jqcloud': '../bower_components/jqcloud2/dist/jqcloud.min',
            'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min',
            'highcharts-ng': '../bower_components/highcharts-ng/dist/highcharts-ng.min',
            'highcharts': '../bower_components/highcharts/highcharts',
            'highcharts-more': '../bower_components/highcharts/highcharts-more',
            'metisMenu': '../bower_components/metisMenu/dist/metisMenu.min',
            'highcharts-config': 'highchartsconfig'
        },
        shim: {
            "angular": {
                exports: "angular"
            },
            "jqcloud": {
                deps: ['jquery', 'css!../bower_components/jQCloud/jqcloud/jqcloud.css'],
                exports: "jqcloud"
            },
            'bootstrap': {
                deps: ['jquery', 'css!../bower_components/bootstrap/dist/css/bootstrap.min.css', 'css!../bower_components/components-font-awesome/css/font-awesome.min.css', 'css!../stylesheets/style.css']
            },
            "highcharts": {
                deps: ['jquery'],
                exports: "Highcharts"
            },
            "highcharts-more": {
                deps: [ 'highcharts']
            },
            "highcharts-config": {
                deps: ['highcharts-more']
            },
            "angularAMD": {
                deps: ['angular', 'angular-ui-router']
            },
            "ngload": ["angularAMD"],
            "angular-locale_zh-cn": {
                deps: ['angular']
            },
            "angular-ui-router": {
                deps: ['angular', 'bootstrap']
            },
            "angular-route": {
                deps: ['angular']
            },
            "angular-resource": {
                deps: ['angular']
            },
            "angular-touch": {
                deps: ['angular']
            },
            "angular-sanitize": {
                deps: ['angular']
            },
            "ui-bootstrap-tpls": {
                deps: ['angular-resource', 'angular-locale_zh-cn']
            },
            "angular-animate": {
                deps: ['angular']
            },
            "angular-jqcloud": {
                deps: ['angular', 'jqcloud']
            },
            "metisMenu": {
                deps: ['jquery']
            },
            "app": {
                deps: ['domReady', 'angular-jqcloud' , 'angular-resource','angular-animate',
                    'angularAMD',
                    'ui-bootstrap-tpls', 'highcharts-config']
            }
        },
        map: {
            '*': {
                'css': '../bower_components/require-css/css.min',
                'text': '../bower_components/text/text',
                'domReady': '../bower_components/domReady/domReady'
            }
        }
    });
require(['app'], function () {
});
