define(["jquery","text!tpls/mediaManagement/mediaPlayInfo.html","artTemplate","common/amdApi","mediaPlayList/tagSort","mediaPlayList/addTag","mediaPlayList/getData","mediaPlayList/deleteCloumn"],function(a,t,i,n,e,l,o,c){return function(r,d){a("#playListAdd").remove(),n.ajax({url:"medias/playlists/"+d+"/"+r,type:"get"},function(m){var s=i.render(t,m.result),f=a(s).on("click",".mediaPlayList,.goBack",function(){a(".playList").click()}).on("click",".infoSave",function(){var t=f.find('input[name="name"]').val(),i=f.find('textarea[name="description"]').val();if(!a.trim(t))return void alert("请输入名称！");var e={name:t,description:i};n.ajax({url:"medias/playlists/"+d+"/"+r+"/change",type:"post",json:JSON.stringify(e)},function(){alert("保存成功！"),a(".playList").click()})}).on("click",".sort",function(){e(r,d)}).on("click",".addTag",function(){l(r,d)}).on("click",".infoDelete",function(){var t=a(this).parents("tr").attr("id");c(r,d,t)});a(".kandao-contentBody").html(f),o.myInfoAjax(r,d)})}});