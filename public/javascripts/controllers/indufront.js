/**
 * Created by shiliang on 2016/7/26.
 */

define([], function () {
    return ['$scope','$timeout','$stateParams', 'API', function ($scope,$timeout,$stateParams, API) {
        $scope.tabs = [
            { index:0,title: '产业潮流动态', templete: 'tpl/indufront/tab1.html'},
            { index:1,title: '网媒舆情分析', templete: 'tpl/indufront/tab2.html'}
//            { title: '电商舆情分析', templete: 'tpl/indufront/tab3.html'}
        ];
        $scope.currentTab = $scope.tabs[0];

        $scope.$on('induChange', function (e, d) {
            $scope.init();
        });

        $scope.init=function(){
            if (!$scope.currentIndu) {
                return;
            }
            $scope.refresh();
        }

        $scope.refresh = function () {
            $scope.tabSelect($scope.currentTab);
        };

        $scope.tabSelect = function (tab) {
            if(!$scope.currentTab || $scope.currentTab!=tab){
                $scope.currentTab = tab;
            }
            API.indufront.get({"type":'0',"indu_id": $scope.currentIndu.id,"tab":$scope.currentTab.index,"keyword":$scope.keyword}, function (data) {
                $scope.currentTab.data=data;
            });
            if($scope.currentTab.index==0){
                API.indufront.get({"type":'1',"indu_id": $scope.currentIndu.id,"tab":$scope.currentTab.index}, function (data) {
                    console.info(data)
                    $scope.currentTab.lablecloud=data.PopLable;
                });
            }

//            InduStryReq.trendDynamicAsync(JSON.stringify({indu_id: indu_id}), function (data) {
//                res.send(data);
//            });
        }

        $scope.search = function (item) {
            $scope.keyword=item;
            $scope.refresh();
        }
    }];
});
