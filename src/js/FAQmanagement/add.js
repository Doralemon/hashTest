define(['jquery', 'text!tpls/websiteManagement/FAQManagementAdd.html', 'artTemplate', 'common/amdApi'],
    function($, FAQManagementAddTpl, art, amdApi) {
        return function() {
            $('#FAQAdd').remove();
            amdApi.ajax({ url: 'official/faq_type/list', type: 'get' },function(res){
                var FAQManagementAdd = art.render(FAQManagementAddTpl,res.result);
                var $FAQManagementAdd = $(FAQManagementAdd)
                    .on('submit', 'form', function(e) {
                        e.preventDefault();
                        var title = $('#FAQAdd textarea[name = "title"]').val();
                        var title_en = $('#FAQAdd textarea[name = "title_en"]').val();
                        var type_id = $('#FAQAdd #FAQTpye').val();
                        var answer = $('#FAQAdd textarea[name = "answer"]').val();
                        var answer_en = $('#FAQAdd textarea[name = "answer_en"]').val();
                        var json = {
                            "title": title,
                            "title_en": title_en,
                            "type_id": type_id,
                            "answer":answer,
                            "answer_en":answer_en
                        }
                        if (!$.trim(title) || !$.trim(answer)) {
                            alert("问题描述/问题答案是必填项！");
                            return;
                        }
                        amdApi.ajax({ url: "official/faq/add", type: 'post', json: JSON.stringify(json) }, function() {
                            $('.FAQManagement').trigger('click');
                            $FAQManagementAdd.modal('hide');
                        })
                    })
                    .appendTo("body").modal();
            })         
        }
    })