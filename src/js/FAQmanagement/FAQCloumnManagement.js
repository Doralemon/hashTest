define(['jquery', 'text!tpls/websiteManagement/FAQManagementCloumnManagement.html', 'artTemplate',
 'common/amdApi','common/delete'
    ],
    function($, FAQManagementCloumnManagementTpl, art, amdApi,deleteFaqType) {
        return function() {
            $('#FAQcloumnManagement').remove();
            amdApi.ajax({ url: 'official/faq_type/list', type: 'get' },function(res){
                var FAQManagementCloumnManagement = art.render(FAQManagementCloumnManagementTpl,res.result);
                var $FAQManagementCloumnManagement = $(FAQManagementCloumnManagement)
                .on('click', '.cloumnAdd', function() { //新增问题类型
                    amdApi.ajax({ url: 'official/faq_type/add', type: 'post' }, function(res) {
                        $FAQManagementCloumnManagement.find('.tagstoAdd').children().removeClass('active');
                        var str = ' <span class="sBox active" id="' + res.result.id + '">' + res.result.name + '</span>';
                        $FAQManagementCloumnManagement.find('.tagstoAdd').append(str);
                        $('#FAQcloumnManagement .newsCloumn-bottom').find('input[name="name"]').val(res.result.name);
                        $('#FAQcloumnManagement .newsCloumn-bottom').find('input[name="name_en"]').val('');
                    })
                })
                .on('input', '.cloumnSearch', function() { //搜索问题类型
                    var text = $(this).val();
                    $FAQManagementCloumnManagement.find('.sBox').each(function(i, v) {
                        if ($(v).html().indexOf(text) == -1) {
                            $(this).css('display', 'none');
                        } else {
                            $(this).css('display', 'inline-block');
                        }
                    });
                })
                .on('click', '.btnDelete', function() { //删除问题类型
                    var id;
                    $FAQManagementCloumnManagement.find('.tagstoAdd .sBox').each(function(i, v) {
                        if ($(v).hasClass('active')) {
                            id = $(v).attr('id');
                        }
                    })
                    if (!id) {
                        alert("请选择你要删除的问题类型！");
                        return;
                    }
                    deleteFaqType({url:"official/faq_type/"+id+"/delete",
                    modelSeleter: $('#FAQcloumnManagement'),
                    mainSelecter:$('.FAQManagement'),
                     text:"你确定要删除该问题类型吗？"}
                ); 
                })
                .on('click', '.tagstoAdd .sBox', function() { //查看一个问题类型
                    $('#FAQcloumnManagement .tagstoAdd').children().removeClass('active');
                    $(this).addClass('active');
                    id = $(this).attr('id');
                    amdApi.ajax({ url: 'official/faq_type/'+id+'/info', type: 'get' }, function(res) {
                        $FAQManagementCloumnManagement.find('input[name="name"]').val(res.result.name);
                        $FAQManagementCloumnManagement.find('input[name="name_en"]').val(res.result.name_en);
                    })
                })
                .on('click', '.btnSave', function() { //保存栏目修改
                    ($FAQManagementCloumnManagement.find('.tagstoAdd .sBox')).each(function(i, v) {
                        if ($(v).hasClass('active')) {
                            id = $(this).attr('id');
                        }
                    })
                    if (!id) {
                        alert("请选择栏目！");
                    }
                    var name = $('#FAQcloumnManagement input[name="name"]').val();
                    var name_en = $('#FAQcloumnManagement input[name="name_en"]').val();
                    var json = {
                        "name": name,
                        "name_en": name_en,
                    }
                    if(!$.trim(name)||!$.trim(name_en)){
                        alert("请输入所有信息!");
                        return;
                    }
                    amdApi.ajax({ url: 'official/faq_type/'+id+'/change', type: 'post', json: JSON.stringify(json) }, function() {
                        $('#FAQcloumnManagement').hide();
                        $('.FAQManagement').click();
                        $('.modal-backdrop').hide();
                    })
                })
               .appendTo("body").modal();  
               $FAQManagementCloumnManagement.find('.tagstoAdd .sBox').first().click(); //获取第一个问题类型信息       
            })
          
        }
    })