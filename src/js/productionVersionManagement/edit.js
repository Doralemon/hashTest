define(["jquery", "text!tpls/productionVersion/productionVersionManagementEdit.html", 'artTemplate', 'common/amdApi', 'productionVersionManagement/getData'],
    function($, productionVersionManagementEditTpl, art, amdApi, getData) {
        return function(id, _this) {
            $('#editVersion').remove();
            var currentPage = sessionStorage.getItem("currentPage");
            // console.log(currentPage);
            amdApi.ajax({ url: "softwares/" + id, type: "get" }, function(res) {
                // console.log(res);
                var productionVersionManagementEdit = art.render(productionVersionManagementEditTpl, res.result);
                var $productionVersionManagementEdit = $(productionVersionManagementEdit)
                    .on('submit', 'form', function(e) {
                        e.preventDefault();
                        var name = $('#editVersion input[name="name"]').val();
                        var title = $('#editVersion input[name="title"]').val();
                        var platform = $('#editVersion select[name="platform"]').val();
                        var description = $('#editVersion textarea[name="description"]').val();
                        if (!$.trim(name) || !$.trim(title) || !$.trim(platform) || !$.trim(description)) {
                            alert("请输入所有信息！");
                            return;
                        }
                        var json = {
                            "name": name,
                            "title": title,
                            "platform": platform,
                            "description": description
                        }
                        amdApi.ajax({ url: "softwares/" + id + "/change", type: "post", json: JSON.stringify(json) }, function(res) {
                            $productionVersionManagementEdit.modal('hide');
                            var json = {
                                limit: 10,
                                page: currentPage || 1
                            }
                            amdApi.ajax({ url: "softwares", type: "get", json: json }, function(res) {
                                getData.getListData(res);
                            })
                        })
                    })
                    .appendTo("body").modal();
            })
        };
    });