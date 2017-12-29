define(["jquery", "text!tpls/camera/cameraManagementBatchAll.html", 'artTemplate', 'common/amdApi', 'datetime'],
    function($, cameraManagementBatchAllTpl, art, amdApi) {
        return function(res) {
            // console.log(res)
            $('.dropdown-menu').remove();
            $('#bactchAll').remove();
            var cameraManagementBatchAll = art.render(cameraManagementBatchAllTpl, res.result);
            var $cameraManagementBatchAll = $(cameraManagementBatchAll)
                .on('submit', 'form', function(e) {
                    e.preventDefault();
                    var factory_id = parseInt($('#bactchAll .factory_id option:selected').val());
                    var project_id = parseInt($('#bactchAll .project_id option:selected').val());
                    var date = $('.date').val();
                    var amount = parseInt($('.amount').val());
                    var json = {
                        "factory_id": factory_id,
                        "project_id": project_id,
                        "date": date,
                        "amount": amount
                    }
                    if (!json || !factory_id || !project_id || !$.trim(date + '') || amount <= 0 || !amount) {
                        alert("请完成信息后提交！");
                        return;
                    }
                    amdApi.ajax({ url: 'productions/cameras/add', type: 'post', json: JSON.stringify(json) }, function(res) {
                        $('.cameraManagement').trigger('click');
                        $cameraManagementBatchAll.modal('hide');
                    })
                })
                .appendTo("body").modal();
            // 初始化日期控件
            $cameraManagementBatchAll.find('.kandao-date').datetimepicker({
                format: 'yyyy-mm-dd', //格式化日期格式
                language: "zh-CN", //选择语言，需要引入语言包
                // daysOfWeekDisabled: [1, 2], //指定周几不能用
                autoclose: true, //选完一个日期之后就会自动隐藏日期框
                minView: "month",
                todayBtn: true,
                todayHighlight: true //当选择其他日期的时候，高亮今天的日期
            });
        };
    });