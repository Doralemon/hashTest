define(['jquery', 'common/amdApi', 'kandaonewsManagement/getData', 'text!tpls/deletModal.html',
'../common/getPage'],
function($, amdApi, getData, deletModalTpl,getPage) {
    return function(id,q,category_id,language) {
        $('#deleteMassage').remove();
        flag = true;
        var obj = getPage($('.kandao-news'), 10,flag );
        obj.json.q = q;
        obj.json.language = language;
        obj.json.category_id = category_id;
        $deletModal = $(deletModalTpl)
            .on('click', '.btn-comfirm', function() {
                amdApi.ajax({ url: 'official/kd_news/'+id+'/delete', type: 'post' }, function() {
                    $deletModal.find('h5').html("删除成功！");
                    amdApi.ajax({ url: 'official/kd_news/list', type: 'get', json:obj.json },function(res){
                        if(!res.result.data.length){
                          $(".kandaoNewsManagement").click(); 
                          return;
                        }
                        getData.getListData(res);
                        var str = $(".kandao-news .reportSearchContent>p").text();
                        var  num = str.replace('总计',"");
                        num = num.replace('条信息',"");
                       $(".kandao-news .reportSearchContent>p").text("总计"+(num-1)+"条信息");
                    })
                    $deletModal.find('.btn').hide();
                    setTimeout(function() {
                        $deletModal.modal('hide');
                        $('.modal-backdrop').css('display', "none");
                    }, 500);
                })
            })
            .appendTo('body').modal();
        $('#deleteMassage').find('h5').html("你确定要删除该篇新闻吗？");
    }
})