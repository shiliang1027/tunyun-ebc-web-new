/**
 * Created by shiliang on 2016/9/10.
 */
define([], function () {
    // controller
    return ['$scope', '$http','$stateParams',function ($scope, $http,$stateParams) {
        var chanid=$stateParams.chanid;
        var gid=$stateParams.gid;
        $scope.alerts = [];
        $scope.currentCat = null;
        $http.get('/bgmanager/chans/search').success(function (data) {
            console.info(data)
            $scope.chans = data;
            if (chanid && chanid != "") {
                $.each($scope.chans, function (i, n) {
                    if (chanid == n.chanid) {
                        $scope.currentChan = n;
                    }
                });
            } else {
                $scope.currentChan = $scope.chans[0];
            }
            if (gid && gid != "") {
                $scope.gid = gid;
                $scope.search();
            }
        });
        $scope.changeChan = function (x) {
            $scope.currentChan = x;
        }
        $scope.search = function () {
            if(!$scope.currentChan){
                return;
            }
            $scope.alerts=[{msg: '正在查询，请稍后...',type:"success"}];
            $http({
                method: 'get',
                url: '/bgmanager/goods-detail/search?chanid=' + $scope.currentChan.chanid + "&gid=" + $scope.gid,
                timeout: 5000
            }).success(function (data, status, headers, config) {
                $scope.goods = data;
                if ($.isEmptyObject(data)) {
                    $scope.alerts=[{msg: '查询为空!'}];
                }else{
                    $scope.alerts=[];
                }
            }).error(function (data, status, headers, config) {
                $scope.goods = {};
                $scope.alerts=[{msg: '查询为空!'}];
            });
        }
        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };
    }];
});