define(['jquery', 'artTemplate', 'common/amdApi',
        'mediaPlayList/getData', 'common/getPage',
        "bootstrap", "page"
    ],
    function($, art, amdApi, getData, getPage) {
        return function(q, type) {
            var json = {
                limit: 10,
                q: q,
                type: type
            }
            amdApi.ajax({ url: 'medias/playlists', type: 'get', json: json }, function(res) {
                getData.myAjax(json, res);
            })
        }
    })