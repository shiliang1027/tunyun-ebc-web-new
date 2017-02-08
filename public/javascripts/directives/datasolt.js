/**
 * Created by shiliang on 2016/12/7.
 */
define(['app'], function (app) {
    'use strict';
    app.directive('datasolt', ['$filter', function ($filter) {
        return {
            restrict: 'EA',
            scope: {items: '=', order: '=', type: '=', colors: '='},
            templateUrl: 'javascripts/directives/datasolt.html',
            transclude: false,
            replace: false,
            controller: function ($scope, $element, $attrs) {
            },
            link: function ($scope, elem, attrs) {
                $scope.$watch('items',function(){
                    if($scope.items && $scope.items.length>0){
                        $scope.maxValue=$filter('orderBy')($scope.items,$scope.order,$scope.type)[0].sales_volume;
                    }
                });
            }
        };
    }]);
});