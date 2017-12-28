define(['jquery', 'text!tpls/websiteManagement/kandaoNewsClounmManagement.html', 'artTemplate',
'common/amdApi','common/delete'
   ],
   function($, kandaoNewsClounmManagementTpl, art, amdApi,deleteFaqType) {
       return function(newsType) {
           $('#kandaoNewscloumnManagement').remove();
           amdApi.ajax({ url: 'official/faq_type/list', type: 'get' },function(res){
               res.result.newsType = newsType.result;
               var kandaoNewsClounmManagement = art.render(kandaoNewsClounmManagementTpl,res.result);
               var $kandaoNewsClounmManagement = $(kandaoNewsClounmManagement)
               .on('click', '.cloumnAdd', function() { //新增看到新闻类型
                   amdApi.ajax({ url: 'official/category/add', type: 'post' }, function(res) {
                       $kandaoNewsClounmManagement.find('.tagstoAdd').children().removeClass('active');
                       var str = ' <span class="sBox active" id="' + res.result.id + '">' + res.result.name + '</span>';
                       $kandaoNewsClounmManagement.find('.tagstoAdd').append(str);
                       $('#kandaoNewscloumnManagement .newsCloumn-bottom').find('input[name="name"]').val(res.result.name);
                       $('#kandaoNewscloumnManagement .newsCloumn-bottom').find('input[name="name_en"]').val("");
                       $('#kandaoNewscloumnManagement .newsCloumn-bottom').find('textarea[name="description"]').val("");
                       $('#kandaoNewscloumnManagement .newsCloumn-bottom').find('textarea[name="description_en"]').val("");
                   })
               })
               .on('input', '.cloumnSearch', function() { //搜索看到新闻类型
                   var text = $(this).val();
                   $kandaoNewsClounmManagement.find('.sBox').each(function(i, v) {
                       if ($(v).html().indexOf(text) == -1) {
                           $(this).css('display', 'none');
                       } else {
                           $(this).css('display', 'inline-block');
                       }
                   });
               })
               .on('click', '.btnDelete', function() { //删除看到新闻类型
                   var id;
                   $kandaoNewsClounmManagement.find('.tagstoAdd .sBox').each(function(i, v) {
                       if ($(v).hasClass('active')) {
                           id = $(v).attr('id');
                       }
                   })
                   if (!id) {
                       alert("请选择你要删除的看到新闻类型！");
                       return;
                   }
                   deleteFaqType({url:"official/category/"+id+"/delete",
                   modelSeleter: $('#kandaoNewscloumnManagement'),
                   mainSelecter:$('.kandaoNewsManagement'),
                    text:"你确定要删除该看到新闻类型吗？"}
               ); 
               })
               .on('click', '.tagstoAdd .sBox', function() { //查看一个看到新闻类型
                   $('#kandaoNewscloumnManagement .tagstoAdd').children().removeClass('active');
                   $(this).addClass('active');
                   id = $(this).attr('id');
                   amdApi.ajax({ url: 'official/category/'+id+'/info', type: 'get' }, function(res) {
                       $kandaoNewsClounmManagement.find('input[name="name"]').val(res.result.name);
                       $kandaoNewsClounmManagement.find('input[name="name_en"]').val(res.result.name_en);
                       $kandaoNewsClounmManagement.find('textarea[name="description"]').val(res.result.description);
                       $kandaoNewsClounmManagement.find('textarea[name="description_en"]').val(res.result.description_en);
                   })
               })
               .on('click', '.btnSave', function() { //保存栏目修改
                   ($kandaoNewsClounmManagement.find('.tagstoAdd .sBox')).each(function(i, v) {
                       if ($(v).hasClass('active')) {
                           id = $(this).attr('id');
                       }
                   })
                   if (!id) {
                       alert("请选择栏目！");
                   }
                   var name = $('#kandaoNewscloumnManagement input[name="name"]').val();
                   var name_en = $('#kandaoNewscloumnManagement input[name="name_en"]').val();
                   var description = $('#kandaoNewscloumnManagement textarea[name="description"]').val();
                   var description_en = $('#kandaoNewscloumnManagement textarea[name="description_en"]').val();
                   var json = {
                       "name": name,
                       "name_en": name_en,
                       "description":description,
                       "description_en":description_en
                   }
                   if(!$.trim(name)||!$.trim(name_en)||!$.trim(description)||!$.trim(description_en)){
                       alert("请输入所有信息!");
                       return;
                   }
                   amdApi.ajax({ url: 'official/category/'+id+'/change', type: 'post', json: JSON.stringify(json) }, function() {
                       $('#kandaoNewscloumnManagement').hide();
                       $('.kandaoNewsManagement').click();
                       $('.modal-backdrop').hide();
                   })
               })
              .appendTo("body").modal();  
              $kandaoNewsClounmManagement.find('.tagstoAdd .sBox').first().click(); //获取第一个看到新闻类型信息       
           })
         
       }
   })