define(['jquery', 'text!tpls/systemBackend/systemUserManagement.html', 'artTemplate', 'common/amdApi',
        'systemUserManagement/userAdd', 'systemUserManagement/search', 'systemUserManagement/delete',
        'systemUserManagement/edit', 'systemUserManagement/userIce', 'systemUserManagement/resetPass',
        'systemUserManagement/getData', 'common/getPage', "bootstrap", "page"
    ],
    function($, systemUserManagementTpl, art, amdApi, userAdd, search, deleteById, edit,
        userIce, resetPass, getData, getPage) {
        return function(systemUserManagementFlag) {
            var obj = getPage($('.kandao-systemUser'), 10, systemUserManagementFlag.flag1);
            if ($('.kandao-systemUser table tbody tr').length == 1 && !systemUserManagementFlag.flag2) {
                obj.json.page = obj.json.page - 1 || 1;
            }
            var systemUserManagement = art.render(systemUserManagementTpl, {});
            var $systemUserManagement = $(systemUserManagement)
                .on('click', '.newAdd', function() { //新增用户
                    systemUserManagementFlag.flag1 = false;
                    userAdd();
                })
                .on('click', '.btnEdit', function() { //用户编辑
                    var id = $(this).parents('tr').attr('id');
                    edit(id);
                })
                .on('click', '.btnResetPass', function() { //重置密码
                    var id = $(this).parents('tr').attr('id');
                    var _this = this;
                    resetPass(id, _this);
                })
                .on('click', '.btnIce', function() { //冻结||激活
                    var id = $(this).parents('tr').attr('id');
                    var state = $(this).parents('tr').attr('state');
                    if (state == "0") {
                        state = "1"
                    } else if (state == "1") {
                        state = "0"
                    }
                    userIce(id, state);
                })
                .on('click', '.btnDelete', function() { //删除用户
                    systemUserManagementFlag.flag2 = false;
                    var id = $(this).parents('tr').attr('id');
                    deleteById(id);
                })
                .on('click', '.accoutSearch', function() { //搜索
                    search();
                })
                .on('keydown', 'input[name="q"]', function(e) {
                    if (e.keyCode == 13) {
                        e.preventDefault();
                        $systemUserManagement.find('.accoutSearch').trigger('click');
                    } else {
                        return;
                    }
                });
            $(".kandao-contentBody").html($systemUserManagement);
            getData.myAjax(obj.json);
            systemUserManagementFlag.flag1 = true;
            systemUserManagementFlag.flag2 = true;
            $('.breadcrumb li').eq(0).on('click', function() { //回首页
                $('.home').trigger('click');
            })
        }
    })