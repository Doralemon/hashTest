define(['jquery', 'text!tpls/systemBackend/rolesManagement.html', 'artTemplate', 'common/amdApi',
        'systemRolesManagement/roleAdd', 'systemRolesManagement/roleEdit',
        'systemRolesManagement/delete', 'systemRolesManagement/getData', 'common/getPage',
        "bootstrap", "page"
    ],
    function($, rolesManagementTpl, art, amdApi, roleAdd, roleEdit, deleteById, getData, getPage) {
        return function(rolesManagementFlag) {
            var obj = getPage($('.kandao-systemRoles'), 10, rolesManagementFlag.flag1);
            if ($('.kandao-systemRoles table tbody tr').length == 1 && !rolesManagementFlag.flag2) {
                obj.json.page = obj.json.page - 1 || 1;
            }
            amdApi.ajax({ url: 'backend/permissions/list', type: 'get' }, function(resRoles) {
                // console.log(resRoles)
                var rolesManagement = art.render(rolesManagementTpl, {});
                var $rolesManagement = $(rolesManagement)
                    .on('click', '.newAdd', function() { //新增角色
                        rolesManagementFlag.flag1 = false;
                        roleAdd(resRoles);
                    })
                    .on('click', '.btnDelete', function() { //删除角色
                        rolesManagementFlag.flag2 = false;
                        var id = $(this).parents('tr').attr('id');
                        deleteById(id);
                    })
                    .on('click', '.btnEdit', function() { //编辑角色
                        var id = $(this).parents('tr').attr('id');
                        id = parseInt(id);
                        roleEdit(id, "backend/permissions/roles/" + id + "/change");
                    })
                    .on('click', '.btnCopy', function() { //复制角色
                        var id = $(this).parents('tr').attr('id');
                        id = parseInt(id);
                        roleEdit(id, "backend/permissions/roles/add", "-副本");
                    });
                rolesManagementFlag.flag1 = true;
                rolesManagementFlag.flag2 = true;
                $(".kandao-contentBody").html($rolesManagement);
                getData.myAjax(obj.json); //渲染系统角色列表
                $('.breadcrumb li').eq(0).on('click', function() { //回首页
                    $('.home').trigger('click');
                })
            });
        }
    })