define(["jquery","text!tpls/websiteManagement/FAQManagementCloumnManagement.html","artTemplate","common/amdApi","common/delete"],function(n,e,a,t,i){return function(){n("#FAQcloumnManagement").remove(),t.ajax({url:"official/faq_type/list",type:"get"},function(o){var l=a.render(e,o.result),m=n(l).on("click",".cloumnAdd",function(){t.ajax({url:"official/faq_type/add",type:"post"},function(e){m.find(".tagstoAdd").children().removeClass("active");var a=' <span class="sBox active" id="'+e.result.id+'">'+e.result.name+"</span>";m.find(".tagstoAdd").append(a),n("#FAQcloumnManagement .newsCloumn-bottom").find('input[name="name"]').val(e.result.name),n("#FAQcloumnManagement .newsCloumn-bottom").find('input[name="name_en"]').val("")})}).on("input",".cloumnSearch",function(){var e=n(this).val();m.find(".sBox").each(function(a,t){-1==n(t).html().indexOf(e)?n(this).css("display","none"):n(this).css("display","inline-block")})}).on("click",".btnDelete",function(){var e;if(m.find(".tagstoAdd .sBox").each(function(a,t){n(t).hasClass("active")&&(e=n(t).attr("id"))}),!e)return void alert("请选择你要删除的问题类型！");i({url:"official/faq_type/"+e+"/delete",modelSeleter:n("#FAQcloumnManagement"),mainSelecter:n(".FAQManagement"),text:"你确定要删除该问题类型吗？"})}).on("click",".tagstoAdd .sBox",function(){n("#FAQcloumnManagement .tagstoAdd").children().removeClass("active"),n(this).addClass("active"),id=n(this).attr("id"),t.ajax({url:"official/faq_type/"+id+"/info",type:"get"},function(n){m.find('input[name="name"]').val(n.result.name),m.find('input[name="name_en"]').val(n.result.name_en)})}).on("click",".btnSave",function(){m.find(".tagstoAdd .sBox").each(function(e,a){n(a).hasClass("active")&&(id=n(this).attr("id"))}),id||alert("请选择栏目！");var e=n('#FAQcloumnManagement input[name="name"]').val(),a=n('#FAQcloumnManagement input[name="name_en"]').val(),i={name:e,name_en:a};if(!n.trim(e)||!n.trim(a))return void alert("请输入所有信息!");t.ajax({url:"official/faq_type/"+id+"/change",type:"post",json:JSON.stringify(i)},function(){n("#FAQcloumnManagement").hide(),n(".FAQManagement").click(),n(".modal-backdrop").hide()})}).appendTo("body").modal();m.find(".tagstoAdd .sBox").first().click()})}});