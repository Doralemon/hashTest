define(["jquery","text!tpls/projectManagementEdit.html","artTemplate","common/amdApi"],function(t,e,n,r){return function(o){t("#projectEdit").remove();var o=parseInt(o);r.ajax({url:"productions/projects/"+o,type:"get"},function(a){var i=n.render(e,a.result),p=t(i).on("submit","form",function(){var e=t('#projectEdit input[name = "no"]').val(),n=t('#projectEdit input[name = "name"]').val(),a=t('#projectEdit textarea[name = "description"]').val(),i={no:e,name:n,description:a};return r.ajax({url:"productions/projects/"+o+"/change",type:"post",json:JSON.stringify(i)},function(e){t(".projectManagement").trigger("click"),p.modal("hide")}),!1}).appendTo("body").modal()})}});