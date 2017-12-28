define(["jquery", "text!tpls/userBaseInfo.html", 'artTemplate', 'common/amdApi', 'bootstrap'],
    function($, userBaseInfoTpl, art, amdApi) {
        return function() {
            amdApi.ajax({ url: 'users/information', type: 'get' }, function(res) {
                var userBaseInfo = art.render(userBaseInfoTpl, res.result);
                var $userBaseInfo = $(userBaseInfo)
                    .on('click', '.btnBaseInfo', function() {
                        $('.userBaseInfo').trigger('click');
                    })
                    .on('click', '.btnChangePass', function() {
                        $('.changePass').trigger('click');
                    })
                    .on('click', '.btnSave', function(e) {
                        e.preventDefault();
                        var name = $('.personFile input[name="name"]').val();
                        var phone = $('.personFile input[name="phone"]').val();
                        var regPhone = /^[0-9]*$/;
                        if (!regPhone.test(phone)) {
                            alert('手机号必须为纯数字！');
                            return;
                        }
                        if (!$.trim(name) || !$.trim(phone)) {
                            alert('请输入姓名或者手机号！');
                            return;
                        }
                        var json = {
                            "name": name,
                            "phone": phone
                        }
                        amdApi.ajax({ url: 'users/information', type: 'post', json: JSON.stringify(json) }, function(res) {
                            // $('.userBaseInfo').trigger('click');
                            alert('修改成功！')
                        })
                    })
                $(".kandao-contentBody").html($userBaseInfo);
            })
        };
    });