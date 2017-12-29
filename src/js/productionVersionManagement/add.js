define(["jquery", "text!tpls/productionVersion/productionVersionManagementAdd.html", 'artTemplate', "common/amdApi", 'bootstrap'],
    function($, productionVersionManagementAddTpl, art, amdApi) {
        return function() {
            $('#addVersion').remove();
            amdApi.ajax({ url: "softwares/platforms", type: "get" }, function(res) {
                var productionVersionManagementAdd = art.render(productionVersionManagementAddTpl, res.result);
                var $productionVersionManagementAdd = $(productionVersionManagementAdd)
                    .on('submit', 'form', function(e) {
                        e.preventDefault();
                        var name = $('#addVersion input[name="name"]').val();
                        var title = $('#addVersion input[name="title"]').val();
                        var platform = $('#addVersion select[name="platform"]').val();
                        var description = $('#addVersion textarea[name="description"]').val();
                        var json = {
                            // "is_increment": is_increment,
                            "name": name,
                            "title": title,
                            "platform": platform,
                            "description": description
                        };
                        if (!$.trim(name + '') || !$.trim(title + '') || !$.trim(description + '') || !$.trim(platform + '')) {
                            alert("请完成所有信息后提交！");
                            return;
                        }
                        amdApi.ajax({ url: "softwares/add", type: "post", json: JSON.stringify(json) }, function(res) {
                            $productionVersionManagementAdd.modal('hide');
                            $('.productionVersionManagement').trigger('click');
                        })
                        return false;
                    })
                    .appendTo("body").modal();
            });
        };
    });