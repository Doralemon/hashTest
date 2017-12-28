define(['jquery', 'text!tpls/websiteManagement/FAQManagementEdit.html', 'artTemplate', 'common/amdApi',
'../common/getPage','FAQmanagement/getData'],
    function($, FAQManagementEditTpl, art, amdApi,getPage,getData) {
        return function(id,FaqType,q,type_id) {
            $('#FAQEdit').remove();
            var flag = true;
            var obj = getPage($('.kandao-FAQ'), 10,flag );
            obj.json.q = q;
            obj.json.type = type_id;
            amdApi.ajax({ url: 'official/faq/'+id+'/info', type: 'get' },function(res){
                res.result.FaqType = FaqType.result;
                var FAQManagementEdit = art.render(FAQManagementEditTpl, res.result);
                var $FAQManagementEdit = $(FAQManagementEdit)
                    .on('submit', 'form', function(e) {
                        e.preventDefault();
                        var title = $('#FAQEdit textarea[name = "title"]').val();
                        var title_en = $('#FAQEdit textarea[name = "title_en"]').val();
                        var answer = $('#FAQEdit textarea[name = "answer"]').val();
                        var answer_en = $('#FAQEdit textarea[name = "answer_en"]').val();
                        var type_id = $('#FAQEdit #faqType').val();
                        var json = {
                            "id":id,
                            "title": title,
                            "title_en": title_en,
                            "answer": answer,
                            "answer_en": answer_en,
                            "type_id":type_id
                        }
                        if (!$.trim(title)|| !$.trim(answer)||!type_id) {
                            alert("问题描述/问题答案/问题类型是必填项！");
                            return;
                        }
                        amdApi.ajax({ url: 'official/faq/'+id+'/change', type: 'post', json:JSON.stringify(json) },function(){
                            amdApi.ajax({ url: 'official/faq/list', type: 'get', json:obj.json },function(res){
                                getData.getListData(res);
                                setTimeout(function() {
                                    $FAQManagementEdit.modal('hide');
                                    $('.modal-backdrop').css('display', "none");
                                }, 300);
                            })
                        })
                    })
                    .appendTo("body").modal();
                    $('#FAQEdit #faqType option').each(function(i,v){
                        if($(v).val()==res.result.type_id){
                            $(this).prop('selected', true);
                        }
                    })
            })
        }
    })