define(['jquery', 'artTemplate', 'common/amdApi', 'text!tpls/deletModal.html',
        "bootstrap", "page"
    ],
    function($, art, amdApi, deletModalTpl) {
        return function(id) {
            $('#deleteMassage').remove();
            $deletModal = $(deletModalTpl)
                .on('click', '.btn-comfirm', function() {
                    amdApi.ajax({ url: 'medias/columns/' + id + '/delete', type: 'post' }, function() {
                        $deletModal.find('h5').html("删除成功！");
                        $deletModal.find('.btn').hide();
                        setTimeout(function() {
                            $deletModal.modal('hide');
                        }, 300);
                        setTimeout(function() {
                            $('#cloumnManagement').modal('hide');
                            $('.modal-backdrop').hide();
                        }, 500);
                        $('.mediaLibrary').click();
                    })
                })
                .appendTo('body').modal();
            $('#deleteMassage').find('h5').html("你确定要删除该栏目吗？");
        }
    })