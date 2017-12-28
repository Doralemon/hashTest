define(['jquery', 'artTemplate', 'common/amdApi', 'text!tpls/deletModal.html', 'mediaPlayList/getData',
        "bootstrap", "page"
    ],
    function($, art, amdApi, deletModalTpl, getData) {
        return function(id, m_type, column_id) {
            $('#deleteMassage').remove();
            $deletModal = $(deletModalTpl)
                .on('click', '.btn-comfirm', function() {
                    var json = {
                        column_id: parseInt(column_id)
                    }
                    amdApi.ajax({ url: 'medias/playlists/' + m_type + '/' + id + '/members_delete', type: 'post', json: JSON.stringify(json) }, function() {
                        $deletModal.find('h5').html("移除成功！");
                        $deletModal.find('.btn').hide();
                        setTimeout(function() {
                            $deletModal.modal('hide');
                        }, 500);
                        getData.myInfoAjax(id, m_type);
                    })
                })
                .appendTo('body').modal();
            $('#deleteMassage').find('h5').html("你确定要从该栏目移除素材吗？");
        }
    })