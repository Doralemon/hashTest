define(['jquery', 'text!tpls/factoryManagementAdd.html', 'artTemplate', "common/amdApi"],
    function($, factoryManagementAddTpl, art, amdApi) {
        return function() {
            $('#factoryAdd').remove();
            var $factoryManagementAdd = $(factoryManagementAddTpl)
                .on('submit', 'form', function(e) {
                    e.preventDefault();
                    var no = $('#factoryAdd input[name = "no"]').val();
                    var name = $('#factoryAdd input[name = "name"]').val();
                    var description = $('#factoryAdd textarea[name = "description"]').val();
                    var json = {
                        "no": no,
                        "name": name,
                        "description": description
                    }
                    if (!$.trim(no + '') || !$.trim(name + '') || !$.trim(description + '')) {
                        alert("请填写所有数据再提交！");
                        return;
                    }
                    // console.log(json);
                    amdApi.ajax({ url: "productions/factory/add", type: 'post', json: JSON.stringify(json) }, function(res) {
                        $factoryManagementAdd.modal('hide');
                        $('.factoryManagement').trigger('click');
                    })
                    return false;
                })
                .appendTo("body").modal();
        }
    })