define(['jquery', 'text!tpls/websiteManagement/FAQManagementList.html', 'artTemplate', 'common/amdApi',
        'FAQmanagement/add', 'FAQmanagement/edit', 'FAQmanagement/FAQCloumnManagement',
      'FAQmanagement/search','FAQmanagement/getData',  'FAQmanagement/delete',
        "bootstrap", "page"
    ],
    function($, FAQmanagementTpl, art, amdApi, add, edit, FAQCloumnManagement,search, getData,deleteById) {
        return function() {
            var id,q,type_id,is_reverse,flag=true;
            var json = {
                limit:10,
                is_reverse:is_reverse||1
            }
            amdApi.ajax({ url: 'official/faq/list', type: 'get', json:json },function(res){
                amdApi.ajax({ url: 'official/faq_type/list', type: 'get'},function(FaqType){
                    res.result.FaqType = FaqType.result;
                    var FAQmanagement = art.render(FAQmanagementTpl, res.result);
                    var $FAQmanagement = $(FAQmanagement)
                        .on('click', '.Addnew', function() { //新建
                            add();
                        })
                        .on('click', '.columnManagament', function() { //问题类型管理
                            FAQCloumnManagement();
                        })
                        .on('click', '.btnEdit', function() { //编辑
                            id = $(this).parents('tr').attr('id');
                            if(q||type_id){
                                edit(id,FaqType,q,type_id);  
                                return;
                            }
                            edit(id,FaqType);
                        })
                        .on('click', '.sortByTime', function() { //按时间排序
                            if(flag){
                                is_reverse =1;
                                $FAQmanagement.find('span.sortByTime').addClass('glyphicon-sort-by-attributes').removeClass('glyphicon-sort-by-attributes-alt');
                                $FAQmanagement.find('span.sortByTime').text("按时间升序");
                            }else{
                                is_reverse =0;
                                $FAQmanagement.find('span.sortByTime').removeClass('glyphicon-sort-by-attributes').addClass('glyphicon-sort-by-attributes-alt');
                                $FAQmanagement.find('span.sortByTime').text("按时间降序");   
                            }
                            flag = !flag;                            
                            json.is_reverse = is_reverse;
                            amdApi.ajax({ url: 'official/faq/list', type: 'get', json: json }, function(res) {   
                                getData.myAjax(json, res);          
                        })
                        })
                        .on('click', '.btnDelete', function() { //删除
                            id = $(this).parents('tr').attr('id');
                            if(q||type_id){
                                deleteById(id,q,type_id);  
                                return;
                            }
                            deleteById(id);
                        })
                        .on('click', '.firstColumn .sBox', function() { //问题类型分类
                            $('.firstColumn .sBox').removeClass('active');
                            $(this).addClass('active');
                            type_id = $(this).attr('id');
                        })
                        .on('click', '.mediaSearch', function() { //搜索
                           q = $FAQmanagement.find('input[name="q"]').val();
                           json.q = q;
                           json.type = type_id;
                           json.page =1;
                            search(json);
                        })
                        .on('keydown', 'input[name="q"]', function(e) { //回车搜索
                            if (e.keyCode == 13) {
                                e.preventDefault();
                                $FAQmanagement.find('.mediaSearch').trigger('click');
                            } else {
                                return;
                            }
                        })
                    $(".kandao-contentBody").html($FAQmanagement);
                    getData.myAjax(json,res);
                })
            });
            $('.breadcrumb li').eq(0).on('click', function() { //回首页
                $('.home').trigger('click');
            })
        }
    })