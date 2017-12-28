define(["jquery", "text!tpls/cameraManagementEdit.html", 'artTemplate', 'common/amdApi', 'datetime'],
    function($, cameraManagementEditTpl, art, amdApi) {
        return function(id, fatherRes) {
            // console.log(fatherRes);
            $('#cameraEdit').remove();
             id = parseInt(id);
            amdApi.ajax({ url: "productions/cameras/" + id, type: 'get' }, function(res) {
                // console.log(res);
                state = res.result.state;
                // console.log(state)
                res.result.foctory = fatherRes.result.foctory;
                res.result.project = fatherRes.result.project;

                cameraManagementEdit = art.render(cameraManagementEditTpl, res.result);
                var $cameraManagementEdit = $(cameraManagementEdit)
                    .appendTo("body").modal();
                if (state == 2) {
                    $('#cameraEdit  input').prop("disabled", true);
                    // console.log($('#cameraEdit table input'))
                    $('#kandao-project').prop("disabled", true);
                    $('#kandao-factory').prop("disabled", true);
                    $('#cameraEdit .sn_date').prop("disabled", true);
                }
                var objState = $('#kandao-state option');
                getSelected(objState, state);
                // 设置selected选中
                function getSelected(obj, selObj) {
                    for (i = 0; i < obj.length; i++) {
                        if (obj[i].value == selObj)
                            obj[i].selected = true;
                    }
                }
                // 初始化日期控件
                $cameraManagementEdit.find('.kandao-date').datetimepicker({
                    format: 'yyyy-mm-dd', //格式化日期格式
                    language: "zh-CN", //选择语言，需要引入语言包
                    // daysOfWeekDisabled: [1, 2], //指定周几不能用
                    autoclose: true, //选完一个日期之后就会自动隐藏日期框
                    minView: "month",
                    todayBtn: true,
                    todayHighlight: true //当选择其他日期的时候，高亮今天的日期
                });
                $('.kandao-cameraEdit').on('submit', function() {
                    var factory_id = parseInt($('#cameraEdit select[name = "factory_id"]').val());
                    var project_id = parseInt($('#cameraEdit select[name = "project_id"]').val());
                    var state = parseInt($('#cameraEdit select[name = "state"]').val());
                    var sn_date = $('#cameraEdit input[name = "sn_date"]').val();
                    var flash1 = $('#cameraEdit input[name = "flash1"]').val();
                    var flash2 = $('#cameraEdit input[name = "flash2"]').val();
                    var flash3 = $('#cameraEdit input[name = "flash3"]').val();
                    var flash4 = $('#cameraEdit input[name = "flash4"]').val();
                    var flash5 = $('#cameraEdit input[name = "flash5"]').val();
                    var flash6 = $('#cameraEdit input[name = "flash6"]').val();
                    var blue_mac = $('#cameraEdit input[name = "blue_mac"]').val();
                    var json = {
                            "id": id,
                            "state": state,
                            "sn_date": sn_date,
                            "flash1": flash1,
                            "flash2": flash2,
                            "flash3": flash3,
                            "flash4": flash4,
                            "flash5": flash5,
                            "flash6": flash6,
                            "blue_mac": blue_mac,
                            "project_id": project_id,
                            "factory_id": factory_id
                        }
                        // console.log(json)
                    amdApi.ajax({ url: "productions/cameras/" + id + "/change", type: 'post', json: JSON.stringify(json) }, function(res) {
                        $cameraManagementEdit.modal('hide');
                        $('.cameraManagement').trigger('click');
                    })
                    return false;
                })
            })
        };
    });