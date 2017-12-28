define(['jquery', 'common/amdApi', 'text!tpls/deletModal.html', 'systemRolesManagement/getData', 'common/getPage'],
    function($, amdApi, deletModalTpl, getData, getPage) {
        return function(id) {
            var id = parseInt(id);
            $('#deleteMassage').remove();
            $deletModal = $(deletModalTpl)
                .on('click', '.btn-comfirm', function() {
                    amdApi.ajax({ url: "backend/permissions/roles/" + id + "/delete", type: 'post' }, function() {
                        $deletModal.modal('hide');
                        $('.rolesManagement').trigger('click');
                    })
                })
                .appendTo('body').modal();
            $('#deleteMassage').find('h5').html("你确定要删除该系统角色吗？");
        }
    })