/**
 * Created by shiliang on 2016/10/24.
 */

define([], function () {
    // controller
    return ['$scope','$http','$filter','$sce','$uibModal','$timeout','$log',function ($scope, $http, $filter, $sce, $uibModal, $timeout, $log) {
        document.title="归一化-属性审核";
        $scope.categs = [];
        $scope.currentCat = null;
        $scope.currentAttr = null;
        $scope.approvedSelectedArray = [];//已审核选中数组
        $scope.notApprovedSelectedArray = [];//未审核选中数组
        $scope.todoApprovedSelectedArray = [];//待审核选中数组
        $scope.todoApprovedAttr = [];//待审核数组
        $scope.modaltitle = "";//模态弹出框标题
        $scope.currentModal = {};//模态弹出框内容
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
        //分类切换
        $scope.categChange = function (x) {
            $scope.currentCat = x;
        };
        //属性查询
        $scope.search = function () {
            if (!$scope.currentCat) {
                $scope.showAlert([
                    {msg: '品类为空!'}
                ]);
                return;
            }
            $scope.alerts = [
                {msg: '正在查询，请稍后...', type: "success"}
            ];
            $http({
                method: 'post',
                url: '/bgmanager/attrconfirm/searchattr',
                data: {"cid": $scope.currentCat.uid, "cname": $scope.currentCat.cat_name, "startTime": parseInt($scope.startTime.getTime() / 1000), "endTime": parseInt($scope.endTime.getTime() / 1000)},
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
                            {msg: data.detail,type:'success'}
                        ]);
                        $scope.clearSelected();
                        $scope.attrvalues = data.value;
                        break;
                }
            }).error(function (data, status, headers, config) {
                $scope.attrvalues = {};
                $scope.showAlert([
                    {msg:'查询为空!'}
                ]);
            });
        }

        //弹出框确认
        $('#myModal_ok').on('click',
            function () {
                if ($.isFunction($scope.okcallback)) {
                    $scope.okcallback.call();
                    $scope.okcallback = null;
                }
            });

        //下载
        $scope.download = function () {
            if ($scope.currentCat && $scope.currentAttr) {
                window.open("/bgmanager/attrconfirm/attrDownload?cid=" + $scope.currentCat.uid + "&pid=" + $scope.currentAttr.pid, '_parent');
            }
        }

        //合并
        $scope.mergeAttr = function () {
            $scope.modaltitle = "合并属性";
            if ($scope.approvedSelectedArray.length > 0) {
                $.each($scope.approvedSelectedArray, function (i, n) {
                    $scope.currentModal = $.extend(true, {}, n);
                    $.each($scope.notApprovedSelectedArray, function (ii, nn) {
                        $.merge($scope.currentModal.palias, nn.palias);
                    });
                });
                $.unique($scope.currentModal.palias);
            } else {
                $scope.initConfirm();
            }
            $scope.okcallback = function () {
                var approved = [];
                $.each($scope.approvedSelectedArray, function (i, n) {
                    approved.push(n.cid + "&&" + n.pid + "&&" + n.pname);
                });
                if ($scope.notApprovedSelectedArray.length < 1) {
                    return;
                }
                var params = [];
                $.each($scope.notApprovedSelectedArray, function (i, n) {
//                    console.info(n);
                    params.push(n.cid + "&&" + n.pid + "&&" + n.pname);
                });
                $scope.alerts = [
                    {msg: '正在合并，请稍后...', type: "success"}
                ];
                $scope.isSubmit = true;
                $http({
                    method: 'post',
                    url: '/bgmanager/attrconfirm/mergeattr',
                    data: {"params": params.join("##"), "approved": approved.join("##"), "pname": $scope.currentModal.pname, "cid": $scope.currentCat.uid, "cname": $scope.currentCat.cat_name,"startTime": parseInt($scope.startTime.getTime() / 1000), "endTime": parseInt($scope.endTime.getTime() / 1000)},
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
                                {msg: data.detail,type:'success'}
                            ]);
                            $scope.attrvalues = data.value;
                            $scope.clearSelected();
                            break;
                    }

                }).error(function (data, status, headers, config) {
                    $scope.isSubmit = false;
                    $scope.showAlert([
                        {msg: '合并失败!' + status}
                    ]);
                });
                $('#myModal').modal('hide');
            }
        }
        //拆分
        $scope.splitAttr = function () {
            $scope.modaltitle = "拆分属性";
            var params = [];
            if ($scope.notApprovedSelectedArray.length < 1) {
                return;
            }
            $.each($scope.notApprovedSelectedArray, function (i, n) {
                var selectedAlias = $filter('filter')(n.palias, {selected: true});
                $.each(selectedAlias, function (ii, nn) {
                    params.push(n.cid + "&&" + n.pid + "&&" + nn.name);
                });
            });

            if (params.length <= 0) {
                return;
            }
            $scope.alerts = [
                {msg: '正在拆分，请稍后...', type: "success"}
            ];
            $scope.isSubmit = true;
            $http({
                method: 'post',
                url: '/bgmanager/attrconfirm/splitattr',
                data: {"params": params.join("##"), "cid": $scope.currentCat.uid, "cname": $scope.currentCat.cat_name,"startTime": parseInt($scope.startTime.getTime() / 1000), "endTime": parseInt($scope.endTime.getTime() / 1000)},
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
                            {msg: data.detail,type:'success'}
                        ]);
                        $scope.attrvalues.notApprovedAttr = data.value;
                        $scope.clearSelected();
                        break;
                }

            }).error(function (data, status, headers, config) {
                $scope.isSubmit = false;
                $scope.showAlert([
                    {msg: '拆分失败!' + status}
                ]);
            });
        }

        //新增
        $scope.addAttr = function () {
            $scope.modaltitle = "新增属性";
            $scope.addExisted = false;
            $scope.initConfirm();
            $scope.okcallback = function () {
                var approved = [];
                $.each($scope.approvedSelectedArray, function (i, n) {
                    approved.push(n.cid + "&&" + n.pid + "&&" + n.pname);
                });
                if ($scope.notApprovedSelectedArray.length < 1) {
                    return;
                }
                if ($scope.notApprovedSelectedArray.length > 1) {
                    var params = [];
                    $.each($scope.notApprovedSelectedArray, function (i, n) {
                        params.push(n.cid + "&&" + n.pid + "&&" + n.pname);
                    });
                    $scope.alerts = [
                        {msg: '正在新增合并，请稍后...', type: "success"}
                    ];
                    $scope.isSubmit = true;
                    $http({
                        method: 'post',
                        url: '/bgmanager/attrconfirm/mergeattr',
                        data: {"params": params.join("##"), "approved": approved.join("##"), "pname": $scope.currentModal.pname, "cid": $scope.currentCat.uid, "cname": $scope.currentCat.cat_name, "startTime": parseInt($scope.startTime.getTime() / 1000), "endTime": parseInt($scope.endTime.getTime() / 1000)},
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
                                    {msg: '新增成功',type:'success'}
                                ]);
                                $.each($scope.notApprovedSelectedArray, function (i, n) {
                                    $scope.attrvalues.notApprovedAttr.splice($.inArray(n, $scope.attrvalues.notApprovedAttr), 1);
                                });
                                $scope.todoApprovedAttr.push({"cid": $scope.currentModal.cid, "pid": $scope.currentModal.pid, "pname": $scope.currentModal.pname, "palias": $scope.currentModal.palias});
                                $scope.clearSelected();
                                break;
                        }

                    }).error(function (data, status, headers, config) {
                        $scope.isSubmit = false;
                        $scope.showAlert([
                            {msg: '新增合并失败!' + status}
                        ]);
                    });
                } else {
                    $.each($scope.notApprovedSelectedArray, function (i, n) {
                        $scope.attrvalues.notApprovedAttr.splice($.inArray(n, $scope.attrvalues.notApprovedAttr), 1);
                    });
                    $scope.todoApprovedAttr.push({"cid": $scope.currentModal.cid, "pid": $scope.currentModal.pid, "pname": $scope.currentModal.pname, "palias": $scope.currentModal.palias});
                    $scope.$apply();
                    $scope.clearSelected();
                }
                $('#myModal').modal('hide');
            }
        }

        //删除
        $scope.delAttr = function () {
            $.each($scope.todoApprovedSelectedArray, function (i, n) {
                $scope.todoApprovedAttr.splice($.inArray(n, $scope.todoApprovedAttr), 1);
            });
            $scope.todoApprovedSelectedArray = [];
            var params = [];
            $.each($scope.notApprovedSelectedArray, function (i, n) {
                params.push(n.cid + "&&" + n.pid + "&&" + n.pname);
            });
            if (params == "") {
                return;
            }
            $scope.alerts = [
                {msg: '正在删除，请稍后...', type: "success"}
            ];
            $scope.isSubmit = true;
            $http({
                method: 'post',
                url: '/bgmanager/attrconfirm/delattr',
                data: {"params": params.join("##"), "startTime": parseInt($scope.startTime.getTime() / 1000), "endTime": parseInt($scope.endTime.getTime() / 1000)},
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
                            {msg: data.detail,type:'success'}
                        ]);
                        $.each($scope.notApprovedSelectedArray, function (i, n) {
                            $scope.attrvalues.notApprovedAttr.splice($.inArray(n, $scope.attrvalues.notApprovedAttr), 1);
                        });
                        $scope.clearSelected();
                        break;
                }

            }).error(function (data, status, headers, config) {
                $scope.isSubmit = false;
                $scope.showAlert([
                    {msg:'删除失败!' + status}
                ]);
            });

        }
        //审核
        $scope.confirmAttr = function () {
            $scope.modaltitle = "审核属性";
            if ($scope.todoApprovedSelectedArray.length < 1) {
                return;
            }
            var params = [];
            $.each($scope.todoApprovedSelectedArray, function (i, n) {
                var palias = [];
                $.each(n.palias, function (ii, nn) {
                    palias.push(nn.name);
                });
                params.push(n.cid + "&&" + n.pid + "&&" + n.pname + "&&" + palias.join(","));
            });
            $scope.alerts = [
                {msg: '正在提交审核，请稍后...', type: "success"}
            ];
            $scope.isSubmit = true;
            $http({
                method: 'post',
                url: '/bgmanager/attrconfirm/addattr',
                data: {"params": params.join("##"), "cid": $scope.currentCat.uid, "cname": $scope.currentCat.cat_name,"startTime": parseInt($scope.startTime.getTime() / 1000), "endTime": parseInt($scope.endTime.getTime() / 1000)},
                timeout: 50000
            }).success(function (data, status, headers, config) {
                $scope.isSubmit = false;
                switch (data.code) {
                    case "0":
                        $scope.alerts = [
                            {msg: '审核失败!'}
                        ];
                        $scope.showAlert([
                            {msg: '审核失败!'}
                        ]);
                        break;
                    case "1":
                        $scope.showAlert([
                            {msg: data.detail,type:'success'}
                        ]);
                        $scope.attrvalues.approvedAttr = data.value;
                        $.each($scope.todoApprovedSelectedArray, function (i, n) {
                            $scope.todoApprovedAttr.splice($.inArray(n, $scope.todoApprovedAttr), 1);
                        });
                        $scope.clearSelected();
                        break;
                }

            }).error(function (data, status, headers, config) {
                $scope.isSubmit = false;
                $scope.showAlert([
                    {msg: '审核失败!' + status}
                ]);
            });
        }
        //初始化模态弹出框内容
        $scope.initConfirm = function () {
            var refer_num = 0;
            var obj = null;
            var palias = [];
            $.each($scope.notApprovedSelectedArray, function (i, n) {
                $.merge(palias, n.palias);
            });
            obj = $.extend(true, {}, $scope.notApprovedSelectedArray[0]);
            if (obj) {
                $.unique(palias);
                obj.palias = palias;
                obj.selected = false;
                $scope.currentModal = obj;
            }
            $scope.currentVChange();
        }
        //清除选中
        $scope.clearSelected = function () {
            $scope.currentModal = {};
            $scope.notApprovedSelectedArray = [];
            $scope.todoApprovedSelectedArray = [];
            $scope.approvedSelectedArray = [];
        }
        $scope.todoSelectAll = function () {
            $.each($scope.todoApprovedAttr, function (i, n) {
                n.selected = !n.selected;
            });
            $scope.todoApprovedFilter();
        }
        //筛选已审核选中记录
        $scope.approvedFilter = function () {
            $scope.approvedSelectedArray = $filter('filter')($scope.attrvalues.approvedAttr, {selected: true});
        }
        //筛选待审核选中记录
        $scope.todoApprovedFilter = function () {
            $scope.todoApprovedSelectedArray = $filter('filter')($scope.todoApprovedAttr, {selected: true});
        }
        //筛选未审核选中记录
        $scope.notApprovedFilter = function () {
            $scope.notApprovedSelectedArray = $filter('filter')($scope.attrvalues.notApprovedAttr, {selected: true});
        }
        //父子选中状态关联
        $scope.check = function (x) {
            x.selected = $filter('filter')(x.palias, {selected: true}).length > 0;
            $scope.notApprovedFilter();
        }
        //模态弹出框中值改变，判断名称是否已存在
        $scope.currentVChange = function () {
            if ($filter('filter')($scope.todoApprovedAttr, {"pname": $scope.currentModal.pname}, true).length > 0 || $filter('filter')($scope.attrvalues.approvedAttr, {"pname": $scope.currentModal.pname}, true).length > 0) {
                $scope.addExisted = true;
            } else {
                $scope.addExisted = false;
            }
        }
        $scope.alerts = [];
        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.showDetail = function (x, xx) {
            x.show = true;
            $scope.currDetail = xx;
            if (!xx.details) {
                $http({
                    method: 'post',
                    url: '/bgmanager/attrconfirm/queryAttrDetails',
                    data: {"cid": x.cid, "p_alias": xx.name, "startTime": parseInt($scope.startTime.getTime() / 1000), "endTime": parseInt($scope.endTime.getTime() / 1000)},
                    timeout: 50000
                }).success(function (data, status, headers, config) {
                    switch (data.code) {
                        case "0":
                            break;
                        case "1":
                            if ($scope.currDetail) {
                                $scope.currDetail.details = data.value;
                            }
                            break;
                    }
                }).error(function (data, status, headers, config) {
                });
            }
        };
        $scope.hideDetail = function (x) {
            x.show = false;
            $scope.currDetail = null;
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



