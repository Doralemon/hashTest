define(['jquery', 'text!tpls/projectManagementAdd.html', 'artTemplate', 'common/amdApi'],
    function($, projectManagementAddTpl, art, amdApi) {
        return function() {
            $('#projectAdd').remove();
            var $projectManagementAdd = $(projectManagementAddTpl)
                .on('submit', 'form', function(e) {
                    e.preventDefault();
                    var no = $('#projectAdd input[name = "no"]').val();
                    var name = $('#projectAdd input[name = "name"]').val();
                    var description = $('#projectAdd textarea[name = "description"]').val();
                    var json = {
                        "no": no,
                        "name": name,
                        "description": description
                    }
                    if (!json || !$.trim(no + '') || !$.trim(name + '') || !$.trim(description + '')) {
                        alert("请完成所有信息后提交！");
                        return;
                    }
                    amdApi.ajax({ url: "productions/projects/add", type: 'post', json: JSON.stringify(json) }, function() {
                        $('.projectManagement').trigger('click');
                        $projectManagementAdd.modal('hide');
                    })
                })
                .appendTo("body").modal();
        }
    })