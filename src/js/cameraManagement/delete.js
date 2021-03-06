define(['jquery', 'common/amdApi', 'text!tpls/deletModal.html'],
    function($, amdApi, deletModalTpl) {
        return function(id) {
             id = parseInt(id);
            $('#deleteMassage').remove();
            $deletModal = $(deletModalTpl)
                .on('click', '.btn-comfirm', function() {
                    amdApi.ajax({ url: "productions/cameras/" + id + "/delete", type: 'post' }, function() {
                        $deletModal.modal('hide');
                        $('.cameraManagement').trigger('click');
                    })
                })
                .appendTo('body').modal();
        }
    })