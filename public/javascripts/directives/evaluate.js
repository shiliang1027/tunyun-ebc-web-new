/**
 * Created by shiliang on 2016/12/7.
 */
define(['app'], function (app) {
    'use strict';
    app.directive('evaluate',['$state', function ($state) {
        return {
            restrict: 'EA',
            scope: {items: '=',type:'='},
            templateUrl: 'javascripts/directives/evaluate.html',
            transclude: false,
            replace: true,
            controller: function ($scope, $element, $attrs) {
            },
            link: function ($scope, elem, attrs) {
            }
        };
    }]);
});