/**
 * Created by shiliang on 2016/7/26.
 */
define([], function () {
    // controller
    return ['$scope','$timeout', 'API', function ($scope,$timeout, API) {
        // properties
        $scope.isCollapsed = false;
        $scope.isCollapsedHorizontal = false;
        $scope.myInterval = 5000;
        $scope.noWrapSlides = false;
        $scope.active = 0;
        var slides = $scope.slides = [];
        var currIndex = 0;
        $scope.sliderItemLength = 3;
        $scope.refresh = function () {
            if(!$scope.currentIndu){
                return;
            }
            API.home.get({"indu_id": $scope.currentIndu.id}, function (data) {
                $scope.data = data;
                var sliderSize = $scope.data.Slider.length % $scope.sliderItemLength == 0 ? $scope.data.Slider.length / $scope.sliderItemLength : parseInt($scope.data.Slider.length / $scope.sliderItemLength) + 1;
//                for (var i = 0; i < sliderSize; i++) {
//                    var items = $scope.data.Slider.slice(i * $scope.sliderItemLength, (i + 1) * $scope.sliderItemLength);
//                    slides.push({
//                        items: items,
//                        id: currIndex++
//                    });
//                }
                for (var i = 0; i < sliderSize; i++) {
                    var items = $scope.data.Slider.slice(i * $scope.sliderItemLength, (i + 1) * $scope.sliderItemLength);
                    $scope.addSlide(items);
                }
                console.info(slides)
//                var word_list = [
//                    {text: "印花", weight: 4.5, link: {href: "../../企业大数据中心高保真V1@20150728/产业潮流动态列表.html", target: "_blank"}},
//                    {text: "拼接", weight: 2, link: {href: "#", target: "_blank"}},
//                    {text: "印花裙", weight: 1.2},
//                    {text: "剪羊毛", weight: 1.4},
//                    {text: "格纹", weight: 1.4},
//                    {text: "流苏吊穗", weight: 1.4},
//                    {text: "刺绣", weight: 2.1},
//                    {text: "运动鞋", weight: 1.2},
//                    {text: "阔腿裤", weight: 1.2},
//                    {text: "伞裙", weight: 2.2},
//                    {text: "高跟鞋", weight: 1.2},
//                    {text: "中性", weight: 1.6},
//                    {text: "流苏", weight: 1.4},
//                    {text: "斜挎包", weight: 1.4},
//                    {text: "多变开衩", weight: 1.4},
//                    {text: "天鹅绒", weight: 1.4},
//                    {text: "复古", weight: 1.4},
//                    {text: "金属色", weight: 1.6},
//                    {text: "60年代", weight: 1.4},
//                    {text: "双肩包", weight: 1.4},
//                    {text: "学院风", weight: 2},
//                    {text: "漆皮", weight: 1.6},
//                    {text: "简约", weight: 1.4},
//                    {text: "黑色", weight: 1.2},
//                    {text: "雅痞", weight: 1.2},
//                    {text: "九分裤", weight: 1.2},
//                    {text: "波浪边", weight: 1.2},
//                    {text: "波点", weight: 1.2},
//                    {text: "迷彩", weight: 1.2},
//                    {text: "高腰伞裙", weight: 1.2},
//                    {text: "糖果色", weight: 1.2},
//                    {text: "蛇纹", weight: 1.2},
//                    {text: "波西米亚", weight: 1.2},
//                    {text: "裸色", weight: 2.3},
//                    {text: "开衫", weight: 1},
//                    {text: "背心", weight: 1},
//                    {text: "短裙", weight: 1},
//                    {text: "凉鞋", weight: 1},
//                    {text: "白色", weight: 1},
//                    {text: "罗马鞋", weight: 1},
//                    {text: "迷你包", weight: 1}
//                ];
//                $("#words").jQCloud(word_list);
//                $scope.slides=sliders;
            });
        };

        $scope.$on('induChange', function (e, d) {
            $scope.refresh();
        });
        $scope.addSlide = function (items) {
            var newWidth = 744 + slides.length + 1;
            slides.push({
                items: items,
                id: currIndex++
            });
        };
        $scope.randomize = function () {
            var indexes = generateIndexesArray();
            assignNewIndexesToSlides(indexes);
        };

        // Randomize logic below

        function assignNewIndexesToSlides(indexes) {
            for (var i = 0, l =  $scope.slides.length; i < l; i++) {
                slides[i].id = indexes.pop();
            }
        }

        function generateIndexesArray() {
            var indexes = [];
            for (var i = 0; i < currIndex; ++i) {
                indexes[i] = i;
            }
            return shuffle(indexes);
        }

        // http://stackoverflow.com/questions/962802#962890
        function shuffle(array) {
            var tmp, current, top = array.length;

            if (top) {
                while (--top) {
                    current = Math.floor(Math.random() * (top + 1));
                    tmp = array[current];
                    array[current] = array[top];
                    array[top] = tmp;
                }
            }

            return array;
        }

        $scope.colors = ["#800026", "#bd0026", "#e31a1c", "#fc4e2a", "#fd8d3c", "#feb24c", "#fed976"];

        $scope.update = function () {
//            $scope.words.splice(-5);
        };

        $scope.initCommodityHotMaxValue = function (index, item) {
            if (index == 0) {
                $scope.commodityHotMaxValue = item.sales_volume;
            }
        }
    }];
});
