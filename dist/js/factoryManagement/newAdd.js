define(["jquery","text!tpls/factoryManagementAdd.html","artTemplate","common/amdApi"],function(t,a,n,e){return function(){t("#factoryAdd").remove();var n=t(a).on("submit","form",function(a){a.preventDefault();var r=t('#factoryAdd input[name = "no"]').val(),o=t('#factoryAdd input[name = "name"]').val(),d=t('#factoryAdd textarea[name = "description"]').val(),i={no:r,name:o,description:d};return t.trim(r+"")&&t.trim(o+"")&&t.trim(d+"")?(e.ajax({url:"productions/factory/add",type:"post",json:JSON.stringify(i)},function(a){n.modal("hide"),t(".factoryManagement").trigger("click")}),!1):void alert("请填写所有数据再提交！")}).appendTo("body").modal()}});