define(["jquery","text!tpls/websiteManagement/reportManagementAdd.html","artTemplate","common/amdApi","../mediaManagement/uploadFileRms"],function(e,t,r,o,a){return function(r){e("#reportAdd").remove();var a,n={},i=e(t).on("change",".language  select",function(){a=e(this).val(),"ZH-CN"==a?(e("#reportAddFromCn").show(),e("#reportAddFromEn").hide()):(e("#reportAddFromCn").hide(),e("#reportAddFromEn").show())}).on("click",".uploadSubmit",function(t){function l(t,l){var d=e("#reportAdd "+t+' input[name = "title"]').val(),p=e("#reportAdd "+t+' input[name = "source"]').val(),m=e("#reportAdd "+t+' input[name = "source_url"]').val(),s=e("#reportAdd "+t+' textarea[name = "description"]').val();return n.title=d,n.source=p,n.source_url=m,n.description=s,n.language=a,e.trim(d)&&e.trim(p)&&e.trim(s)&&e.trim(m)?e("#addMedia .thumbnail img").length>0&&-1==e("#addMedia #picID").val().indexOf(".jpg")?void alert("缩略图请使用后缀为.jpg的图片！"):void o.ajax({url:"official/media_report/add",type:"post",json:JSON.stringify(n)},function(t){if(i.find(".fileinput-exists img").length>0){r.flag=!1;var a=new FormData(i.find(l)[0]);e.ajax({url:o.getFileUrl()+"upload_action/",type:"post",data:a,cache:!1,contentType:!1,processData:!1,success:function(e){e.msg?console.log("upload success"):console.log(e.msg),r.flag=!0;var a={file_hash:e.file_hash,file_url:e.file_url,file_name:e.file_name,file_size:e.file_size,file_type:e.file_type,type:"report",pk:t.result.id};o.ajax({url:"medias/upload/thumbnail",type:"post",json:JSON.stringify(a)},function(e){})},error:function(e){r.flag=!0,console.log(e.msg)}})}r.flag=!0,setTimeout(function(){e(".reportManagement").trigger("click")},500),i.modal("hide")}):void alert("请完成所有信息后再提交！")}t.preventDefault(),a=e("#reportAdd .language select").val(),"ZH-CN"==a?l("#reportAddFromCn","#reportAddImgCn"):l("#reportAddFromEn","#reportAddImgEn")}).appendTo("body").modal()}});