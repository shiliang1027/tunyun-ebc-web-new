/**
 * Created by shiliang on 2016/12/7.
 */
define(['app'], function (app) {
    'use strict';
    app.directive('panel1', ['$state', function ($state) {
        return {
            restrict: 'EAC',
            scope: {},
            templateUrl:'javascripts/directives/panel1.html',
            transclude: true,
            replace: true,
            link: function(scope, elem, attrs, controllerInstance) {
                scope.title = attrs.title;
            }
        };
    }]);
});
