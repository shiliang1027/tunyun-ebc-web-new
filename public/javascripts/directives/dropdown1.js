/**
 * Created by shiliang on 2016/12/7.
 */
define(['app'], function (app) {
    'use strict';
    app.directive('dropdown1', ['$state', function ($state){
        return {
            restrict: 'E',
            scope: {items: '=', title: '@', btntitle: '@',action:'&',seletedItem:'=',icon:'@',key:'@',value:'@'},
            templateUrl: 'javascripts/directives/dropdown1.html',
            transclude: false,
            replace: true,
            controller: function ($scope, $element, $attrs) {
                $scope.show=function(){
                    $($element).find(".input_list_box").is(":hidden")?$($element).find(".input_list_box").show():$($element).find(".input_list_box").hide();
                }
                $scope.itemClick=function(item){
                    $scope.seletedItem=item;
                    $($element).find(".input_list_box").hide();
                    $scope.action({item:item});
                }
                $scope.init=function(){
                    if($scope.icon){
                        $($element).find(".select_input").width($($element).width()-40-6);
                    }else{
                        $($element).find(".select_input").width($($element).width()-60-6);
                    }
                    if(!$scope.key||$scope.key==''){
                        $scope.key="id";
                    }
                    if(!$scope.value||$scope.value==''){
                        $scope.value="name";
                    }
                }
            },
            link: function (scope, elem, attrs) {

            }
        };
    }]);
});
