define(["jquery","text!tpls/mediaManagement/transCodeInitSet.html","text!tpls/mediaManagement/mediatranscoding.html","artTemplate","common/amdApi","../common/getPage"],function(e,n,t,o,i,a){return function(){e("#codeInit").remove();var r,l=e(n).on("click",".playAdd",function(){function n(e){i.ajax({url:"",json:JSON.stringify(json),type:"post"},function(n){e&&e(n)})}r=l.find("#selTpye").val(),e("#transCoding").remove(),i.ajax({url:"medias/video/format/parameter",type:"get"},function(i){var a=o.render(t,i.result),r=e(a).on("submit","form",function(t){t.preventDefault();var o=r.find('select[name="warping"]').val(),i=r.find('select[name="resolution"]').val(),a=r.find('select[name="codec"]').val(),l=r.find('select[name="vbr"]').val();if(!(e.trim(o)&&e.trim(i)&&e.trim(a)&&e.trim(l)))return void alert("请选择完整的转码信息！");json={warping:o,resolution:i,codec:a,vbr:l},n(function(){alert("转码任务已经创建，可以去转码管理页面查看详情!"),r.modal("hide")})}).appendTo("body").modal()})}).on("click",".btnEdit",function(){a(e("#codeInit"),10,!0);console.log("bianji")}).on("click",".btnDelete",function(){console.log("删除")}).appendTo("body").modal()}});