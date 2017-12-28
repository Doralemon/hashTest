define(["jquery","text!tpls/websiteManagement/kandaoNewsManagementEdit.html","artTemplate","common/amdApi","common/getPage","kandaonewsManagement/getData"],function(e,a,t,n,o,i){return function(s,l,d,r,c,f){e("#kandaoNewsEdit").remove();var f,m,u={},g=o(e(".kandao-news"),10,!0);g.json.q=c,g.json.language=f,g.json.category_id=r,n.ajax({url:"official/kd_news/"+l+"/info",type:"get"},function(o){o.result.testText=o.result.abstract,o.result.newsType=d.result,f=o.result.language;var r=t.render(a,o.result),c=e(r).on("click",".btnSave",function(a){function t(a,t){var o=e("#kandaoNewsEdit "+a+' input[name = "title"]').val(),d=e("#kandaoNewsEdit "+a+' input[name = "abstract"]').val(),r=e("#kandaoNewsEdit "+a+' select[name = "category_id"]').val();return u.title=o,u.abstract=d,u.context=m,u.category_id=r,!e.trim(o)|!e.trim(m)?void alert("请填写新闻标题/新闻内容后再提交！"):e("#addMedia .thumbnail img").length>0&&-1==e("#addMedia #picID").val().indexOf(".jpg")?void alert("缩略图请使用后缀为.jpg的图片！"):void n.ajax({url:"official/kd_news/"+l+"/change",type:"post",json:JSON.stringify(u)},function(){if(c.find(".fileinput-exists img").length>0){s.flag=!1;var a=new FormData(c.find(t)[0]);e.ajax({url:n.getFileUrl()+"upload_action/",type:"post",data:a,cache:!1,contentType:!1,processData:!1,success:function(e){e.msg?console.log("upload success"):console.log(e.msg),s.flag=!0;var a={file_hash:e.file_hash,file_url:e.file_url,file_name:e.file_name,file_size:e.file_size,file_type:e.file_type,type:"news",pk:l};n.ajax({url:"medias/upload/thumbnail",type:"post",json:JSON.stringify(a)},function(e){})},error:function(e){s.flag=!0,console.log(e.msg)}})}s.flag=!0,n.ajax({url:"official/kd_news/list",type:"get",json:g.json},function(a){i.getListData(a),setTimeout(function(){c.modal("hide"),e(".modal-backdrop").css("display","none")},300)})})}a.preventDefault(),"ZH-CN"==f?(m=p[0].html(),t("#kandaoNewsEditFromCn","#kandaoNewsEditImgCn")):(m=p[1].html(),t("#kandaoNewsEditFromEn","#kandaoNewsEditImgEn"))}).appendTo("body").modal();"ZH-CN"==f?(e("#kandaoNewsEditFromCn").show(),e("#kandaoNewsEditFromEn").hide()):(e("#kandaoNewsEditFromCn").hide(),e("#kandaoNewsEditFromEn").show()),e('#kandaoNewsEdit select[name="category_id"] option').each(function(a,t){e(t).val()==o.result.category_id&&e(this).prop("selected",!0)});var p=new Array;p[0]=KindEditor.create('#kandaoNewsEditFromCn textarea[name="context"]',{filterMode:!1,allowFileManager:!0,resizeType:0,urlType:"domain",afterCreate:function(){}}),p[1]=KindEditor.create('#kandaoNewsEditFromEn textarea[name="context"]',{filterMode:!1,allowFileManager:!0,resizeType:0,urlType:"domain",afterCreate:function(){}}),e("#kandaoNewsEdit").off("shown.bs.modal").on("shown.bs.modal",function(a){e(document).off("focusin.modal")}),"ZH-CN"==f?p[0].html(o.result.context):p[1].html(o.result.context)})}});