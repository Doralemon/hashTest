define(['jquery', 'artTemplate', 'common/amdApi'],
    function($, art, amdApi) {
        return function(id) {
            var name = $('#cloumnManagement input[name="name"]').val();
            var name_en = $('#cloumnManagement input[name="name_en"]').val();
            var description = $('#cloumnManagement textarea[name="description"]').val();
            var description_en = $('#cloumnManagement textarea[name="description_en"]').val();
            var json = {
                "name": name,
                "name_en": name_en,
                "description": description,
                "description_en": description_en
            }
            amdApi.ajax({ url: 'medias/columns/' + id + '/change', type: 'post', json: JSON.stringify(json) }, function() {
                $('#cloumnManagement').hide();
                $('.mediaLibrary').click();
                $('.modal-backdrop').hide();
            })
        }
    })