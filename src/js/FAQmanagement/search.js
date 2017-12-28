define(['jquery', 'artTemplate', 'common/amdApi','FAQmanagement/getData',       
        "bootstrap", "page"
    ],
    function($, art, amdApi, getData) {
        return function(json) {
                amdApi.ajax({ url: 'official/faq/list', type: 'get', json: json }, function(res) {   
                        getData.myAjax(json, res);          
                })
        }
    })