define(["jquery","artTemplate","common/amdApi"],function(n,e,i,r){return function(e,i,r,c,t){if(e){var o=!0;if(t.forEach(function(n,i){return n==e&&(alert("此栏目已选择！"),o=!1),!1}),o){var a='<div class="commonBox text-center" id="'+e+'">'+i+'<span class="glyphicon glyphicon-remove-circle"></span></div>';r.find(c).append(a),t.push(e),r.find("span.glyphicon-remove-circle").on("click",function(){n(this).parent().remove();var e=n(this).parent().attr("id");t.forEach(function(n,i){return n==e&&t.splice(i,1),!1})})}}}});