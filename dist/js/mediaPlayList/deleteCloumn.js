define(["jquery","artTemplate","common/amdApi","text!tpls/deletModal.html","mediaPlayList/getData","bootstrap","page"],function(e,t,a,d,l){return function(t,o,n){e("#deleteMassage").remove(),$deletModal=e(d).on("click",".btn-comfirm",function(){var e={column_id:parseInt(n)};a.ajax({url:"medias/playlists/"+o+"/"+t+"/members_delete",type:"post",json:JSON.stringify(e)},function(){$deletModal.find("h5").html("移除成功！"),$deletModal.find(".btn").hide(),setTimeout(function(){$deletModal.modal("hide")},500),l.myInfoAjax(t,o)})}).appendTo("body").modal(),e("#deleteMassage").find("h5").html("你确定要从该栏目移除素材吗？")}});