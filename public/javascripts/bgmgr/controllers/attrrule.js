/**
 * Created by shiliang on 2016/9/10.
 */
define([], function () {
    // controller
    return ['$scope', '$http','$uibModal', '$timeout', '$log',function ($scope, $http,$uibModal, $timeout, $log) {
        $scope.alerts = [];
        $scope.categs = [];
        $scope.chans=[];
        $scope.currentCat = null;
        $scope.currentChan = null;
        $http.get('/bgmanager/chans/search').success(function (data) {
            $scope.chans = data;
        });

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

        $scope.categChange=function(x){
            $scope.currentCat=x;
        }
        $scope.changeChan=function(x){
            $scope.currentChan=x;
        }
        $scope.search = function () {
            if(!$scope.currentCat || !$scope.currentChan){
                $scope.showAlert([
                    {msg: '品类或渠道为空'}
                ]);
                return;
            }
            $scope.alerts = [
                {msg: '正在查询，请稍后...', type: "success"}
            ];
            $http({
                method: 'get',
                url: '/bgmanager/attrrule/search?cid=' + $scope.currentCat.uid+"&chan_id="+ $scope.currentChan.chanid,
                timeout: 50000
            }).success(function (data, status, headers, config) {
                switch (data.code) {
                    case "0":
                        $scope.showAlert([
                            {msg: '查询失败!'}
                        ]);
                        break;
                    case "1":
                        $scope.datas = data.value;
                        $scope.showAlert([{msg: data.detail, type: "success"}]);
                        break;
                }
            }).error(function (data, status, headers, config) {
                $scope.showAlert([
                    {msg: '查询失败!'}
                ]);
            });
        }
        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.initRules=function(rules,type){
            if(rules &&rules.length<=0){
                rules.push({'expr': "", 'type': type});
            }
        }
        $scope.add=function(rules,type){
            rules.push({'expr': "", 'type': type});
        }
        $scope.del=function(rules,rule){
            rules.splice($.inArray(rule,rules),1);
        }


        $scope.swap=function(arr, index1, index2){
            arr[index1] = arr.splice(index2, 1, arr[index1])[0];
        }
        $scope.up=function(rules,rule){
            var index=$.inArray(rule,rules);
            if(index==0){
                return;
            }
            $scope.swap(rules,index,index-1);
        }
        $scope.down=function(rules,rule){
            var index=$.inArray(rule,rules);
            if(index==rules.length-1){
                return;
            }
            $scope.swap(rules,index,index+1);
        }

        $scope.showAlert = function (alerts) {
            $scope.alerts = alerts;
            if($scope.timer){
                $timeout.cancel($scope.timer);
            }
            $scope.timer=$timeout(function () {
                $scope.alerts = [];
            }, 5000);
        }
        $scope.save=function(x){
            console.info(x);
            if(x.chan_id==""){
                x.chan_id=$scope.currentChan.chanid;
            }
            $http({
                method: 'post',
                url: '/bgmanager/attrrule/save',
                data:{'params': JSON.stringify(x)},
                timeout: 50000
            }).success(function (data, status, headers, config) {
                switch (data.code) {
                    case "0":
                        $scope.showAlert([
                            {msg: '保存失败!'}
                        ]);
                        break;
                    case "1":
                        $scope.showAlert([{msg: data.detail, type: "success"}]);
                        break;
                }
            }).error(function (data, status, headers, config) {
                $scope.showAlert([
                    {msg: '保存失败!'}
                ]);
            });
        }
        $scope.clear=function(x){
            if(x.chan_id==""){
                x.chan_id=$scope.currentChan.chanid;
            }
            $http({
                method: 'post',
                url: '/bgmanager/attrrule/clear',
                data:{"params":JSON.stringify(x)},
                timeout: 50000
            }).success(function (data, status, headers, config) {
                switch (data.code) {
                    case "0":
                        $scope.showAlert([
                            {msg: '清空失败!'}
                        ]);
                        break;
                    case "1":
                        $scope.showAlert([
                            {msg: data.detail, type: "success"}
                        ]);
                        $scope.search();
                        break;
                }
            }).error(function (data, status, headers, config) {
                $scope.showAlert([
                    {msg: '清空失败!'}
                ]);
            });
        }
        $scope.testItem=null;
        $scope.test=function(x){
            console.info("测试%o",x)
            $scope.testItem=x;
            $('#myModal').modal('show');
        }

        $scope.doTest=function(){
            $http({
                method: 'post',
                url: '/bgmanager/attrrule/test',
                data:{'cid': $scope.testItem.cid,'chan_id':$scope.testItem.chan_id,'p_name': $scope.testItem.p_name,'time':parseInt($scope.time.getTime() / 1000)},
                timeout: 50000
            }).success(function (data, status, headers, config) {
                switch (data.code) {
                    case "0":
                        $scope.showAlert([
                            {msg: '测试失败!'}
                        ]);
                        break;
                    case "1":
                        $('#myModal').modal('hide');
                        $scope.showAlert([{msg: data.detail, type: "success"}]);

                        break;
                }
            }).error(function (data, status, headers, config) {
                $scope.showAlert([
                    {msg: '测试失败!'}
                ]);
            });
        }

        $scope.open = function (x,size) {
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