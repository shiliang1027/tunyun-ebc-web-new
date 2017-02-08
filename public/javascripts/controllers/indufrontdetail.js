/**
 * Created by shiliang on 2016/7/26.
 */

define([], function () {
    return ['$scope','$timeout','$stateParams','$sce', 'API', function ($scope,$timeout,$stateParams,$sce, API) {
        console.info($stateParams.id)

        $scope.$on('induChange', function (e, d) {
            console.info('induChange')
            $scope.init();
        });

        $scope.init=function(){
            if (!$scope.currentIndu) {
                return;
            }
            $scope.refresh();
        }

        $scope.refresh = function () {
            console.info($scope.currentIndu)
            if(!$stateParams.id){
                return;
            }
            API.indufrontdetail.get({"indu_id": $scope.currentIndu.id,"info_id":$stateParams.id}, function (data) {
                if(data && data.DynmaicDetail && data.DynmaicDetail.orig_cont){
                    data.DynmaicDetail.orig_cont=$sce.trustAsHtml(data.DynmaicDetail.orig_cont);
                }
                $scope.data=data;
            });
        };
    }];
});
