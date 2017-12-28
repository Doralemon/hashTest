define(["jquery", "text!tpls/systemBackend/rolesAdd.html", 'artTemplate', 'systemRolesManagement/rolesOpation',
        "common/amdApi", 'systemRolesManagement/getData', 'bootstrap'
    ],
    function($, rolesAddTpl, art, rolesOpation, amdApi, getData) {
        return function(resRoles) {
            $('#systemRoleAdd').remove();
            var rolesAdd = art.render(rolesAddTpl, resRoles.result);
            var permissions = [];
            $rolesAdd = $(rolesAdd)
                .appendTo("body").modal();
            // 权限选择
            rolesOpation.kandaoRoles('#systemRoleAdd .ptionalRoles', '#systemRoleAdd .selectedPermissions', '#systemRoleAdd .selectAll', '#systemRoleAdd .delAll', '#systemRoleAdd .rolesipt');
            // var opts = $('.selectedPermissions select option');

            $rolesAdd.on('submit', 'form', function(e) {
                e.preventDefault();
                var name = $('#systemRoleAdd input[name="name"]').val();
                var description = $('#systemRoleAdd textarea[name="description"]').val();
                permissions = rolesOpation.getRolesId('#systemRoleAdd .selectedPermissions'); //获取permissions的函数
                if (!$.trim(name) || !$.trim(description) || !permissions) {
                    alert('请确认角色名称描述及权限都添加完成！');
                    return;
                }
                var json = {
                    "name": name,
                    "description": description,
                    "permissions": permissions
                };
                // console.log(json)
                amdApi.ajax({ url: "backend/permissions/roles/add", type: "post", json: JSON.stringify(json) }, function() {
                    $rolesAdd.modal('hide');
                    $('.rolesManagement').trigger('click');; //渲染系统角色列表
                })
            })
        };
    });