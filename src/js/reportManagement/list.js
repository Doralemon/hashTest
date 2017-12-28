define(['jquery', 'text!tpls/websiteManagement/reportManagementList.html', 'artTemplate', 'common/amdApi',
        'reportManagement/add', 'reportManagement/edit', 'reportManagement/delete', 'reportManagement/search',
        'reportManagement/toTop','reportManagement/getData', "bootstrap", "page"
    ],
    function($, reportManagementTpl, art, amdApi, add, edit, deleteById, search, toTop,getData) {
        return function(headFlag) {
            var id,q,language;
            var json = {
                limit:10
            }
            amdApi.ajax({ url: 'official/media_report/list', type: 'get', json:json },function(res){
                var reportManagement = art.render(reportManagementTpl, res.result);
                var $reportManagement = $(reportManagement)
                    .on('click', '.newAdd', function() { //新建
                        add(headFlag);
                    })
                    .on('click', '.btnEdit', function() { //编辑
                        id = $(this).parents('tr').attr("id");
                        if(q||language){
                            edit(id,headFlag,q,language);
                            return;
                        }
                        edit(id,headFlag);
                    })
                    .on('click', '.toTop', function() { //置顶
                        id = $(this).parents('tr').attr("id");
                        if(q||language){
                            toTop(id,q,language);
                            return;
                        }
                        toTop();
                    })
                    .on('click', '.btnDelete', function() { //删除
                        id = $(this).parents('tr').attr("id");
                        if(q||language){
                            deleteById(id,q,language);
                            return;
                        }
                        deleteById(id);
                    })
                    .on('click', '.reportSearch', function() { //搜索
                        q = $reportManagement.find('input[name="q"]').val();
                        language = $reportManagement.find('select[name="language"]').val();
                        json.q = q;
                        json.language = language;
                        json.page =1;
                        amdApi.ajax({ url: 'official/media_report/list', type: 'get', json: json }, function(res) {   
                            getData.myAjax(json, res);          
                    })
                    })
                    .on('keydown', 'input[name="q"]', function(e) { //回车搜索
                        if (e.keyCode == 13) {
                            e.preventDefault();
                            $reportManagement.find('.reportSearch').trigger('click');
                        } else {
                            return;
                        }
                    })
                $(".kandao-contentBody").html($reportManagement);
                getData.myAjax(json,res);
            })
            $('.breadcrumb li').eq(0).on('click', function() { //回首页
                $('.home').trigger('click');
            })
        }
    })