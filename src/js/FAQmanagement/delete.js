define(['jquery', 'common/amdApi', 'FAQmanagement/getData', 'text!tpls/deletModal.html',
'../common/getPage'],
function($, amdApi, getData, deletModalTpl,getPage) {
    return function(id,q,type_id) {
        $('#deleteMassage').remove();
        flag = true;
        var obj = getPage($('.kandao-FAQ'), 10,flag );
        obj.json.q = q;
        obj.json.type= type_id;
        $deletModal = $(deletModalTpl)
            .on('click', '.btn-comfirm', function() {
                amdApi.ajax({ url: 'official/faq/'+id+'/delete', type: 'post' }, function() {
                    $deletModal.find('h5').html("删除成功！");
                    amdApi.ajax({ url: 'official/faq/list', type: 'get', json:obj.json },function(res){
                        if(!res.result.data.length){
                          $(".FAQManagement").click(); 
                          return;
                        }
                        getData.getListData(res);
                        var str = $(".kandao-FAQ .reportSearchContent>p").text();
                        var  num = str.replace('总计',"");
                        num = num.replace('条信息',"");
                       $(".kandao-FAQ .reportSearchContent>p").text("总计"+(num-1)+"条信息");
                    })
                    $deletModal.find('.btn').hide();
                    setTimeout(function() {
                        $deletModal.modal('hide');
                        $('.modal-backdrop').css('display', "none");
                    }, 500);
                })
            })
            .appendTo('body').modal();
        $('#deleteMassage').find('h5').html("你确定要删除该问题吗？");
    }
})