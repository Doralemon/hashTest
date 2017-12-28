define(['jquery', 'text!tpls/websiteManagement/kandaonewsManagementList.html', 'artTemplate', 'common/amdApi',
        'kandaonewsManagement/add', 'kandaonewsManagement/edit', 'kandaonewsManagement/newsClounmManagement',
        'kandaonewsManagement/Info', '../reportManagement/toTop', 'kandaonewsManagement/delete','kandaonewsManagement/getData',
        'kandaonewsManagement/search', "bootstrap", "page"
    ],
    function($, kandaonewsManagementTpl, art, amdApi, add, edit, newsClounmManagement, Info, toTop,
        deleteById, getData,search) {
        return function(headFlag) {
            var id,q,category_id,flag=true,language,is_reverse;
            var json = {
                limit:10,
                is_reverse:is_reverse||1
            }
            amdApi.ajax({ url: 'official/kd_news/list', type: 'get', json:json },function(res){
                amdApi.ajax({ url: 'official/category/list', type: 'get', json:json },function(newsType){
                    res.result.newsType = newsType.result;
                    var kandaonewsManagement = art.render(kandaonewsManagementTpl, res.result);
                    var $kandaonewsManagement = $(kandaonewsManagement)
                        .on('click', '.Addnew', function() { //新建
                            add(headFlag,newsType);
                        })
                        .on('click', '.columnManagament', function() { //看到新闻类型管理
                            newsClounmManagement(newsType);
                        })
                        .on('click', '.btnEdit', function() { //编辑
                            id = $(this).parents("tr").attr("id");
                            if(q||language||category_id){
                            edit(headFlag,id,newsType,category_id,q,language);
                                return;
                            }
                            edit(headFlag,id,newsType);
                        })
                        .on('click', '.btnInfo', function() { //详情
                            id = $(this).parents("tr").attr("id");
                            Info(id);
                        })
                        .on('click', '.toTop', function() { //置顶
                            toTop();
                        })
                        .on('click', '.btnDelete', function() { //删除
                            id = $(this).parents("tr").attr("id");
                            if(q||language||category_id){
                                deleteById(id,q,category_id,language);
                                    return;
                                }
                            deleteById(id);
                        })
                        .on('click', '.firstColumn .sBox', function() { //问题类型分类
                            $('.firstColumn .sBox').removeClass('active');
                            $(this).addClass('active');
                            category_id = $(this).attr('id');
                        })
                        .on('click', '.sortByTime', function() { //按时间排序
                            if(flag){
                                is_reverse =1;
                                $kandaonewsManagement.find('span.sortByTime').addClass('glyphicon-sort-by-attributes').removeClass('glyphicon-sort-by-attributes-alt');
                                $kandaonewsManagement.find('span.sortByTime').text("按时间升序");
                            }else{
                                is_reverse =0;
                                $kandaonewsManagement.find('span.sortByTime').removeClass('glyphicon-sort-by-attributes').addClass('glyphicon-sort-by-attributes-alt');
                                $kandaonewsManagement.find('span.sortByTime').text("按时间降序");
                            }
                            flag = !flag;                            
                            json.is_reverse = is_reverse;
                            amdApi.ajax({ url: 'official/kd_news/list', type: 'get', json: json }, function(res) {   
                                getData.myAjax(json, res);          
                        })
                        })
                        .on('click', '.newsSearch', function() { //搜索
                            q = $kandaonewsManagement.find('input[name="q"]').val();
                            language = $kandaonewsManagement.find('select[name="type"]').val();
                            json.q = q;
                            json.page =1;
                            json.language = language;
                             search(json);
                        })
                        .on('keydown', 'input[name="q"]', function(e) { //回车搜索
                            if (e.keyCode == 13) {
                                e.preventDefault();
                                $kandaonewsManagement.find('.newsSearch').trigger('click');
                            } else {
                                return;
                            }
                        })
                    $(".kandao-contentBody").html($kandaonewsManagement);
                    getData.myAjax(json,res);
                    $kandaonewsManagement.find(".sortByTime").click();
                })
            })
            $('.breadcrumb li').eq(0).on('click', function() { //回首页
                $('.home').trigger('click');
            });
        }
    })