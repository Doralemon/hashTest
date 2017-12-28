define(['jquery', 'artTemplate', 'common/amdApi','kandaonewsManagement/getData',       
"bootstrap", "page"
],
function($, art, amdApi, getData) {
return function(json) {
        amdApi.ajax({ url: 'official/kd_news/list', type: 'get', json: json }, function(res) {   
                getData.myAjax(json, res);          
        })
}
})