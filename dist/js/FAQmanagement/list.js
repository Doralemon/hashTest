define(["jquery","text!tpls/websiteManagement/FAQManagementList.html","artTemplate","common/amdApi","FAQmanagement/add","FAQmanagement/edit","FAQmanagement/FAQCloumnManagement","FAQmanagement/search","FAQmanagement/getData","FAQmanagement/delete","bootstrap","page"],function(t,e,n,a,i,o,r,s,c,l){return function(){var m,u,f,d,p=!0,y={limit:10,is_reverse:d||1};a.ajax({url:"official/faq/list",type:"get",json:y},function(g){a.ajax({url:"official/faq_type/list",type:"get"},function(b){g.result.FaqType=b.result;var h=n.render(e,g.result),k=t(h).on("click",".Addnew",function(){i()}).on("click",".columnManagament",function(){r()}).on("click",".btnEdit",function(){if(m=t(this).parents("tr").attr("id"),u||f)return void o(m,b,u,f);o(m,b)}).on("click",".sortByTime",function(){p?(d=1,k.find("span.sortByTime").addClass("glyphicon-sort-by-attributes").removeClass("glyphicon-sort-by-attributes-alt"),k.find("span.sortByTime").text("按时间升序")):(d=0,k.find("span.sortByTime").removeClass("glyphicon-sort-by-attributes").addClass("glyphicon-sort-by-attributes-alt"),k.find("span.sortByTime").text("按时间降序")),p=!p,y.is_reverse=d,a.ajax({url:"official/faq/list",type:"get",json:y},function(t){c.myAjax(y,t)})}).on("click",".btnDelete",function(){if(m=t(this).parents("tr").attr("id"),u||f)return void l(m,u,f);l(m)}).on("click",".firstColumn .sBox",function(){t(".firstColumn .sBox").removeClass("active"),t(this).addClass("active"),f=t(this).attr("id")}).on("click",".mediaSearch",function(){u=k.find('input[name="q"]').val(),y.q=u,y.type=f,y.page=1,s(y)}).on("keydown",'input[name="q"]',function(t){13==t.keyCode&&(t.preventDefault(),k.find(".mediaSearch").trigger("click"))});t(".kandao-contentBody").html(k),c.myAjax(y,g)})}),t(".breadcrumb li").eq(0).on("click",function(){t(".home").trigger("click")})}});