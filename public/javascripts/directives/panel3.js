/**
 * Created by shiliang on 2016/12/7.
 */
define(['app'], function (app) {
    'use strict';
    app.directive('panel3', ['$state', function ($state) {
        return {
            restrict: 'EAC',
            scope: {},
            templateUrl:'javascripts/directives/panel3.html',
            transclude: true,
            replace: true,
            link: function(scope, elem, attrs, controllerInstance) {
                scope.title = attrs.title;
                scope.subtitle = attrs.subtitle;
            }
        };
    }]);
});
