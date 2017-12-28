define(['jquery', 'common/amdApi', 'text!tpls/deletModal.html'],
    function($, amdApi, deletModalTpl) {
        return function(cameraIds) {
            var data = JSON.stringify({ 'ids': cameraIds });
            $('#deleteMassage').remove();
            $deletModal = $(deletModalTpl)
                .on('click', '.btn-comfirm', function() {
                    amdApi.ajax({ url: "productions/cameras/delete", type: 'post', json: data }, function(res) {
                        $deletModal.modal('hide');
                        $('.cameraManagement').trigger('click');
                    })
                })
                .appendTo('body').modal();

        }
    })