define(['jquery', 'text!tpls/project/projectManagementEdit.html', 'artTemplate', 'common/amdApi'],
    function($, projectManagementEditTpl, art, amdApi) {
        return function(id) {
            $('#projectEdit').remove();
            var id = parseInt(id);
            amdApi.ajax({ url: "productions/projects/" + id, type: 'get' }, function(res) {
                var projectManagementEdit = art.render(projectManagementEditTpl, res.result)
                var $projectManagementEdit = $(projectManagementEdit)
                    .on('submit', 'form', function() {
                        var no = $('#projectEdit input[name = "no"]').val();
                        var name = $('#projectEdit input[name = "name"]').val();
                        var description = $('#projectEdit textarea[name = "description"]').val();
                        var json = {
                            "no": no,
                            "name": name,
                            "description": description
                        }
                        amdApi.ajax({ url: "productions/projects/" + id + "/change", type: 'post', json: JSON.stringify(json) }, function(res) {
                            $('.projectManagement').trigger('click');
                            $projectManagementEdit.modal('hide');
                        })
                        return false;
                    })
                    .appendTo("body").modal();
            })
        }
    })