define(['jquery', 'artTemplate', 'common/amdApi', 'mediaManagement/getData'],
    function($, art, amdApi, getData) {
        return function($mediaLibrary) {
            $mediaLibrary.find('.cloumnListAdd').hide();
            $mediaLibrary.find('.cloumnListremove').show();
            setTimeout(function() { //定时让盒子消失
                $mediaLibrary.find('.cloumnListremove').hide();
            }, 5000);
            var data = getData.getSelMedia();
            $mediaLibrary.find('.cloumnListremove .sBox').unbind('click');
            $mediaLibrary.find('.cloumnListremove .sBox').on('click', function() {
                $mediaLibrary.find('.cloumnListremove').hide();
                var id = $(this).attr('id');
                amdApi.ajax({ url: 'medias/columns/' + id + '/medias/bluk_delete', json: JSON.stringify(data), type: 'post' }, function() {
                    alert('移除成功！');
                    $('.mediaLibrary').click();
                    $('.modal-backdrop').hide();
                })
                return false;
            })
        }
    })