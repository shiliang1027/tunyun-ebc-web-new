/**
 * Created by shiliang on 2016/12/23.
 */
define(['app'], function (app) {
    'use strict';
    app.factory('API', function ($resource) {
        return {
            "menus": $resource('datas/menus/:menuId'),
            "users": $resource('datas/users/:id'),
            "cates": $resource('datas/cates/:indu_id',{},{}),
            "chans": $resource('bgmanager/chans/search',{},{}),
            "newprod": $resource('datas/newprod/:type/:pageSize/:pageNo/:cid'),
            "home": $resource('datas/home/:indu_id'),
            "industry": $resource('datas/industry/:industry'),
            "induanalysis": $resource('datas/induanalysis/:indu_id/:tab'),
            "indufront": $resource('datas/indufront/:type/:indu_id/:tab'),
            "indufrontdetail": $resource('datas/indufrontdetail/:indu_id/:info_id')
        }
    });
});