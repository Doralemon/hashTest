define(["jquery", 'common/amdApi', 'text!tpls/deletModal.html', 'productionVersionManagement/getData'],
    function($, amdApi, deletModalTpl, getData) {
        return function(id) {
            // 获取当前页面
            var currentPage = $('.breadcrumb').attr('currentPage');
            $('#deleteMassage').remove();
            $deletModal = $(deletModalTpl)
                .on('click', '.btn-comfirm', function() {
                    amdApi.ajax({ url: "softwares/" + id + "/offline", type: 'post' }, function(res) {
                        $deletModal.modal('hide');
                        var json = {
                            limit: 10,
                            page: currentPage || 1
                        }
                        amdApi.ajax({ url: "softwares", type: "get", json: json }, function(res) {
                            getData.getListData(res);
                        })
                    })
                })
                .appendTo('body').modal();
            $('#deleteMassage h5').html('您确定要下线该产品吗？');
        };
    });