define(["jquery","text!tpls/websiteManagement/kandaoNewsClounmManagement.html","artTemplate","common/amdApi","common/delete"],function(n,e,a,t,i){return function(o){n("#kandaoNewscloumnManagement").remove(),t.ajax({url:"official/faq_type/list",type:"get"},function(d){d.result.newsType=o.result;var s=a.render(e,d.result),l=n(s).on("click",".cloumnAdd",function(){t.ajax({url:"official/category/add",type:"post"},function(e){l.find(".tagstoAdd").children().removeClass("active");var a=' <span class="sBox active" id="'+e.result.id+'">'+e.result.name+"</span>";l.find(".tagstoAdd").append(a),n("#kandaoNewscloumnManagement .newsCloumn-bottom").find('input[name="name"]').val(e.result.name),n("#kandaoNewscloumnManagement .newsCloumn-bottom").find('input[name="name_en"]').val(""),n("#kandaoNewscloumnManagement .newsCloumn-bottom").find('textarea[name="description"]').val(""),n("#kandaoNewscloumnManagement .newsCloumn-bottom").find('textarea[name="description_en"]').val("")})}).on("input",".cloumnSearch",function(){var e=n(this).val();l.find(".sBox").each(function(a,t){-1==n(t).html().indexOf(e)?n(this).css("display","none"):n(this).css("display","inline-block")})}).on("click",".btnDelete",function(){var e;if(l.find(".tagstoAdd .sBox").each(function(a,t){n(t).hasClass("active")&&(e=n(t).attr("id"))}),!e)return void alert("请选择你要删除的看到新闻类型！");i({url:"official/category/"+e+"/delete",modelSeleter:n("#kandaoNewscloumnManagement"),mainSelecter:n(".kandaoNewsManagement"),text:"你确定要删除该看到新闻类型吗？"})}).on("click",".tagstoAdd .sBox",function(){n("#kandaoNewscloumnManagement .tagstoAdd").children().removeClass("active"),n(this).addClass("active"),id=n(this).attr("id"),t.ajax({url:"official/category/"+id+"/info",type:"get"},function(n){l.find('input[name="name"]').val(n.result.name),l.find('input[name="name_en"]').val(n.result.name_en),l.find('textarea[name="description"]').val(n.result.description),l.find('textarea[name="description_en"]').val(n.result.description_en)})}).on("click",".btnSave",function(){l.find(".tagstoAdd .sBox").each(function(e,a){n(a).hasClass("active")&&(id=n(this).attr("id"))}),id||alert("请选择栏目！");var e=n('#kandaoNewscloumnManagement input[name="name"]').val(),a=n('#kandaoNewscloumnManagement input[name="name_en"]').val(),i=n('#kandaoNewscloumnManagement textarea[name="description"]').val(),o=n('#kandaoNewscloumnManagement textarea[name="description_en"]').val(),d={name:e,name_en:a,description:i,description_en:o};if(!(n.trim(e)&&n.trim(a)&&n.trim(i)&&n.trim(o)))return void alert("请输入所有信息!");t.ajax({url:"official/category/"+id+"/change",type:"post",json:JSON.stringify(d)},function(){n("#kandaoNewscloumnManagement").hide(),n(".kandaoNewsManagement").click(),n(".modal-backdrop").hide()})}).appendTo("body").modal();l.find(".tagstoAdd .sBox").first().click()})}});