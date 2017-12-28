define(['jquery', 'common/amdApi', 'text!tpls/deletModal.html'],
    function($, amdApi, deletModalTpl) {
        return function(id) {
            var id = parseInt(id);
            $('#deleteMassage').remove();
            $deletModal = $(deletModalTpl)
                .on('click', '.btn-comfirm', function() {
                    amdApi.ajax({ url: "productions/factory/" + id + "/delete", type: 'post' }, function() {
                        $deletModal.modal('hide');
                        $('.factoryManagement').trigger('click');
                    })
                })
                .appendTo('body').modal();
        }
    })