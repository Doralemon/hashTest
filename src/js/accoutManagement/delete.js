define(['jquery', 'common/amdApi', 'text!tpls/deletModal.html'],
    function($, amdApi, deletModalTpl) {
        return function(id) {
            id = parseInt(id);
            $('#deleteMassage').remove();
            $deletModal = $(deletModalTpl)
                .on('click', '.btn-comfirm', function() {
                    amdApi.ajax({ url: "customers/" + id + "/delete", type: 'post' }, function() {
                        $deletModal.modal('hide');
                        $('.accoutManagement').trigger('click');
                    });
                })
                .appendTo('body').modal();
        };
    });