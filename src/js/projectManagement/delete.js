define(['jquery', 'common/amdApi', 'text!tpls/deletModal.html'],
    function($, amdApi, deletModalTpl) {
        return function(id) {
            var id = parseInt(id);
            $('#deleteMassage').remove();
            $deletModal = $(deletModalTpl)
                .on('click', '.btn-comfirm', function() {
                    amdApi.ajax({ url: "productions/projects/" + id + "/delete", type: 'post' }, function() {
                        $deletModal.modal('hide');
                        $('.projectManagement').trigger('click');
                    })
                })
                .appendTo('body').modal();
        }
    })