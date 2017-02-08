/**
 * Created by shiliang on 2016/12/14.
 */
define([], function () {
    // controller
    return ['$scope', '$http', '$filter', '$sce', '$uibModal', '$timeout', '$log',function ($scope, $http, $filter, $sce, $uibModal, $timeout, $log) {
        $scope.shells = [
            {name: '数据标准化通用', id: 'submit.sh',class:'com.tunyun.product.ebc.standard.ResStandard', params: [
                {type: 'text', placeholder: '处理文件名',name:'filename'},
                {type: 'text', placeholder: '任务id',name:'taskid'}
            ]},
            {name: '数据标准化批处理', id: 'exec.sh',class:'com.tunyun.product.ebc.standard.ExecFileByTime', params: [
                {type: 'select','select':'list', list: ['list','detail','comment'],name:'type'}
            ]},
            {name: '详情数据测试验证', id: 'detailTest.sh',class:'com.tunyun.product.ebc.standard.DetailStandardTest', params: [
                {type: 'text', placeholder: '品类id'},
                {type: 'text', placeholder: '属性名称'},
                {type: 'text', placeholder: '渠道id'}
            ]},
            {name: '属性数据统计', id: 'modelTest.sh',class:'com.tunyun.product.ebc.standard.ModelStandardTest', params: [
                {type: 'text', placeholder: '品类id'},
                {type: 'text', placeholder: '渠道id'}
            ]},
            {name: '属性值数据统计', id: 'valueTest.sh',class:'com.tunyun.product.ebc.standard.ValueStandardTest', params: [
                {type: 'text', placeholder: '品类id',name},
                {type: 'text', placeholder: '渠道id'},
                {type: 'text', placeholder: '属性名称'}
            ]},
            {name: '新品研发，特征词提取', id: 'NewProduct.sh',class:'com.tunyun.product.ebc.standard.NewProductStandrad', params: [
            ]},
            {name: '新品研发，语义分析', id: 'SenmanticsAnalyse.sh',class:'com.tunyun.product.ebc.standard.SenmanticsAnalyse', params: [
            ]},
            {name: '新品研发，属性值贡献度与属性重要度统计', id: 'ProdStat.sh',class:'com.tunyun.product.ebc.standard.NewProdStatStandrad', params: [
            ]},
            {name: '新品研发测试程序', id: 'NewProdAllTest.sh',class:'com.tunyun.product.ebc.standard.NewProdAllTest', params: [
                {type: 'text', placeholder: '品类id'},
                {type: 'select',select:'contribution', list:[ 'contribution','importance','progra']}
            ]}
        ];
        $scope.currentShell = $scope.shells[0];
        $scope.changeShell = function (x) {
            $scope.currentShell = x;
        }

        $scope.do=function(){
            console.info( $scope.currentShell)
            $scope.currentShell.time=parseInt($scope.startTime.getTime() / 1000);
            $http({
                method: 'post',
                url: '/bgmanager/shell',
                data: $scope.currentShell,
                timeout: 50000
            }).success(function (data, status, headers, config) {
            }).error(function (data, status, headers, config) {
            });
        }


        $scope.open = function (size) {
            var modalInstance = $uibModal.open({
                animation: false,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                controllerAs: '$ctrl',
                size: size,
                resolve: {
                }
            });
            modalInstance.result.then(function () {
                $scope.delAttr();
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.today = function () {
            var yestoday = new Date();
            yestoday.setHours(0);
            yestoday.setMinutes(0);
            yestoday.setSeconds(0);
            yestoday.setDate(yestoday.getDate() - 1);
            $scope.startTime = yestoday;
            $scope.endTime = new Date();
        };
        $scope.today();

        $scope.clear = function () {
        };

        $scope.inlineOptions = {
            customClass: getDayClass,
            minDate: new Date(),
            showWeeks: true
        };

        $scope.dateOptions = {
//            dateDisabled: disabled,
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1,
            showWeeks: false
        };

        // Disable weekend selection
        function disabled(data) {
            var date = data.date,
                mode = data.mode;
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        }

        $scope.toggleMin = function () {
            $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
            $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
        };

        $scope.toggleMin();

        $scope.open1 = function () {
            $scope.popup1.opened = true;
        };
        $scope.setDate = function (year, month, day) {
            $scope.dt = new Date(year, month, day);
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[3];
        $scope.altInputFormats = ['M!/d!/yyyy'];

        $scope.popup1 = {
            opened: false
        };
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 1);
        $scope.events = [
            {
                date: tomorrow,
                status: 'full'
            },
            {
                date: afterTomorrow,
                status: 'partially'
            }
        ];

        function getDayClass(data) {
            var date = data.date,
                mode = data.mode;
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

                for (var i = 0; i < $scope.events.length; i++) {
                    var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }

            return '';
        }
    }];
});