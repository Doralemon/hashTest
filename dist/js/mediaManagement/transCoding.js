define(["jquery","text!tpls/mediaManagement/mediatranscoding.html","artTemplate","common/amdApi","bootstrap","page"],function(e,n,t,a){return function(o,r){function i(e){a.ajax({url:"medias/"+r+"/"+o+"/transcode",json:JSON.stringify(l),type:"post"},function(n){e&&e(n)})}var l={warping:"",resolution:"",codec:"",vbr:""};"photo"==r?i(function(){alert("转码任务已经创建，可以去转码管理页面查看详情!")}):(e("#transCoding").remove(),a.ajax({url:"medias/video/format/parameter",type:"get"},function(a){var o=t.render(n,a.result),r=e(o).on("submit","form",function(n){n.preventDefault();var t=r.find('select[name="warping"]').val(),a=r.find('select[name="resolution"]').val(),o=r.find('select[name="codec"]').val(),m=r.find('select[name="vbr"]').val(),d=r.find('select[name="container"]').val(),c=r.find('select[name="fov"]').val(),f=r.find('select[name="layout"]').val();if(!(e.trim(t)&&e.trim(a)&&e.trim(o)&&e.trim(m)))return void alert("请选择完整的转码信息！");l={warping:t,resolution:a,codec:o,vbr:m,container:d,fov:c,layout:f},i(function(){alert("转码任务已经创建，可以去转码管理页面查看详情!"),r.modal("hide")})}).appendTo("body").modal()}))}});