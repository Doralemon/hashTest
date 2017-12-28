define(["jquery", "text!tpls/systemBackend/rolesEdit.html", 'artTemplate',
        'systemRolesManagement/rolesOpation', "common/amdApi", 'systemRolesManagement/getData', 'common/getPage',
        'bootstrap'
    ],
    function($, roleEditTpl, art, rolesOpation, amdApi, getData, getPage) {
        return function(id, url, text) {
            $('#systemRoleEdit').remove();
            amdApi.ajax({ url: "backend/permissions/roles/" + id, type: "get" }, function(res) {
                // console.log(res);
                var has_permissions = res.result.has_permissions; //已选权限
                var permissions = res.result.permissions; //可选权限
                // if (has_permissions.length > 0) {
                //     for (var i = 0; i < permissions.length; i++) {
                //         for (var j = 0; j < has_permissions.length; j++) {
                //             if (permissions[i].id == has_permissions[j].id) {
                //                 permissions.splice(i, 1);
                //                 i--;
                //                 break;
                //             }
                //         }
                //     }
                // }
                var a = has_permissions.concat(permissions);
                var permissionsNew = [];
                for (var i = 0; i < a.length; i++) {
                    if ((JSON.stringify(a).split(JSON.stringify(a[i])).length) > 2) {

                    } else {
                        permissionsNew.push(a[i]);
                    }
                }
                res.result.permissions = permissionsNew;
                var roleEdit = art.render(roleEditTpl, res.result);
                var permissionsId = [];
                var opts = $('.selectedPermissions select option');
                $roleEdit = $(roleEdit).appendTo("body").modal();
                if (text) {
                    $('#systemRoleEdit input[name="name"]').val($('#systemRoleEdit input[name="name"]').val() + text);
                }
                rolesOpation.kandaoRoles('#systemRoleEdit .ptionalRoles', '#systemRoleEdit .selectedPermissions', '#systemRoleEdit .selectAll', '#systemRoleEdit .delAll', '#systemRoleEdit .rolesipt'); //权限选择
                $roleEdit.on('submit', 'form', function(e) { //保存编辑权限
                    e.preventDefault();
                    var name = $('#systemRoleEdit input[name="name"]').val();
                    var description = $('#systemRoleEdit textarea[name="description"]').val();
                    permissionsId = rolesOpation.getRolesId('#systemRoleEdit .selectedPermissions'); //获取permissions的函数
                    if (!$.trim(name) || !$.trim(description) || !permissions) {
                        alert('请确认角色名称描述及权限都添加完成！');
                        return;
                    }
                    if (url == "backend/permissions/roles/" + id + "/change") {
                        var json = {
                            "name": name,
                            "description": description,
                            "permissions": permissionsId
                        };
                    }
                    var json = {
                        "id": id,
                        "name": name,
                        "description": description,
                        "permissions": permissionsId
                    };
                    // console.log(json);
                    amdApi.ajax({ url: url, type: "post", json: JSON.stringify(json) }, function(res) {
                        $roleEdit.modal('hide');
                        $('.rolesManagement').trigger('click');
                    })
                })

            })

        };
    });