define(['jquery', 'artTemplate', 'common/amdApi'],
    function($, art, amdApi) {
        return function(resourceTpye, media_id, before_column, after_column, before_tag, after_tag) {
            var name = $('.kandao-mediaLibraryInfo input[name="name"]').val();
            var name_en = $('.kandao-mediaLibraryInfo input[name="name_en"]').val();
            var description = $('.kandao-mediaLibraryInfo textarea[name="description"]').val();
            var description_en = $('.kandao-mediaLibraryInfo textarea[name="description_en"]').val();
            if (!$.trim(name) || !$.trim(description)) {
                alert('请输入名称和描述信息！');
                return;
            }
            var json = {
                    "name": name,
                    "name_en": name_en,
                    "description": description,
                    "description_en": description_en,
                    "before_column": before_column,
                    "after_column": after_column,
                    "before_tag": before_tag,
                    "after_tag": after_tag
                }
                // console.log(json)
            amdApi.ajax({ url: 'medias/' + resourceTpye + '/' + media_id + '/change', type: 'post', json: JSON.stringify(json) }, function(res) {
                alert('保存成功！');
                var url = sessionStorage.getItem("mediahashUrl");
                window.location.replace(url);
                window.location.reload(true);
                var page = sessionStorage.getItem("page");
                sessionStorage.setItem("page", page);
                $('.modal-backdrop').hide();
            })
        }
    })