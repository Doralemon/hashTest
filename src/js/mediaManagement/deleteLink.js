define(['jquery', 'common/amdApi', 'mediaManagement/getInfoData', 'text!tpls/deletModal.html', 'common/getPage'],
    function($, amdApi, getInfoData, deletModalTpl, getPage) {
        return function(media_id, link_id, resourceTpye) {
            // console.log(media_id + "======" + link_id, )
            $('#deleteMassage').remove();
            var obj = getPage($('.kandao-mediaLibraryInfo'));
            if ($('.kandao-mediaLibraryInfo table tbody tr').length == 1) {
                obj.json.page = obj.json.page - 1 || 1;
            }
            $deletModal = $(deletModalTpl)
                .on('click', '.btn-comfirm', function() {
                    amdApi.ajax({ url: 'medias/' + resourceTpye + '/' + media_id + '/link/' + link_id + '/delete', type: 'post' }, function() {
                        $deletModal.find('h5').html("删除成功！");
                        $deletModal.find('.btn').hide();
                        setTimeout(function() {
                            $deletModal.modal('hide');
                        }, 1000);
                        var json = {
                            limit: 10,
                        }
                        amdApi.ajax({ url: 'medias/' + resourceTpye + '/' + media_id + '/links', type: 'get', json:  obj.json }, function(resType) {
                            getInfoData.myAjax(obj.json, resType, resourceTpye, media_id); //渲染格式链接列表
                        })
                    })
                })
                .appendTo('body').modal();
            $('#deleteMassage').find('h5').html("你确定要删除该链接吗？");
        }
    })