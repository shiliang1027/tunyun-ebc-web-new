/**
 * Created by shiliang on 2016/9/10.
 */
define([], function () {
    // controller
    return ['$scope', '$http','$uibModal', '$timeout', '$log',function ($scope, $http, $uibModal, $timeout, $log) {
        $scope.alerts = [];
        $scope.categs = [];
        $scope.chans = [];
        $scope.currentCat = null;
        $scope.currentChan = null;
        $http.get('/bgmanager/categs/search').success(function (data) {
            $.each(data, function (i, n) {
                $scope.createCateg(n,0);
            });
            if ($scope.currentCat == null) {
                $scope.currentCat = $scope.categs[0];
            }
        });
        $scope.createCateg=function(data,index){
            $scope.categs.push({'uid':data.uid,'cat_name':data.cat_name,'cat_alias': data.cat_alias,'style':{'padding-left':index*15+20+"px"}});
            if(data.children.length>0){
                $.each(data.children,function(i,n){
                    $scope.createCateg(n,index+1);
                });
            }
        }
        $http.get('/bgmanager/chans/search').success(function (data) {
            $scope.chans = data;
            if ($scope.currentChan == null) {
                $scope.currentChan = $scope.chans[0];
            }
        });
        $scope.categChange = function (x) {
            $scope.currentCat = x;
        }
        $scope.changeChan = function (x) {
            $scope.currentChan = x;
        }
        $scope.pageNo = 1;
        $scope.pageSize = 20;
        $scope.time = new Date();
        $scope.p_value="";
        $scope.search = function () {
            $scope.alerts = [
                {msg: '正在查询，请稍后...', type: "success"}
            ];
            $http({
                method: 'get',
                url: '/bgmanager/attrrule/testQuery?time=' + parseInt($scope.time.getTime() / 1000) + "&pageNo=" + $scope.pageNo + "&pageSize=" + $scope.pageSize + '&cid=' + $scope.currentCat.uid + "&chan_id=" + $scope.currentChan.chanid + "&p_value=" + encodeURI($scope.p_value),
                timeout: 50000
            }).success(function (data, status, headers, config) {
                switch (data.code) {
                    case "0":
                        $scope.showAlert([
                            {msg: '查询失败!'}
                        ]);
                        break;
                    case "1":
                        $scope.showAlert([
                            {msg: data.detail, type: "success"}
                        ]);
                        $scope.datas = data.value.list;
                        $scope.total = data.value.total;
                        break;
                }
            }).error(function (data, status, headers, config) {
                $scope.showAlert([
                    {msg: '查询失败!'}
                ]);
            });
        }
        $scope.maxSize = 5 ;
        $scope.pageChanged = function() {
            $scope.search();
        };


        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.showAlert = function (alerts) {
            $scope.alerts = alerts;
            if($scope.timer){
                $timeout.cancel($scope.timer);
            }
            $scope.timer=$timeout(function () {
                $scope.alerts = [];
            }, 5000);
        }

        $scope.open = function (x, size) {
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
                $scope.clear(x);
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
            $scope.time = yestoday;
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

