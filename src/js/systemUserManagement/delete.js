define(['jquery', 'common/amdApi', 'text!tpls/deletModal.html'],
    function($, amdApi, deletModalTpl) {
        return function(id) {
           id = parseInt(id);
            $('#deleteMassage').remove();
            $deletModal = $(deletModalTpl)
                .on('click', '.btn-comfirm', function() {
                    amdApi.ajax({ url: "backend/users/" + id + "/delete", type: 'post' }, function() {
                        $deletModal.modal('hide');
                        $('.systemUserManagement').trigger('click');
                    })
                })
                .appendTo('body').modal();
            $('#deleteMassage').find('h5').html("你确定要删除该用户吗？");
        }
    })