define(['jquery', 'text!tpls/websiteManagement/kandaoNewsManagementInfo.html', 'artTemplate', 'common/amdApi'],
    function($, kandaoNewsManagementInfoTpl, art, amdApi) {
        return function(id) {
            $('#kandaoNewsInfo').remove();
            amdApi.ajax({ url: 'official/kd_news/'+id+'/info', type: 'get' },function(res){
                var kandaoNewsManagementInfo =art.render(kandaoNewsManagementInfoTpl,res.result);
                var $kandaoNewsManagementInfo = $(kandaoNewsManagementInfo)
                .appendTo("body").modal();
                $kandaoNewsManagementInfo.find(".newsContent").html(res.result.context);
            })
        }
    })