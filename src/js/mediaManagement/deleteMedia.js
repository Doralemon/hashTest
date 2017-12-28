define(['jquery', 'common/amdApi', 'mediaManagement/getData', 'text!tpls/deletModal.html'],
    function($, amdApi, getData, deletModalTpl) {
        return function(media_id, resourceTpye) {
            $('#deleteMassage').remove();
            $deletModal = $(deletModalTpl)
                .on('click', '.btn-comfirm', function() {
                    amdApi.ajax({ url: 'medias/' + resourceTpye + '/' + media_id + '/delete', type: 'post' }, function() {
                        $deletModal.find('h5').html("删除成功！");
                        $deletModal.find('.btn').hide();
                            window.location.replace("#/media/mediaLibrary");
                        setTimeout(function() {
                            $deletModal.modal('hide');
                            $('.modal-backdrop').css('display', "none");
                        }, 500);
                    })
                })
                .appendTo('body').modal();
            $('#deleteMassage').find('h5').html("你确定要删除该资源吗？");
        }
    })