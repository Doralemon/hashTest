define(["jquery","common/amdApi","text!tpls/deletModal.html"],function(e,t,d){return function(n){e("#deleteMassage").remove(),$deletModal=e(d).on("click",".btn-comfirm",function(){t.ajax({url:"medias/transcode/"+n+"/delete",type:"post"},function(){$deletModal.find("h5").html("删除成功！"),$deletModal.find(".btn").hide(),setTimeout(function(){$deletModal.modal("hide")},300),e(".transcodingManagement").trigger("click")})}).appendTo("body").modal(),e("#deleteMassage").find("h5").html("你确定要删除吗？")}});