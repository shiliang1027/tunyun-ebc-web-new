/**
 * Created by shiliang on 2016/9/10.
 */
define([], function () {
    // controller
    return ['$scope', '$http', '$filter', '$sce', '$uibModal', '$timeout', '$log',function ($scope, $http, $filter, $sce, $uibModal, $timeout, $log) {
        $scope.categs = [];
        $scope.currentCat = null;
        $scope.currentAttr = null;
        $scope.attrvalues = {};
        $scope.approvedSelectedArray = [];//已审核选中数组
        $scope.notApprovedSelectedArray = [];//未审核选中数组
        $scope.todoApprovedAttr = [];//待审核数组
        $scope.modaltitle = "";//模态弹出框标题
        $scope.currentModal = {};//模态弹出框内容
        $scope.maxSize = 3;
        $scope.approvedPageNo = 1;
        $scope.notApprovedPageNo = 1;
        $scope.notApprovedKeyWord='';
        $scope.approvedKeyWord='';
        $scope.approvedPageSize=20
        $scope.notApprovedPageSize=20
        $scope.check_result=1;


        $http.get('/bgmanager/categs/search').success(function (data) {
            $.each(data, function (i, n) {
                $scope.createCateg(n, 0);
            });
            if ($scope.currentCat == null) {
                $scope.currentCat = $scope.categs[0];
            }
            $scope.attrSearch();
        });
        $scope.createCateg = function (data, index) {
            $scope.categs.push({'uid': data.uid, 'cat_name': data.cat_name, 'cat_alias': data.cat_alias, 'style': {'padding-left': index * 15 + 20 + "px"}});
            if (data.children.length > 0) {
                $.each(data.children, function (i, n) {
                    $scope.createCateg(n, index + 1);
                });
            }
        }

        //分类切换
        $scope.categChange = function (x) {
            $scope.currentCat = x;
            $scope.currentAttr = null;
            $scope.attrSearch();
        };
        $scope.attrChange = function (x) {
            $scope.currentAttr = x;
            $.each($scope.notApprovedSelectedArray, function (i, n) {
                n.attr=x;
            });
        };

        //属性查询
        $scope.attrSearch = function () {
            $http.get('/bgmanager/attrvalueconfirm/searchattr?cid=' + $scope.currentCat.uid + '&cname=' + $scope.currentCat.cat_name).success(function (data) {
                $scope.attrs = data;
//                if ($scope.currentAttr == null) {
//                    $scope.currentAttr = $scope.attrs[0];
//                }
            });
        }
        //属性值查询
        $scope.search = function () {
//            if (!$scope.currentAttr) {
//                $scope.showAlert([
//                    {msg: '属性为空!'}
//                ]);
//                return;
//            }
            $scope.approvedPageNo = 1;
            $scope.notApprovedPageNo = 1;
            $scope.approvedKeyWord='';
            $scope.notApprovedKeyWord='';
            $scope.clearSelected();
            $scope.approvedSearch(function(){
                $scope.notApprovedSearch();
            });
        }


        $scope.approvedSearch = function (callback) {
            $scope.showAlert([
                {msg: '正在查询，请稍后...', type: "success"}
            ],true);

            $http({
                method: 'get',
                url: '/bgmanager/word/search?is_check=1&check_result='+$scope.check_result+'&cid='
                    + $scope.currentCat.uid + "&cname=" + encodeURI($scope.currentCat.cat_name)
                    + '&startTime=' + parseInt($scope.startTime.getTime() / 1000)
                    + '&endTime=' + parseInt($scope.endTime.getTime() / 1000)
                    +'&keyword='+encodeURI($scope.approvedKeyWord)
                    + '&pageNo=' + $scope.approvedPageNo + '&pageSize=' + $scope.approvedPageSize,
                timeout: 50000
            }).success(function (data, status, headers, config) {
                switch (data.code) {
                    case "0":
                        $scope.showAlert([
                            {msg: data.detail}
                        ]);
                        break;
                    case "1":
//                        $scope.showAlert([
//                            {msg: data.detail,type:'success'}
//                        ]);
                        $scope.attrvalues.approvedAttr = data.value.list;
                        $scope.approvedPages = data.value.pages;
                        $scope.approvedTotal = data.value.total;
                        if($.isFunction(callback)){
                            callback.call();
                        }
                        break;
                }
            }).error(function (data, status, headers, config) {
                $scope.showAlert([
                    {msg: '查询失败!'}
                ]);
            });
        }
        $scope.notApprovedSearch = function () {
            $scope.showAlert([
                {msg: '正在查询，请稍后...', type: "success"}
            ],true);

            $http({
                method: 'get',
                url: '/bgmanager/word/search?is_check=0&cid='
                    + $scope.currentCat.uid + "&cname=" + encodeURI($scope.currentCat.cat_name)
                    + '&startTime=' + parseInt($scope.startTime.getTime() / 1000)
                    + '&endTime=' + parseInt($scope.endTime.getTime() / 1000)
                    +'&keyword='+encodeURI($scope.notApprovedKeyWord)
                    + '&pageNo=' + $scope.notApprovedPageNo + '&pageSize=' + $scope.notApprovedPageSize,
                timeout: 50000
            }).success(function (data, status, headers, config) {
                switch (data.code) {
                    case "0":
                        $scope.showAlert([
                            {msg: data.detail}
                        ]);
                        break;
                    case "1":
                        $scope.showAlert([
                            {msg: data.detail,type:'success'}
                        ]);
                        $scope.attrvalues.notApprovedAttr = data.value.list;
                        $scope.notApprovedPages = data.value.pages;
                        $scope.notApprovedTotal = data.value.total;
                        break;
                }
            }).error(function (data, status, headers, config) {
                $scope.showAlert([
                    {msg: '查询失败!'}
                ]);
            });
        }

        //审核
        $scope.confirm = function (check_result) {
            var isChecked=true;
            var params = [];
            $.each($scope.notApprovedSelectedArray, function (i, n) {
                if(check_result==1){
                    if(!n.attr){
                        isChecked=false;
                    }else{
                        params.push(n.n_id + "&&" + n.attr.pid + "&&" + check_result);
                    }
                }else{
                    params.push(n.n_id + "&&-1&&" + check_result);
                }
            });

            $.each($scope.approvedSelectedArray, function (i, n) {
                if(check_result==1){
                    if(!n.attr || parseInt(n.attr.pid)<0){
                        isChecked=false;
                    }else{
                        params.push(n.n_id + "&&" + n.attr.pid + "&&" + check_result);
                    }
                }else{
                    params.push(n.n_id + "&&-1&&" + check_result);
                }
            });

            if(!isChecked){
                $scope.showAlert([
                    {msg: "请选择属性"}
                ]);
                return;
            }
            console.info(params)
            $scope.showAlert([
                {msg: '正在提交，请稍后...', type: "success"}
            ],true);

            $scope.isSubmit = true;
            $http({
                method: 'post',
                url: '/bgmanager/word/save',
                data: {"params": params.join("##"),"cid": $scope.currentCat.uid, "startTime": parseInt($scope.startTime.getTime() / 1000), "endTime": parseInt($scope.endTime.getTime() / 1000)},
                timeout: 50000
            }).success(function (data, status, headers, config) {
                $scope.isSubmit = false;
                switch (data.code) {
                    case "0":
                        $scope.showAlert([
                            {msg: data.detail}
                        ]);
                        break;
                    case "1":
                        $scope.showAlert([
                            {msg: data.detail, type: 'success'}
                        ]);
                        $scope.search();
                        break;
                }

            }).error(function (data, status, headers, config) {
                $scope.isSubmit = false;
                $scope.showAlert([
                    {msg: '审核失败!' + status}
                ]);
            });
        }

        //修改
        $scope.update = function (check_result) {
            var params = [];
            $.each($scope.approvedSelectedArray, function (i, n) {
                params.push(n.n_id + "&&" + n.attr.pid + "&&" + check_result);
            });
            console.info(params)
            $scope.showAlert([
                {msg: '正在提交，请稍后...', type: "success"}
            ],true);

            $scope.isSubmit = true;
            $http({
                method: 'post',
                url: '/bgmanager/word/update',
                data: {"params": params.join("##"),"cid": $scope.currentCat.uid, "startTime": parseInt($scope.startTime.getTime() / 1000), "endTime": parseInt($scope.endTime.getTime() / 1000)},
                timeout: 50000
            }).success(function (data, status, headers, config) {
                $scope.isSubmit = false;
                switch (data.code) {
                    case "0":
                        $scope.showAlert([
                            {msg: data.detail}
                        ]);
                        break;
                    case "1":
                        $scope.showAlert([
                            {msg: data.detail, type: 'success'}
                        ]);
                        break;
                }
            }).error(function (data, status, headers, config) {
                $scope.isSubmit = false;
                $scope.showAlert([
                    {msg: '修改失败!' + status}
                ]);
            });
        }

        $scope.del=function(){
            var params = [];
            $.each($scope.approvedSelectedArray, function (i, n) {
                params.push(n.n_id);
            });

            if (params == "") {
                return;
            }
            $scope.showAlert([
                {msg: '正在删除，请稍后...', type: "success"}
            ],true);
            $scope.isSubmit = true;
            $http({
                method: 'post',
                url: '/bgmanager/word/del',
                data: {"params": params.join("##"),"cid": $scope.currentCat.uid, "startTime": parseInt($scope.startTime.getTime() / 1000), "endTime": parseInt($scope.endTime.getTime() / 1000)},
                timeout: 50000
            }).success(function (data, status, headers, config) {
                $scope.isSubmit = false;
                switch (data.code) {
                    case "0":
                        $scope.showAlert([
                            {msg: data.detail}
                        ]);
                        break;
                    case "1":
                        $scope.showAlert([
                            {msg: data.detail, type: 'success'}
                        ]);
                        $scope.search();
                        break;
                }

            }).error(function (data, status, headers, config) {
                $scope.isSubmit = false;
                $scope.showAlert([
                    {msg: '删除失败!' + status}
                ]);
            });
        }
        //清除选中
        $scope.clearSelected = function () {
            $scope.currentModal = {};
            $scope.notApprovedSelectedArray = [];
            $scope.todoApprovedSelectedArray = [];
            $scope.approvedSelectedArray = [];
        }

        $scope.approvedSelectAll = function () {
            $.each($scope.attrvalues.approvedAttr, function (i, n) {
                n.selected = !n.selected;
            });
            $scope.approvedFilter();
        }

        $scope.notApprovedSelectAll = function () {
            $.each($scope.attrvalues.notApprovedAttr, function (i, n) {
                n.selected = !n.selected;
            });
            $scope.notApprovedFilter();
        }
        //筛选已审核选中记录
        $scope.approvedFilter = function () {
            $scope.approvedSelectedArray = $filter('filter')($scope.attrvalues.approvedAttr, {selected: true});
        }

        //筛选未审核选中记录
        $scope.notApprovedFilter = function () {
            $scope.notApprovedSelectedArray = $filter('filter')($scope.attrvalues.notApprovedAttr, {selected: true});
        }
        $scope.checkxx = function (x) {
            $scope.notApprovedFilter();
        }
        $scope.alerts = [];
        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.showAlert = function (alerts,flag) {
            $scope.alerts = alerts;
            if ($scope.timer) {
                $timeout.cancel($scope.timer);
            }
            if(!flag){
                $scope.timer = $timeout(function () {
                    $scope.alerts = [];
                }, 3000);
            }
        }

        $scope.showDetail = function (x, xx) {
            x.show = true;
            $scope.currDetail = xx;
        };
        $scope.hideDetail = function (x) {
            x.show = false;
            $scope.currDetail = null;
        };


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