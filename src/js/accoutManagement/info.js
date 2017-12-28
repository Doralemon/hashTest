define(['jquery', 'text!tpls/account/accoutManagementInfo.html', 'artTemplate', 'common/amdApi', 'datetime'],
    function($, accoutManagementInfoTpl, art, amdApi) {
        return function(id) {
            $('.dropdown-menu').remove();
            id = parseInt(id);
            // console.log(id)
            // 列表渲染
            amdApi.ajax({ url: "customers/" + id, type: "get" }, function(res) {
                var accoutManagementInfo = art.render(accoutManagementInfoTpl, res.result);
                var $accoutManagementInfo = $(accoutManagementInfo)
                    .on('click', '.btn-cancel,.account', function() {
                        $('.accoutManagement').trigger('click');
                    });
                $accoutManagementInfo.find('.kandao-date').datetimepicker({
                    format: 'yyyy-mm-dd', //格式化日期格式
                    language: "zh-CN", //选择语言，需要引入语言包
                    // daysOfWeekDisabled: [1, 2], //指定周几不能用
                    autoclose: true, //选完一个日期之后就会自动隐藏日期框
                    minView: "month",
                    todayBtn: true,
                    todayHighlight: true //当选择其他日期的时候，高亮今天的日期
                });
                $(".kandao-contentBody").html($accoutManagementInfo);
                // 选择语言
                var language = res.result.language;
                var languageObj = $('#language option');
                getSelected(languageObj, language);

                function getSelected(obj, selObj) {
                    for (i = 0; i < obj.length; i++) {
                        if (obj[i].value == selObj)
                            obj[i].selected = true;
                    }
                }
                var add_sn = [],
                    del_sn = [];
                // sn pin码的框框
                $('.pinBox').on('click', 'span', function(e) {
                    var snId = $(this).parent().attr('sn-id');
                    del_sn.push(snId);
                    $(e.currentTarget.parentElement).hide();
                });
                // 添加sn pin码
                $accoutManagementInfo.on('click', '.btn-add', function(e) {
                    e.preventDefault();
                    var sn = $('#kandao-info input[name="sn"]').val();
                    var pin = $('#kandao-info input[name="pin"]').val();
                    var json = {
                        "sn": sn,
                        "pin": pin
                    };
                    amdApi.ajax({ url: "customers/" + id + "/cameras/add", type: "post", json: JSON.stringify(json) }, function(res) {
                        var flag = true;
                        add_sn.forEach(function(v, i) {
                            if (v == res.result.sn_id) {
                                alert('该相机已经绑定了该客户，不能重复绑定');
                                // alert(res.msg);
                                flag = false;
                                return;
                            }
                        });
                        if (!flag) {
                            return;
                        }
                        var str = '<div class="pinBox" sn-id="' + res.result.sn_id + '">' + sn + '&nbsp;' + pin +
                            '<span class="glyphicon glyphicon-remove-circle">' +
                            '</span>' +
                            '</div>';
                        $('.pinOptions').append(str);
                        add_sn.push(res.result.sn_id);
                        // console.log(add_sn);
                        $('.pinBox').on('click', 'span', function(e) {
                            // console.log(add_sn);
                            var snId = $(this).parent().attr('sn-id');
                            add_sn.forEach(function(v, i) {
                                    if (v == snId) {
                                        add_sn.splice(i, 1);
                                    }
                                    return false;
                                });
                                // console.log(add_sn);
                            $(e.currentTarget.parentElement).hide();
                        });
                    });
                });
                // 保存修改后客户的值
                $('.kandao-accout-top').on('click', '.btn-save', function(e) {
                    e.preventDefault();
                    $(this).attr('id', id);
                    var nowPage = $('.accoutList li').eq(1).attr('nowPage');
                    nowPage = parseInt(nowPage);
                    var email = $('#kandao-info input[name="email"]').val();
                    var name = $('#kandao-info input[name="name"]').val();
                    var language = $('#kandao-info select[name="language"]').val();
                    var company = $('#kandao-info input[name="company"]').val();
                    var address = $('#kandao-info input[name="address"]').val();
                    var phone = $('#kandao-info input[name="phone"]').val();
                    var finaltime = $('#kandao-info input[name="finaltime"]').val();
                    var licenseN = $('#kandao-info input[name="licenseN"]').val();
                    var enableofflinewatermark = $('#kandao-info input[name="enableofflinewatermark"]:checked').val();
                    var enableonlinewatermark = $('#kandao-info input[name="enableonlinewatermark"]:checked').val();
                    enableofflinewatermark = enableofflinewatermark == "1" ? true : false;
                    enableonlinewatermark = enableonlinewatermark == "1" ? true : false;
                    if (!$.trim(name + '') || !$.trim(company + '') || !$.trim(licenseN + '')) {
                        alert("请添加姓名/公司/设备数量信息后提交！");
                        return;
                    }
                    licenseN = parseInt(licenseN);
                    if (licenseN <= 0) {
                        alert("请添加正常的设备数量！");
                        return;
                    }
                    var json = {
                        "id": id,
                        "phone": phone,
                        "name": name,
                        "language": language,
                        "company": company,
                        "address": address,
                        "enableofflinewatermark": enableofflinewatermark,
                        "enableonlinewatermark": enableonlinewatermark,
                        "finaltime": finaltime,
                        "licenseN": licenseN,
                        "add_sn": add_sn.join(","),
                        "del_sn": del_sn.join(",")
                    };

                    // console.log(json)
                    amdApi.ajax({ url: "customers/" + id + "/change", type: "post", json: JSON.stringify(json) }, function(res) {
                        alert('保存成功！');
                        $('.accoutManagement').trigger('click');
                    });
                });
            });
        };
    });