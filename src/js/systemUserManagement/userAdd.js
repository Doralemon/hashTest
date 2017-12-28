define(["jquery", "text!tpls/systemBackend/systemUserAdd.html", 'artTemplate', "common/amdApi",
        'systemUserManagement/getData', 'bootstrap'
    ],
    function($, systemUserAddTpl, art, amdApi, getData) {
        return function() {
            $('#systemUserAdd').remove();
            var has_roles = [];
            amdApi.ajax({ url: "backend/permissions/roles/names", type: "get" }, function(res) {
                var systemUserAdd = art.render(systemUserAddTpl, res.result);
                var $systemUserAdd = $(systemUserAdd)
                    .on('click', '.addRoles', function(e) { // 添加角色前端验证
                        e.preventDefault();
                        var roleId = $('#systemUserAdd .roleManament select option:selected').attr("name");
                        roleId = parseInt(roleId);
                        var roleText = $('#systemUserAdd .roleManament select').val();
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
                        $systemUserAdd.find('.selectedRoles').append(str);
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
                    .on('click', '.userAdd', function(e) { // 新建系统用户
                        e.preventDefault();
                        var name = $('#systemUserAdd input[name="name"]').val();
                        var email = $('#systemUserAdd input[name="email"]').val();
                        var phone = $('#systemUserAdd input[name="phone"]').val();
                        var regPhone = /^[0-9]*$/;
                        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                        if (!filter.test(email)) {
                            alert('您输入的电子邮箱格式不正确！');
                            return;
                        }
                        if (!regPhone.test(phone)) {
                            alert('手机号必须为纯数字！');
                            return;
                        }
                        if (!$.trim(name) || !$.trim(email) || !$.trim(phone) || !has_roles) {
                            alert("请输入所有信息再提交！");
                            return false;
                        }
                        var json = {
                            "name": name,
                            "email": email,
                            "phone": phone,
                            "has_roles": has_roles
                        };
                        amdApi.ajax({ url: "backend/users/add", type: "post", json: JSON.stringify(json) }, function(res) {
                            $systemUserAdd.modal('hide');
                            $('.systemUserManagement').trigger('click');
                        });
                    })
                    .appendTo("body").modal();
            })
        };
    });