define(["jquery","common/amdApi","text!tpls/deletModal.html","common/getPage","transCodingManagement/getData"],function(e,t,n,d,o){return function(d,o){e("#deleteMassage").remove(),$deletModal=e(n).on("click",".btn-comfirm",function(){t.ajax({url:"medias/transcode/"+d+"/"+o+"/delete",type:"post"},function(){e("#transCodeInfo").modal("hide"),$deletModal.find("h5").html("删除成功！"),$deletModal.find(".btn").hide(),setTimeout(function(){$deletModal.modal("hide")},300),e(".transcodingManagement").click()})}).appendTo("body").modal(),e("#deleteMassage").find("h5").html("你确定要删除吗？")}});