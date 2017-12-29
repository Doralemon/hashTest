define(['jquery', 'text!tpls/factory/factoryManagementEdit.html', 'artTemplate', 'common/amdApi'],
    function($, factoryManagementEditTpl, art, amdApi) {
        return function(id) {
            $('#factoryEdit').remove();
            var id = parseInt(id);
            amdApi.ajax({
                url: "productions/factory/" + id,
                type: 'get',
            }, function(res) {
                var factoryManagementEdit = art.render(factoryManagementEditTpl, res.result)
                var $factoryManagementEdit = $(factoryManagementEdit)
                    .on('submit', 'form', function() {
                        var no = $('#factoryEdit input[name = "no"]').val();
                        var name = $('#factoryEdit input[name = "name"]').val();
                        var description = $('#factoryEdit textarea[name = "description"]').val();
                        var json = {
                            "no": no,
                            "name": name,
                            "description": description
                        }
                        amdApi.ajax({ url: "productions/factory/" + id + "/change", type: 'post', json: JSON.stringify(json) }, function(res) {
                            $('.factoryManagement').trigger('click');
                            $factoryManagementEdit.modal('hide');
                        })
                        return false;
                    })
                    .appendTo("body").modal();
            })
        }
    })