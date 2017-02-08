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
        $scope.todoApprovedSelectedArray = [];//待审核选中数组
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
        };

        //属性查询
        $scope.attrSearch = function () {
            $http.get('/bgmanager/attrvalueconfirm/searchattr?cid=' + $scope.currentCat.uid + '&cname=' + $scope.currentCat.cat_name).success(function (data) {
                $scope.attrs = data;
                if ($scope.currentAttr == null) {
                    $scope.currentAttr = $scope.attrs[0];
                }
            });
        }
        //属性值查询
        $scope.search = function () {
            if (!$scope.currentAttr) {
                $scope.showAlert([
                    {msg: '属性为空!'}
                ]);
                return;
            }
            $scope.alerts = [
                {msg: '正在查询，请稍后...', type: "success"}
            ];
            $scope.approvedPageNo = 1;
            $scope.notApprovedPageNo = 1;
            $scope.approvedKeyWord='';
            $scope.approvedKeyWord1='';
            $scope.notApprovedKeyWord='';
            $scope.notApprovedKeyWord1='';
            $scope.clearSelected();
            $scope.approvedSearch();
            $scope.notApprovedSearch();

        }


        $scope.approvedSearch = function () {
            $http({
                method: 'get',
                url: '/bgmanager/attrvalue/search?type=0&cid='
                    + $scope.currentCat.uid + "&cname=" + encodeURI($scope.currentCat.cat_name)
                    + '&pid=' + $scope.currentAttr.pid + "&pname=" + encodeURI($scope.currentAttr.pname)
                    + '&startTime=' + parseInt($scope.startTime.getTime() / 1000)
                    + '&endTime=' + parseInt($scope.endTime.getTime() / 1000)
                    +'&keyword='+encodeURI($scope.approvedKeyWord)
                    +'&keyword1='+encodeURI($scope.approvedKeyWord1)
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
                        $scope.showAlert([
                            {msg: data.detail,type:'success'}
                        ]);
                        $scope.attrvalues.approvedAttr = data.value.list;
                        $scope.approvedPages = data.value.pages;
                        $scope.approvedTotal = data.value.total;
                        break;
                }
            }).error(function (data, status, headers, config) {
                $scope.showAlert([
                    {msg: '查询失败!'}
                ]);
            });
        }
        $scope.notApprovedSearch = function () {
            $http({
                method: 'get',
                url: '/bgmanager/attrvalue/search?type=1&cid='
                    + $scope.currentCat.uid + "&cname=" + encodeURI($scope.currentCat.cat_name)
                    + '&pid=' + $scope.currentAttr.pid + "&pname=" + encodeURI($scope.currentAttr.pname)
                    + '&startTime=' + parseInt($scope.startTime.getTime() / 1000)
                    + '&endTime=' + parseInt($scope.endTime.getTime() / 1000)
                    +'&keyword='+encodeURI($scope.notApprovedKeyWord)
                    +'&keyword1='+encodeURI($scope.notApprovedKeyWord1)
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
                window.open("/bgmanager/attrvalueconfirm/attrvalueDownload?cid=" + $scope.currentCat.uid + "&pid=" + $scope.currentAttr.pid, '_parent');
            }
        }

        //合并
        $scope.mergeAttr = function () {
            $scope.modaltitle = "合并属性";
            if ($scope.approvedSelectedArray.length > 0) {
                $.each($scope.approvedSelectedArray, function (i, n) {
                    $scope.currentModal = $.extend(true, {}, n);
                    $.each($scope.notApprovedSelectedArray, function (ii, nn) {
                        $.merge($scope.currentModal.valias, nn.valias);
                    });
                });
                $.unique($scope.currentModal.valias);
            } else {
                $scope.initConfirm();
            }
            $scope.okcallback = function () {
                var approved = [];
                $.each($scope.approvedSelectedArray, function (i, n) {
                    approved.push(n.cid + "&&" + n.pid + "&&" + n.vname + "&&" + n.vid);
                });
                if ($scope.notApprovedSelectedArray.length < 1) {
                    return;
                }
                var params = [];
                $.each($scope.notApprovedSelectedArray, function (i, n) {
//                    console.info(n);
                    params.push(n.cid + "&&" + n.pid + "&&" + n.vname);
                });
                $scope.alerts = [
                    {msg: '正在合并，请稍后...', type: "success"}
                ];
                $scope.isSubmit = true;
                $http({
                    method: 'post',
                    url: '/bgmanager/attrvalueconfirm/mergeattrvalue',
                    data: {"params": params.join("##"), "approved": approved.join("##"), "vname": $scope.currentModal.vname, "cid": $scope.currentCat.uid, "cname": $scope.currentCat.cat_name, "pid": $scope.currentAttr.pid, "pname": $scope.currentAttr.pname, "startTime": parseInt($scope.startTime.getTime() / 1000), "endTime": parseInt($scope.endTime.getTime() / 1000)},
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
//                            $scope.attrvalues = data.value;
//                            $scope.clearSelected();
                            $scope.search();
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
                var selectedAlias = $filter('filter')(n.valias, {selected: true});
                $.each(selectedAlias, function (ii, nn) {
                    var state=-3;
                    if(n.vname==nn.name){
                        state= n.state;
                    }
                    params.push(n.cid + "&&" + n.pid + "&&" + nn.name+"&&"+state);
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
                url: '/bgmanager/attrvalueconfirm/splitattrvalue',
                data: {"params": params.join("##"), "cid": $scope.currentCat.uid, "cname": $scope.currentCat.cat_name, "pid": $scope.currentAttr.pid, "pname": $scope.currentAttr.pname, "startTime": parseInt($scope.startTime.getTime() / 1000), "endTime": parseInt($scope.endTime.getTime() / 1000)},
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
//                        $scope.attrvalues.notApprovedAttr = data.value;
//                        $scope.clearSelected();
                        $scope.search();
                        break;
                }

            }).error(function (data, status, headers, config) {
                $scope.isSubmit = false;
                $scope.showAlert([
                    {msg: '拆分失败!' + status}
                ]);
                $timeout(function () {
                    $scope.alerts = [];
                }, 5000);
            });
        }

        $scope.batchaddAttr = function () {
            $.each($scope.notApprovedSelectedArray, function (i, n) {
                n.selected = false;
                $scope.todoApprovedAttr.push(n);
                $scope.attrvalues.notApprovedAttr.splice($.inArray(n, $scope.attrvalues.notApprovedAttr), 1);
            });
            $scope.clearSelected();
            return;
        }

        //新增
        $scope.addAttr = function () {
            $scope.modaltitle = "新增属性";
            $scope.addExisted = false;
            $scope.initConfirm();
            $scope.okcallback = function () {
                var approved = [];
                $.each($scope.approvedSelectedArray, function (i, n) {
                    approved.push(n.cid + "&&" + n.pid + "&&" + n.vname + "&&" + n.vid);
                });
                if ($scope.notApprovedSelectedArray.length < 1) {
                    return;
                }
                if ($scope.notApprovedSelectedArray.length > 0) {
                    var params = [];
                    $.each($scope.notApprovedSelectedArray, function (i, n) {
                        params.push(n.cid + "&&" + n.pid + "&&" + n.vname);
                    });
                    $scope.alerts = [
                        {msg: '正在新增合并，请稍后...', type: "success"}
                    ];
                    $scope.isSubmit = true;
                    $http({
                        method: 'post',
                        url: '/bgmanager/attrvalueconfirm/mergeattrvalue',
                        data: {"params": params.join("##"), "approved": approved.join("##"), "vname": $scope.currentModal.vname, "cid": $scope.currentCat.uid, "cname": $scope.currentCat.cat_name, "pid": $scope.currentAttr.pid, "pname": $scope.currentAttr.pname, "startTime": parseInt($scope.startTime.getTime() / 1000), "endTime": parseInt($scope.endTime.getTime() / 1000)},
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
                                $.each($scope.notApprovedSelectedArray, function (i, n) {
                                    $scope.attrvalues.notApprovedAttr.splice($.inArray(n, $scope.attrvalues.notApprovedAttr), 1);
                                });
                                $scope.todoApprovedAttr.push({"cid": $scope.currentModal.cid, "pid": $scope.currentModal.pid, "vname": $scope.currentModal.vname, "valias": $scope.currentModal.valias,'state':-3});
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
                    $scope.todoApprovedAttr.push({"cid": $scope.currentModal.cid, "pid": $scope.currentModal.pid, "vname": $scope.currentModal.vname, "valias": $scope.currentModal.valias});
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
                params.push(n.cid + "&&" + n.pid + "&&" + n.vname);
            });
            var params1 = [];
            $.each($scope.approvedSelectedArray, function (i, n) {
                var valias = [];
                $.each(n.valias, function (ii, nn) {
                    valias.push(nn.name);
                });
                params1.push(n.cid + "&&" + n.pid + "&&" + n.vname + "&&" + n.vid + "&&" + valias.join(","));
            });

            if (params == "" && params1 == "") {
                return;
            }
            $scope.alerts = [
                {msg: '正在删除，请稍后...', type: "success"}
            ];
            $scope.isSubmit = true;
            $http({
                method: 'post',
                url: '/bgmanager/attrvalueconfirm/delattrvalue',
                data: {"params": params.join("##"), "params1": params1.join("##"), "vname": $scope.currentModal.vname, "cid": $scope.currentCat.uid, "cname": $scope.currentCat.cat_name, "pid": $scope.currentAttr.pid, "pname": $scope.currentAttr.pname, "startTime": parseInt($scope.startTime.getTime() / 1000), "endTime": parseInt($scope.endTime.getTime() / 1000)},
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
//                        $.each($scope.notApprovedSelectedArray, function (i, n) {
//                            $scope.attrvalues.notApprovedAttr.splice($.inArray(n, $scope.attrvalues.notApprovedAttr), 1);
//                        });
//                        $.each($scope.approvedSelectedArray, function (i, n) {
//                            $scope.attrvalues.approvedAttr.splice($.inArray(n, $scope.attrvalues.approvedAttr), 1);
//                        });
//                        $scope.clearSelected();
//                        $scope.attrvalues = data.value;
//                        $scope.clearSelected();
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
        //审核
        $scope.confirmAttr = function () {
            $scope.modaltitle = "审核属性";
            if ($scope.todoApprovedSelectedArray.length < 1) {
                return;
            }
            var arr = $filter('filter')($scope.todoApprovedSelectedArray, {state: -3});
            var arr1 = $filter('filter')($scope.todoApprovedSelectedArray, {state: -1});

            var params = [];
            $.each(arr, function (i, n) {
                var valias = [];
                $.each(n.valias, function (ii, nn) {
                    valias.push(nn.name);
                });
                params.push(n.cid + "&&" + n.pid + "&&" + n.vname + "&&" + valias.join(","));
            });
            var params1 = [];
            $.each(arr1, function (i, n) {
                var valias = [];
                $.each(n.valias, function (ii, nn) {
                    valias.push(nn.name);
                });
                params1.push(n.cid + "&&" + n.pid + "&&" + n.vname + "&&" + valias.join(","));
            });

            $scope.alerts = [
                {msg: '正在提交审核，请稍后...', type: "success"}
            ];
            $scope.isSubmit = true;
            $http({
                method: 'post',
                url: '/bgmanager/attrvalueconfirm/addattrvalue',
                data: {"params": params.join("##"), "params1": params1.join("##"), "cid": $scope.currentCat.uid, "cname": $scope.currentCat.cat_name, "pid": $scope.currentAttr.pid, "pname": $scope.currentAttr.pname, "startTime": parseInt($scope.startTime.getTime() / 1000), "endTime": parseInt($scope.endTime.getTime() / 1000)},
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
//                        $scope.attrvalues.approvedAttr = data.value;
                        $.each($scope.todoApprovedSelectedArray, function (i, n) {
                            $scope.todoApprovedAttr.splice($.inArray(n, $scope.todoApprovedAttr), 1);
                        });
//                        $scope.clearSelected();
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
        //初始化模态弹出框内容
        $scope.initConfirm = function () {
            var refer_num = 0;
            var obj = null;
            var valias = [];
            $.each($scope.notApprovedSelectedArray, function (i, n) {
                $.merge(valias, n.valias);
            });
            obj = $.extend(true, {}, $scope.notApprovedSelectedArray[0]);
            if (obj) {
                $.unique(valias);
                obj.valias = valias;
                obj.selected = false;
                $scope.currentModal = obj;
            }
            $scope.currentModal.oldVname=$scope.currentModal.vname;
            $scope.currentVChange();
        }
        //清除选中
        $scope.clearSelected = function () {
            $scope.currentModal = {};
            $scope.notApprovedSelectedArray = [];
            $scope.todoApprovedSelectedArray = [];
            $scope.approvedSelectedArray = [];
        }

        $scope.notApprovedSelectAll = function () {
            $.each($scope.attrvalues.notApprovedAttr, function (i, n) {
                n.selected = !n.selected;
                $.each(n.valias, function (ii, nn) {
                    nn.selected = n.selected;
                });
            });
            $scope.notApprovedFilter();
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
            x.selected = $filter('filter')(x.valias, {selected: true}).length > 0;
            $scope.notApprovedFilter();
        }
        $scope.checkxx = function (x) {
            $.each(x.valias, function (i, n) {
                n.selected = x.selected;
            });
            $scope.notApprovedFilter();
        }
        //模态弹出框中值改变，判断名称是否已存在
        $scope.currentVChange = function () {
//            if ($filter('filter')($scope.todoApprovedAttr, {"vname": $scope.currentModal.vname}, true).length > 0 || $filter('filter')($scope.attrvalues.approvedAttr, {"vname": $scope.currentModal.vname}, true).length > 0) {
//                $scope.addExisted = true;
//            } else {
//                $scope.addExisted = false;
//            }
            if($filter('filter')($scope.todoApprovedAttr, {"vname": $scope.currentModal.vname}, true).length > 0 || ($scope.currentModal.state==-1&&$scope.currentModal.oldVname==$scope.currentModal.vname)){
                $scope.addExisted = true;
            }else{
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
                    url: '/bgmanager/attrvalueconfirm/queryAttrValueDetails',
                    data: {"cid": x.cid, "p_id": $scope.currentAttr.pid, "p_name": $scope.currentAttr.pname, "v_alias": xx.name, "startTime": parseInt($scope.startTime.getTime() / 1000), "endTime": parseInt($scope.endTime.getTime() / 1000)},
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
            if ($scope.timer) {
                $timeout.cancel($scope.timer);
            }
            $scope.timer = $timeout(function () {
                $scope.alerts = [];
            }, 1000);
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

