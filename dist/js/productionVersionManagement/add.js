define(["jquery","text!tpls/productionVersionManagementAdd.html","artTemplate","common/amdApi","bootstrap"],function(e,t,n,a){return function(){e("#addVersion").remove(),a.ajax({url:"softwares/platforms",type:"get"},function(r){var o=n.render(t,r.result),i=e(o).on("submit","form",function(t){t.preventDefault();var n=e('#addVersion input[name="name"]').val(),r=e('#addVersion input[name="title"]').val(),o=e('#addVersion select[name="platform"]').val(),d=e('#addVersion textarea[name="description"]').val(),m={name:n,title:r,platform:o,description:d};return e.trim(n+"")&&e.trim(r+"")&&e.trim(d+"")&&e.trim(o+"")?(a.ajax({url:"softwares/add",type:"post",json:JSON.stringify(m)},function(t){i.modal("hide"),e(".productionVersionManagement").trigger("click")}),!1):void alert("请完成所有信息后提交！")}).appendTo("body").modal()})}});