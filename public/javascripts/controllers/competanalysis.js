/**
 * Created by shiliang on 2016/7/26.
 */
define([], function () {
    return ['$scope', 'API', function ($scope, API) {
        $scope.tabs = [
            { index: 0, title: '竞争品牌分析', templete: 'tpl/competanalysis/tab1.html'},
            { index: 1, title: '竞争店铺分析', templete: 'tpl/competanalysis/tab2.html'},
            {  index: 2, title: '竞争单品分析', templete: 'tpl/competanalysis/tab3.html'}
        ];

        $scope.currentTab = $scope.tabs[0];

        $scope.$on('induChange', function (e, d) {
            $scope.init();
        });

        $scope.init=function(){
            if (!$scope.currentIndu) {
                return;
            }
//            API.cates.query({indu_id: $scope.currentIndu.id}, function (cates) {
//                $scope.categs = cates;
//                $scope.currentCat = cates[0];
//                API.chans.query({indu_id: $scope.currentIndu.id}, function (chans) {
//                    $scope.chans = chans;
//                    $scope.currentChan = chans[0];
//                    $scope.refresh();
//                })
//            })
        }

        $scope.chanChange = function (item) {
            $scope.currentChan = item;
            $scope.refresh();
        }

        $scope.categChange = function (item) {
            $scope.currentCat = item;
            $scope.refresh();
        }
        $scope.tabSelect = function (tab) {
            if(!$scope.currentTab || $scope.currentTab!=tab){
                $scope.currentTab = tab;
            }
//            API.induanalysis.get({"indu_id": $scope.currentIndu.id,"tab":$scope.currentTab.index,"cat_id":$scope.currentCat.id,"chan_id":$scope.currentChan.chanid}, function (data) {
//                $scope.currentTab.data=data;
//            });
        }

        $scope.refresh = function () {
            $scope.tabSelect($scope.currentTab);
        };
    }];
});
