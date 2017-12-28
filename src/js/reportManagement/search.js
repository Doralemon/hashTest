define(['jquery', 'artTemplate', 'common/amdApi',
        // 'transCodingManagement/getData',
        "bootstrap", "page"
    ],
    function($, art, amdApi, getData) {
        return function(q) {
            var json = {
                    limit: 10,
                    page: 1,
                    q: q
                }
                // amdApi.ajax({ url: 'medias/transcode/task_list', type: 'get', json: json }, function(res) {   
                //         getData.myAjax(json, res);          
                // })
        }
    })