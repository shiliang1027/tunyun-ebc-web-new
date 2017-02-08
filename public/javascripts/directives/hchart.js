/**
 * Created by shiliang on 2016/12/7.
 */
define(['app'], function (app) {
    'use strict';
    app.directive('highchart',['$state', function ($state) {
        return {
            restrict: 'EA',
            scope: {config: '='},
            transclude: false,
            replace: true,
            controller: function ($scope, $element, $attrs) {
            },
            link: function ($scope, elem, attrs) {
                $scope.$watch('config',function(){
                    $(elem).highcharts($scope.config);
                });
            }
        };
    }]);
});