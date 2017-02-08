/**
 * Created by shiliang on 2016/12/7.
 */
define(['app'], function (app) {
    'use strict';
    app.directive('search1',['$state', function ($state) {
        return {
            restrict: 'EA',
            scope: {btntitle: '@',action:'&'},
            templateUrl: 'javascripts/directives/search1.html',
            transclude: false,
            replace: true,
            controller: function ($scope, $element, $attrs) {
                $scope.itemClick=function(){
                    $scope.action({item:$scope.keyword});
                }
            },
            link: function ($scope, elem, attrs) {
            }
        };
    }]);
});