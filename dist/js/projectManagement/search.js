define(["jquery","text!tpls/projectManagementSeach.html","artTemplate","projectManagement/newAdd","projectManagement/edit","projectManagement/delete","projectManagement/search","common/amdApi","bootstrap","page"],function(t,e,n,a,o,r,d,c){return function(a){var o=t('.kandao-project input[name = "q"]').val(),r={q:o,limit:10};c.ajax({url:"productions/projects",type:"get",json:r},function(a){var r=Math.ceil(a.result.count/10);a.result.index=r;var d=n.render(e,a.result),i=t(d);t(".kandao-project .projectSerachContent").html(i);var p;p=r<6?r:6,1==r?t(".pagination").hide():t(".pagination").show(),function(e,n,a){t(".kandao-project .projectSerachContent").find(".pagination").jBootstrapPage({pageSize:e,total:a,maxPageButton:n,onPageClicked:function(e,n){var a={q:o,limit:10,page:n+1};c.ajax({url:"productions/projects",type:"get",json:a},function(e){for(var n="",a=0;a<e.result.data.length;a++){var o=e.result.data[a];n+='<tr id="'+o.id+'"><td>'+o.no+"</td><td>"+o.name+"</td><td>"+o.description+"</td><td>"+o.creator+"</td><td>"+o.date_created+'</td><td id="'+o.id+'"><button type="button" class="btn btn-edit btn-sm">编辑</button><button type="button" class="btn btn-delete btn-sm">删除</button></td></tr>'}t(".kandao-project table tbody").html(n)})}})}(10,p,a.result.count)})}});