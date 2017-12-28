define(['jquery', 'common/amdApi', 'systemUserManagement/getData', 'text!tpls/deletModal.html'],
    function($, amdApi, getData, deletModalTpl) {
        return function(id, _this) {
            id = parseInt(id);
            $('#deleteMassage').remove();
            $deletModal = $(deletModalTpl)
                .on('click', '.btn-comfirm', function() {
                    amdApi.ajax({ url: "backend/users/" + id + "/password_reset", type: 'post' }, function() {
                        $deletModal.find('h5').html("重置成功！");
                        $deletModal.find('.btn').hide();
                        setTimeout(function() {
                            $deletModal.modal('hide');
                        }, 1000);
                    })
                })
                .appendTo('body').modal();
            $('#deleteMassage').find('h5').html("你确定要重置密码吗？<br/><br/>重置后新密码将发送至该用户邮箱");
        }
    })