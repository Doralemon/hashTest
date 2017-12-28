define(['jquery', 'common/amdApi', 'mediaManagement/getData', 'text!tpls/deletModal.html'],
    function($, amdApi, getInfoData, deletModalTpl) {
        return function() {
            var data = [];
            $('#deleteMassage').remove();
            ($(".kandao-mediaManagement").find('.thumbnail input')).each(function(i, v) {
                    if ($(v).prop('checked') == true) {
                        var type = $(v).parents('.mediaBigBox').find('.resourceTpye').text();
                        var id = $(v).parents('.mediaBigBox').attr('id');
                        data[data.length] = { type: type, id: id };
                    }
                })
                // console.log(data);
            if (data.length < 1) {
                alert('先请选择您要删除的素材！');
                return false;
            } else {
                $deletModal = $(deletModalTpl)
                    .on('click', '.btn-comfirm', function() {
                        amdApi.ajax({ url: 'medias/bluk_delete', json: JSON.stringify(data), type: 'post' }, function(res) {
                            $deletModal.find('h5').html("删除成功！");
                            $deletModal.find('.btn').hide();
                            setTimeout(function() {
                                $deletModal.modal('hide');
                            }, 500);
                            window.location.reload(true); 
                            $('.modal-backdrop').hide();
                        })
                    })
                    .appendTo('body').modal();
                $('#deleteMassage').find('h5').html("你确定要删除吗？");
            }
        }
    })