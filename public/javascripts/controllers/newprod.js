/**
 * Created by shiliang on 2016/7/26.
 */
define([], function () {
    return ['$scope', '$http','$filter', 'API', function ($scope, $http,$filter, API) {
//        $scope.categs=[];
        $scope.maxSize = 3;
        $scope.programmes = {total: 0, pageNo: 1, pageSize: 10, list: []};
        $scope.programmeAttrs = {total: 0, pageNo: 1, pageSize: 10, list: [], prog_id: 0};
        $scope.newprod = {selectedtime: {}};
        $scope.chartInit = function () {
            $('#newprodchart').highcharts({
                chart: {
                    type: 'column'
                },
                title: {
                    text: '2015-07 手机各屏幕尺寸销量排行'
                },

                legend: {
                    enabled: false
                },

                xAxis: {
                    categories: ['5.5英寸', '4.5英寸', '5.0英寸', '5.1英寸', '4.3英寸', '6.3英寸', '4.7英寸'],
                    title: {
                        text: null
                    },
                    labels: {
                        rotation: -30
                    }
                },

                yAxis: {
                    title: {
                        text: '成交量(台)'
                    },
                    endOnTick: false,
                    maxPadding: 0.01
                },

                tooltip: {
                    headerFormat: '{point.x}<br/>',
                    pointFormat: '成交量: <b>{point.y}</b><br/> ',
                    valueSuffix: ' 台',
                    shared: true
                },

                series: [
                    {
                        color: '#0099e6',
                        data: [56320, 43230, {'color': '#097ab3', 'y': 40000}, {'color': '#bf531d', 'y': 35789}, 28620, 19900, 10902]
                    }
                ]
            });
        }

        $scope.refresh = function () {
            if (!$scope.currentIndu) {
                return;
            }
            API.cates.query({indu_id: $scope.currentIndu.id}, function (cates) {
                $scope.categs = cates;
                $scope.currentCat = cates[0];
                API.newprod.query({cid: $scope.currentCat.id, type: 'trconfigtypes', keyword: '', pageSize: $scope.programmes.pageSize, pageNo: $scope.programmes.pageNo, 'startTime': parseInt($scope.startTime.getTime() / 1000)}, function (tabs) {
                    $scope.tabs = tabs;
                    $scope.times=[];
                    API.newprod.query({cid: $scope.currentCat.id, type: 'timelist', keyword: '', pageSize: $scope.programmes.pageSize, pageNo: $scope.programmes.pageNo, 'startTime': parseInt($scope.startTime.getTime() / 1000)}, function (times) {
                        angular.forEach(times,function(n,i){
                            $scope.times.push({id: n.stat_time,name:$filter('date')(n.stat_time*1000,'yyyy/MM/dd')});
                        });
                        $scope.newprod.selectedtime = $scope.times[0];
                        $scope.tabSelect(0);
                    })
                })
            })
            API.home.get({"indu_id": $scope.currentIndu.id}, function (data) {
                $scope.data = data;
            });
        };

        $scope.programmesSearch = function () {
            if (!$scope.currentIndu || !$scope.newprod.selectedtime) {
                return;
            }
            API.newprod.get({cid: $scope.currentCat.id, type: $scope.selectedTab.type_id == -1 ? 'programmes' : 'programmetypes', keyword: '', type_id: $scope.selectedTab.type_id, pageSize: $scope.programmes.pageSize, pageNo: $scope.programmes.pageNo, 'startTime': $scope.newprod.selectedtime.id}, function (data) {
                $scope.programmes.list = data.value.list;
                $scope.programmes.total = data.value.total;
            });
        }

        $scope.programmeAttrsSearch = function () {
            API.newprod.get({cid: $scope.currentCat.id, type: 'programmeAttrs', keyword: '', prog_id: $scope.programmeAttrs.prog_id, pageSize: $scope.programmeAttrs.pageSize, pageNo: $scope.programmeAttrs.pageNo, 'startTime': $scope.newprod.selectedtime.id}, function (data) {
                $scope.programmeAttrs.list = data.value.list;
                $scope.programmeAttrs.total = data.value.total;
            });
        }

        $scope.tabSelect = function (index) {
            if (index == 0) {
                $scope.selectedTab = { type_id: -1};
            } else {
                $scope.selectedTab = $scope.tabs[index - 1];
            }
            $scope.programmes.pageNo = 1;
            $scope.programmesSearch()
        }
        $scope.$on('induChange', function (e, d) {
            $scope.refresh();
        });
        $scope.setting = function () {
            $scope.programmes.pageNo = 1;
            $scope.programmesSearch();
        }
        $scope.timeChange = function (item) {
            $scope.newprod.selectedtime = item;
            $scope.programmes.pageNo = 1;
            $scope.programmesSearch()
        }
        $scope.categChange = function (item) {
            $scope.currentCat = item;
            $scope.programmes.pageNo = 1;
            $scope.programmesSearch()
        }

        var $ctrl = this;
        $ctrl.open = function (size) {
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
