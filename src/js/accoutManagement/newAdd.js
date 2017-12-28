define(['jquery', 'text!tpls/account/accoutManagementAdd.html', 'artTemplate', "common/amdApi"],
    function($, accoutManagementAddTpl, art, amdApi) {
        return function() {
            $('.dropdown-menu').remove();
            $('#accoutAdd').remove();
            var $accoutManagementAdd = $(accoutManagementAddTpl)
                .on('submit', 'form', function(e) {
                    e.preventDefault();
                    var email = $('#accoutAdd input[name="email"]').val();
                    var emailComfirm = $('#accoutAdd input[name="emailComfirm"]').val();
                    var name = $('#accoutAdd input[name="name"]').val();
                    var language = $('#accoutAdd select[name="language"]').val();
                    var company = $('#accoutAdd input[name="company"]').val();
                    var address = $('#accoutAdd input[name="address"]').val();
                    var phone = $('#accoutAdd input[name="phone"]').val();
                    if (email != emailComfirm) {
                        alert("请确认邮箱和邮箱保持一致！");
                        return;
                    }
                    if (!$.trim(email) || !$.trim(emailComfirm) || !$.trim(name) || !$.trim(company)) {
                        alert("请输入所有必填信息！");
                        return;
                    }
                    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                    if (!filter.test(email)) {
                        alert('您输入的电子邮箱格式不正确！');
                        return;
                    }
                    var json = {
                        "email": email,
                        "name": name,
                        "language": language,
                        "company": company,
                        "address": address,
                        "phone": phone
                    }
                   json = JSON.stringify(json);
                    // console.log(json)
                    amdApi.ajax({ url: "customers/add", type: "post", json: json }, function() {
                        $accoutManagementAdd.modal('hide');
                        $('.accoutManagement').trigger('click');
                    })
                })
                .appendTo("body").modal();
        }
    })