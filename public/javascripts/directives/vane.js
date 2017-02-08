/**
 * Created by shiliang on 2016/12/7.
 */
define(['app'], function (app) {
    'use strict';
    app.directive('vane',['$state', function ($state) {
        return {
            restrict: 'EA',
            scope: {item: '='},
            templateUrl: 'javascripts/directives/vane.html',
            transclude: false,
            replace: true,
            controller: function ($scope, $element, $attrs) {
            },
            link: function ($scope, elem, attrs) {
            }
        };
    }]);
});