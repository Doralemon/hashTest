define(['jquery', 'artTemplate', 'common/amdApi', 'mediaManagement/getData'],
    function($, art, amdApi, getData) {
        return function($mediaLibrary) {
            $mediaLibrary.find('.cloumnListremove').hide();
            $mediaLibrary.find('.cloumnListAdd').show();
            setTimeout(function() { //5秒没操作就隐藏盒子
                $mediaLibrary.find('.cloumnListAdd').hide();
            }, 4000);
            var data = getData.getSelMedia();
            $mediaLibrary.find('.cloumnListAdd .sBox').unbind('click');
            $mediaLibrary.find('.cloumnListAdd .sBox').on('click', function() {
                var text =$(this).text();
                $mediaLibrary.find('.cloumnListAdd').hide();
                var id = $(this).attr('id');
                amdApi.ajax({ url: 'medias/columns/' + id + '/medias/bluk_add', json: JSON.stringify(data), type: 'post' }, function() {
                    alert('成功添加至栏目:'+text+'!');
                    $('.mediaLibrary').click();
                    $('.modal-backdrop').hide();
                })
                return false;
            })
        }
    })