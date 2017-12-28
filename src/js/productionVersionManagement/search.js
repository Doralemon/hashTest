define(['jquery', 'artTemplate',
        'common/amdApi', 'productionVersionManagement/getData', 'bootstrap', 'page'
    ],
    function($, art, amdApi, getData) {
        return function() {
            var q = $('.kandao-productionVersion input[name="q"]').val();
            var state = $('.kandao-productionVersion select[name="state"]').val();
            var json = {
                q: q,
                state: state,
                limit: 10,
                page: 1
            }
            amdApi.ajax({ url: "softwares", type: "get", json: json }, function(res) {
                var num = 10;
                var index = Math.ceil(res.result.count / num);
                res.result.index = index;
                getData.getListData(res);
                $('.productVersionSearchContent').children('p').html('总计' + res.result.count + '条信息');
                $('.softwares-bottom').children('p').html('每页显示10条信息,共' + res.result.index + '页');
                var btnNum;
                if (index < 6) {
                    btnNum = index;
                } else {
                    btnNum = 6;
                }
                if (index == 1) {
                    $('.pagination').hide();
                } else {
                    $('.pagination').show();
                }
                createPage(num, btnNum, res.result.count);

                function createPage(pageSize, buttons, total) {
                    $('.kandao-productionVersion').find(".pagination").jBootstrapPage({
                        pageSize: pageSize,
                        total: total,
                        maxPageButton: buttons,
                        onPageClicked: function(obj, pageIndex) {
                            var currentPage = $('.breadcrumb').attr('currentPage');
                            currentPage = pageIndex + 1;
                            // alert((pageIndex + 1) + '页');
                            var json = {
                                q: q,
                                state: state,
                                limit: 10,
                                page: currentPage
                            }
                            amdApi.ajax({ url: "softwares", type: "get", json: json }, function(res) {
                                getData.getListData(res);
                            })
                        }
                    });
                }
            })
        }
    })