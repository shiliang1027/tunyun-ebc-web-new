/**
 * Created by shiliang on 2016/9/10.
 */
define([], function () {
    // controller
    return ['$scope', '$http','$stateParams',function ($scope, $http,$stateParams) {
        var categid=$stateParams.categid;
        var prodid=$stateParams.prodid;
        $scope.categs=[];
        $scope.currentCat=null;
        $http.get('/bgmanager/categs/search').success(function (data) {
            $.each(data, function (i, n) {
                $scope.createCateg(n,0);
            });
            if ($scope.currentCat == null) {
                $scope.currentCat = $scope.categs[0];
            }
            if(prodid&& prodid!=""){
                $scope.prodid=prodid;
                $scope.search();
            }
        });
        $scope.createCateg=function(data,index){
            if(categid == data.uid){
                $scope.currentCat=data;
            }
            $scope.categs.push({'uid':data.uid,'cat_name':data.cat_name,'cat_alias': data.cat_alias,'style':{'padding-left':index*15+20+"px"}});
            if(data.children.length>0){
                $.each(data.children,function(i,n){
                    $scope.createCateg(n,index+1);
                });
            }
        }

        $scope.categChange=function(x){
            $scope.currentCat=x;
        }
        $scope.alerts = [];
        $scope.search=function(){
            $scope.alerts=[{msg: '正在查询，请稍后...',type:"success"}];
            $http({
                method: 'get',
                url: '/bgmanager/product/search?uid='+$scope.currentCat.uid+"&prodid="+$scope.prodid,
                timeout: 5000
            }).success(function (data, status, headers, config) {
                $scope.product = data;
                if ($.isEmptyObject(data)) {
                    $scope.alerts=[{msg: '查询为空!'}];
                }else{
                    $scope.alerts=[];
                }
            }).error(function (data, status, headers, config) {
                $scope.product = {};
                $scope.alerts=[{msg: '查询为空!'}];
            });
        }

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };
    }];
});