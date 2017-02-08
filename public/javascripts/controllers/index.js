/**
 * Created by shiliang on 2016/8/5.
 */

define(['domReady','highcharts-config',
    'angular-jqcloud',
    'directives/panel1',
    'directives/panel2',
    'directives/panel3',
    'directives/dropdown1',
    'directives/search1',
    'directives/evaluate',
    'directives/vane',
    'directives/datasolt',
    'directives/hchart',
    'services/APIService'], function (domReady) {
    // controller
    return ['$scope', '$timeout', 'API', function ($scope, $timeout, API) {
        // properties
        $scope.user = API.users.get({"id": "logined"});
        $scope.menus = API.menus.query({"menuId": "menus"});
        $scope.currentMenu = null;
        $scope.industry = API.industry.query({"industry": "all"}, function (data) {
            $scope.induChange($scope.industry[1]);
        });

        $scope.induChange = function (indu) {
            $scope.currentIndu = indu;
            $scope.$broadcast("induChange", $scope.currentIndu);
        }

        $scope.menuInit = function (menu) {
            if (window.location.hash === menu.url) {
                menu.selected = true;
                $scope.currentMenu = menu;
                document.title = "大数据分析-" + $scope.currentMenu.name;
            }
        }
        $scope.menuChange = function (menu) {
            if ($scope.currentMenu) {
                $scope.currentMenu.selected = false;
            }
            menu.selected = true;
            $scope.currentMenu = menu;
            document.title = "大数据分析-" + $scope.currentMenu.name;
        }

        $(window).scroll(function () {
            if (!$scope.navtabsWidth || $scope.navtabsWidth != $(".fixed .nav.nav-tabs").width()) {
                $scope.navtabsWidth = $(".fixed .nav.nav-tabs").width();
            }
            if ($(document).scrollTop() > 70) {
                $(".navbar-default.sidebar").css({"position": "fixed", "top": "-70px"});
                $(".fixed .nav.nav-tabs").css({"position": "fixed", "top": "0px", "z-index": 100, "width": $scope.navtabsWidth});
                $(".fixed .searchdiv").each(function () {
                    $(this).css({"position": "fixed", "z-index": 100, "top": $(this).attr("fixedTop"), "right": $(this).attr("fixedRight")});
                });
            } else {
                $(".navbar-default.sidebar").css({"position": "", "top": ""});
                $(".fixed .nav.nav-tabs").css({"position": "", "top": "", "width": ""});
                $(".fixed .searchdiv").each(function () {
                    $(this).css({"position": "absolute", "top": $(this).attr("absoluteTop"), "right": $(this).attr("absoluteRight")});
                });
            }
        });

        //关闭click.bs.dropdown.data-api事件，使顶级菜单可点击
//        $(document).off('click.bs.dropdown.data-api');

        $scope.navinit = function () {
            $timeout(function(){
//                $("#side-menu").metisMenu();
            },1000);
            $('li.dropdown').mouseover(function () {
                $(this).addClass('open');
            }).mouseout(function () {
                $(this).removeClass('open');
            });
        }
        $scope.refresh = function () {
            window.location.reload()
        }
    }];
});
