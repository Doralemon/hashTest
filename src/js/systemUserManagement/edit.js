define(["jquery", "text!tpls/systemBackend/systemUserEdit.html", 'artTemplate', "common/amdApi",
        'systemUserManagement/getData', 'bootstrap'
    ],
    function($, systemUserEditTpl, art, amdApi, getData) {
        return function(id) {
            $('#systemUserEdit').remove();
            id = parseInt(id);
            var has_roles = [];
            amdApi.ajax({ url: "backend/users/" + id, type: "get" }, function(res) {
                // console.log(res)
                var rolesArr = res.result.has_roles;
                rolesArr.forEach(function(v, i) { //把已有的id先放进数组
                    has_roles.push(v.id);
                });
                var systemUserEdit = art.render(systemUserEditTpl, res.result);
                var $systemUserEdit = $(systemUserEdit)
                    .on('click', '.addRoles', function(e) { // 添加角色前端验证
                        e.preventDefault();
                        roleId = $('#systemUserEdit .roleManament select option:selected').attr("name");
                        roleId = parseInt(roleId);
                        var roleText = $('#systemUserEdit .roleManament select').val();
                        var flag = true;
                        has_roles.forEach(function(v, i) {
                            if (v == roleId) {
                                alert("此角色您已选择！");
                                flag = false;
                            }
                            return false;
                        })
                        if (!flag) {
                            return;
                        }
                        var str = '<div class="roleBox text-center" roleId="' + roleId + '">' + roleText +
                            '<span class="glyphicon glyphicon-remove-circle">' +
                            '</span>' +
                            '</div>';
                        $systemUserEdit.find('.selectedRoles').append(str);
                        has_roles.push(roleId);
                    })
                    .on('click', '.glyphicon', function() { //删除角色
                        var roleId = $(this).parent().attr('roleId');
                        roleId = parseInt(roleId);
                        $(this).parent().hide();
                        has_roles.forEach(function(v, i) {
                            if (v == roleId) {
                                has_roles.splice(i, 1);
                            }
                            return false;
                        })
                    })
                    .on('click', '.userAdd', function(e) { // 编辑系统用户
                        e.preventDefault();
                        var name = $('#systemUserEdit input[name="name"]').val();
                        var email = $('#systemUserEdit input[name="email"]').val();
                        var phone = $('#systemUserEdit input[name="phone"]').val();
                        var regPhone = /^[0-9]*$/;
                        if (!regPhone.test(phone)) {
                            alert('手机号必须为纯数字！');
                            return;
                        }
                        if (!$.trim(name) || !$.trim(email) || !$.trim(phone) || !has_roles) {
                            alert("请输入所有信息再提交！");
                            return false;
                        }
                        var json = {
                            "id": id,
                            "name": name,
                            "email": email,
                            "phone": phone,
                            "has_roles": has_roles
                        };
                        // console.log(has_roles);
                        amdApi.ajax({ url: "backend/users/" + id + "/change", type: "post", json: JSON.stringify(json) }, function(res) {
                            $systemUserEdit.modal('hide');
                            $('.systemUserManagement').trigger('click');
                        });
                    })
                    .appendTo("body").modal();
            })
        };
    });