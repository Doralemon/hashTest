define(["jquery", "text!tpls/userBaseInfo.html", 'artTemplate', 'common/amdApi', 'bootstrap'],
    function($, userBaseInfoTpl, art, amdApi) {
        return function() {
            var userBaseInfo = art.render(userBaseInfoTpl, {});
            var $userBaseInfo = $(userBaseInfo)
                .on('click', '.btnChangePass', function() {
                    $('.changePass').trigger('click');
                })
                .on('click', '.btnBaseInfo', function() {
                    $('.userBaseInfo').trigger('click');
                })
            $(".kandao-contentBody").html($userBaseInfo);
            $('.personCenterInfo .personNav').text('修改密码');
            var str = '<div class="personInfo personPass">' +
                '<form>' +
                '<div class="form-group">' +
                '<label>旧密码</label>' +
                '<input type="text" class="form-control" placeholder="密码" name="old_password"><span class="passCorrate glyphicon glyphicon-ok-sign"></span><span class="passError glyphicon glyphicon-remove-sign">密码错误</span>' +
                '</div>' +
                '<div class="form-group">' +
                '<label>新密码</label>' +
                '<input type="text" class="form-control" placeholder="新密码" name="new_password"><span class="newPass glyphicon glyphicon-ok-sign"></span><span class="passLenght glyphicon glyphicon-remove-sign">密码位数应该不低于8位且包含数字和字母</span>' +
                '</div>' +
                '<div class="form-group">' +
                '<label>确认密码</label>' +
                '<input type="text" class="form-control" placeholder="确认密码" name="comfirm_password"><span class="confirmPass glyphicon glyphicon-ok-sign"></span><span class="withNew glyphicon glyphicon-remove-sign">必须与新密码一致</span>' +
                '</div>' +
                '<div class="form-group text-center">' +
                '<button class="btn btn-default btnSave">确认</button>' +
                '<button class="btn btn-default btnCancel">取消</button>' +
                '</div>' +
                '</form>' +
                '</div>'
            $('.personCenterInfo').find('.panel-body').html(str);
            var passReg = /^(?!(?:\d+|[a-zA-Z]+)$)[\da-zA-Z]{8,}$/;
            var old_password, new_password, comfirm_password;
            $('.personPass input[name="new_password"]').on('blur', function() {
                new_password = $(this).val();
                if (!passReg.test(new_password)) {
                    $('.newPass').hide();
                    $('.passLenght').show();
                } else {
                    $('.passLenght').hide();
                    $('.newPass').show();
                }
                $('.personPass input[name="comfirm_password"]').trigger('blur');
            })
            $('.personPass input[name="comfirm_password"]').on('blur', function() {
                comfirm_password = $(this).val();
                if (!$.trim(new_password)) {
                    $('.withNew').hide();
                    $('.confirmPass').hide();
                } else if (comfirm_password !== new_password) {
                    $('.confirmPass').hide();
                    $('.withNew').show();
                } else {
                    $('.withNew').hide();
                    $('.confirmPass').show();
                }
            })
            $('.personCenterInfo .personPass').on("click", '.btnSave', function(e) {
                e.preventDefault();
                old_password = $('.personPass input[name="old_password"]').val();
                new_password = $('.personPass input[name="new_password"]').val();
                comfirm_password = $('.personPass input[name="comfirm_password"]').val();
                if (!$.trim(old_password) || !$.trim(new_password) || !$.trim(comfirm_password)) {
                    alert('请输入完整信息！');
                    return;
                }
                if (comfirm_password !== new_password) {
                    return;
                }
                if (!passReg.test(new_password)) {
                    return;
                }
                var json = {
                    "old_password": old_password,
                    "new_password": new_password,
                    "comfirm_password": comfirm_password
                }
                $.ajax({
                    url: amdApi.getUrl() + "users/password_change",
                    type: "post",
                    data: JSON.stringify(json),
                    success: function(res) {
                        // console.log(res)
                        if (res.code == "10002" || res.code == "10003" || res.code == "10004" || res.code == "10005") {
                            setTimeout(function() {
                                location.href = 'login.html';
                            }, 1500);
                        } else if (res.code == '10107') {
                            $('.passCorrate').hide();
                            $('.passError').show();
                        } else if (res.code == 0) {
                            $('.passCorrate').show();
                            $('.passError').hide();
                            alert("密码修改成功！");
                            setTimeout(function() {
                                location.href = 'login.html';
                            }, 1500);
                        } else {
                            switch (res.code) {
                                case 10109:
                                    alert("新密码与旧密码不能一样!");
                                    break;
                                case 10108:
                                    alert("密码格式错误!");
                                    break;
                            }
                            $('.passError').hide();
                            $('.passCorrate').show();
                        }
                    }
                })
            })
        };
    });