define(["jquery","common/amdApi"],function(t,a){return{getListData:function(a,e){for(var n="",i=0;i<a.result.data.length;i++){var o="",d="",r="",l=a.result.data[i];"4"==l.codec?o="H264":"5"==l.codec?o="H265":"9"==l.code&&(o="VP9"),"C"==l.warping?d="cubemap":"O"==l.warping?d="offcenter-cubemap":"S"==l.warping&&(d="sphere"),r="photo"==e?'<a href="'+l.uri+'" target="_blank" type="button" class="btn btn-default infoView">查看</a>':'<a class="btn btn-default infoPlay" href="'+l.uri+'" target="_blank" type="button">播放</a>',n+='<tr id="'+l.link_id+'"><td>'+d+"</td><td>"+l.resolution+"</td><td>"+o+"</td><td>"+l.vbr+"</td><td>"+l.original_size+"</td><td>"+l.uri+"<td>"+l.author+"</td><td>"+l.date_created+"</td><td>"+r+'<button type="button" class="btn btn-default linkDelete">删除</button></td></tr>'}t(".kandao-mediaLibraryInfo").find(".linkContainer tbody").html(n)},myAjax:function(e,n,i,o){var d=this;d.getListData(n,i);var r=Math.ceil(n.result.count/10);n.result.index=r,t(".mediaTypeInfo-bottom>p").text("每页显示10条信息,共"+r+"页");var l;l=r<6?r:6,1==r?t(".pagination").hide():t(".pagination").show(),function(n,r,l){t(".kandao-mediaLibraryInfo").find(".pagination").jBootstrapPage({pageSize:n,total:l,pageNow:e.page,maxPageButton:r,onPageClicked:function(t,n){localStorage.setItem("currentPage","(pageIndex + 1)"),e.page=n+1,a.ajax({url:"medias/"+i+"/"+o+"/links",type:"get",json:e},function(t){d.getListData(t,i)})}})}(10,l,n.result.count),e.page>6&&(t(".pagination .goTo input").val(e.page),t(".go").click(),t(".pagination .goTo input").val("")),t(".kandao-mediaLibraryInfo .pagination>li").removeClass("active"),t(".kandao-mediaLibraryInfo .pagination>li>a").each(function(a,n){t(n).attr("page")==e.page&&t(n).parent().addClass("active")})}}});