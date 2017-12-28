define(['jquery', 'text!tpls/systemBackend/operationLog.html', 'artTemplate', 'common/amdApi', 'systemLog/getData',
        'bootstrap', 'page'
    ],
    function($, operationLogTpl, art, amdApi, getData) {
        return function() {
            var operationLog = art.render(operationLogTpl, {});
            $(".kandao-contentBody").html(operationLog);
            var json = {
                limit: 10
            };
            var operationLog = art.render(operationLogTpl, {});
            getData.myAjax(json);
            $('.breadcrumb li').eq(0).on('click', function() { //回首页
                $('.home').trigger('click');
            })
        }
    })