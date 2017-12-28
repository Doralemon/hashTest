define(['jquery', 'common/amdApi', 'systemUserManagement/getData'],
    function($, amdApi, getData) {
        return function(id, state) {
            id = parseInt(id);
            state = parseInt(state);
            var json = {
                "id": id,
                "state": state
            }
            amdApi.ajax({ url: "backend/users/" + id + "/state", type: 'post', json: JSON.stringify(json) }, function() {
                $('.systemUserManagement').trigger('click');
            })
        }
    })