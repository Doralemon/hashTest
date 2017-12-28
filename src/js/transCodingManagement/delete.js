define(['jquery', 'common/amdApi', 'text!tpls/deletModal.html'],
    function($, amdApi, deletModalTpl) {
        return function(id) {
            $('#deleteMassage').remove();
            $deletModal = $(deletModalTpl)
                .on('click', '.btn-comfirm', function() {
                    amdApi.ajax({ url: 'medias/transcode/' + id + '/delete', type: 'post' }, function() {
                        $deletModal.find('h5').html("删除成功！");
                        $deletModal.find('.btn').hide();
                        setTimeout(function() {
                            $deletModal.modal('hide');
                        }, 300);
                        $('.transcodingManagement').trigger('click');
                    })
                })
                .appendTo('body').modal();
            $('#deleteMassage').find('h5').html("你确定要删除吗？");
        }
    })