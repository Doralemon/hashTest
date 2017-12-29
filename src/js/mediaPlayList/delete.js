define(['jquery', 'common/amdApi', 'mediaPlayList/getData', 'text!tpls/deletModal.html'],
    function($, amdApi, getInfoData, deletModalTpl) {
        return function(id, m_type) {
            $('#deleteMassage').remove();
            $deletModal = $(deletModalTpl)
                .on('click', '.btn-comfirm', function() {
                    amdApi.ajax({ url: 'medias/playlists/' + m_type + '/' + id + '/delete', type: 'post' }, function() {
                        $deletModal.find('h5').html("删除成功！");
                        $deletModal.find('.btn').hide();
                        setTimeout(function() {
                            $deletModal.modal('hide');
                        }, 300);
                        window.location.reload(true);
                    })
                })
                .appendTo('body').modal();
            $('#deleteMassage').find('h5').html("你确定要删除该链接吗？");
        }
    })