define(['jquery', 'common/amdApi', 'text!tpls/deletModal.html', 'common/getPage', 'transCodingManagement/getData'],
    function($, amdApi, deletModalTpl, getPage, getData) {
        return function(id, line_id) {
            $('#deleteMassage').remove();
            $deletModal = $(deletModalTpl)
                .on('click', '.btn-comfirm', function() {
                    amdApi.ajax({ url: 'medias/transcode/' + id + '/' + line_id + '/delete', type: 'post' }, function() {
                        $('#transCodeInfo').modal('hide');  
                        $deletModal.find('h5').html("删除成功！");
                        $deletModal.find('.btn').hide();
                        setTimeout(function() {
                            $deletModal.modal('hide');
                        }, 300);
                        $('.transcodingManagement').click();
                    })
                })
                .appendTo('body').modal();
            $('#deleteMassage').find('h5').html("你确定要删除吗？");
        }
    })