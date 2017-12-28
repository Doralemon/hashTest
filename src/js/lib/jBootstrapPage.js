(function($) {
    $.fn.jBootstrapPage = function(config) {
        //  if (this.size() != 1)
        //     $.error('请为这个插件提供一个唯一的编号');
        var c = {
            pageSize: 10,
            total: 0,
            maxPages: 1,
            realPageCount: 1,
            lastSelectedIndex: 1,
            selectedIndex: 1,
            maxPageButton: 3,
            pageNow: 1,
            onPageClicked: null
        };
        //      var firstBtn, preBtn, nextBtn, lastBtn;
        var preBtn, nextBtn;
        return this.each(function() {
            var $this = $(this);
            if (config) $.extend(c, config);
            init();
            bindALL();

            function init() {
                $this.find('li').remove();
                c.maxPages = Math.ceil(c.total / c.pageSize);

                if (c.maxPages < 1) return;
                //          	$this.append('<li class="disabled"><a class="first" href="#">&laquo;</a></li>');

                $this.append('<li class="disabled"><a class="pre" href="#"></a></li>');

                var pageCount = c.maxPages < c.maxPageButton ? c.maxPages : c.maxPageButton;
                var pNum = 0;
                for (var index = 1; index <= pageCount; index++) {
                    pNum++;
                    $this.append('<li class="page" pNum="' + pNum + '"><a href="#" page="' + index + '">' + index + '</a></li>');
                }

                $this.append('<li><a class="next" href="#"></a></li>');
                //      		$this.append('<li><a class="last" href="#">&raquo;</a></li>');
                $this.append('<li class="goTo">跳转到<input id="number" min="1" onpaste="return false"/><a class="go">GO</a></li>');
                if (c.pageNow == 1) {
                    $this.find('li:last-child').prev().removeClass('disabled');
                    $this.find('li:nth-child(1)').addClass('disabled');
                } else if (c.pageNow > 1 && c.pageNow < c.maxPages) {
                    $this.find('li:first-child').removeClass('disabled');
                    $this.find('li:last-child').prev().removeClass('disabled');
                } else {
                    $this.find('li:first-child').removeClass('disabled');
                    $this.find('li:last-child').prev().addClass('disabled');
                }
                if (typeof(c.pageNow) == "string") {
                    c.pageNow = parseInt(c.pageNow)
                }
                $this.find('li:nth-child(' + (c.pageNow + 1) + ')').addClass('active');
                //      		firstBtn = $this.find('li a.first').parent();
                preBtn = $this.find('li a.pre').parent();
                //      		lastBtn = $this.find('li a.last').parent();
                nextBtn = $this.find('li a.next').parent();
                document.getElementById("number").addEventListener("input", function(event) {
                    event.target.value = event.target.value.replace(/\-/g, "");
                    event.target.value = event.target.value.replace(/\D/g, '');
                });
            }

            function mathPrePage(currButtonNum, currPage, maxPage, showPage) {
                if (maxPage < 1) return;

                //选中的按钮大于中间数，就进一位
                var middle = Math.ceil(showPage / 2); // 4
                // 4 > 3
                // 5 - 4 + 3 
                if ((currButtonNum != currPage && currButtonNum < middle) || currButtonNum + 1 == 2) {
                    $this.find('li.page').remove();

                    //1 2 3 4 5 6 7 8 9 10
                    //   
                    var endPages = currPage + Math.floor(middle / 2);
                    if (endPages < c.maxPageButton) endPages = c.maxPageButton + 1;

                    var startPages = endPages - c.maxPageButton;

                    if (startPages <= 0) startPages = 1;

                    if (endPages - startPages >= c.maxPageButton) {
                        var d = endPages - startPages - c.maxPageButton;
                        if (d == 0) d = 1;
                        endPages -= d;
                    }

                    var pNum = 0;
                    var html = '';
                    for (var index = startPages; index <= endPages; index++) {
                        pNum++;
                        html += '<li class="page" pNum="' + pNum + '"><a href="#" page="' + index + '">' + index + '</a></li>';

                    }

                    $this.find('li:nth-child(2)').before(html);

                    bindPages();
                }
            }

            function mathNextPage(currButtonNum, currPage, maxPage, showPage) {
                if (maxPage < 1) return;
                var offsetRight = 2;
                //选中的按钮大于中间数，就进一位
                var middle = showPage - 1; // 4
                // 4 > 3
                // 5 - 4 + 3 

                if ((currButtonNum != currPage + 1 || maxPage > showPage) && currButtonNum >= middle) {
                    //显示后面2个按钮
                    var startPages = currPage - offsetRight;
                    var endPages = currPage + middle;

                    endPages = endPages >= maxPage ? maxPage : endPages;

                    if (endPages <= c.maxPageButton) endPages = c.maxPageButton;

                    if (endPages - startPages >= c.maxPageButton) {
                        var d = endPages - startPages - c.maxPageButton;
                        endPages -= d;
                    }

                    if (endPages == maxPage) endPages++;

                    if (endPages - startPages < c.maxPageButton) {
                        var d = c.maxPageButton - (endPages - startPages);
                        startPages -= d;
                    }

                    var pNum = 0;
                    var html = '';
                    for (var index = startPages; index < endPages; index++) {
                        pNum++;
                        html += '<li class="page" pNum="' + pNum + '"><a href="#" page="' + index + '">' + index + '</a></li>';
                    }

                    $this.find('li.page').remove();
                    $this.find('li:nth-child(2)').before(html);
                    bindPages();
                }

            }

            function clickGo(selectedIndex, inputVal, allPage, pageSize) {
                if (!inputVal) {
                    return false;
                }
                if (!parseInt(inputVal)) {
                    return false;
                }
                //先判断是否在当前页码
                var falg = true
                    // console.log(inputVal)
                $('.page').each(function(v, i) {
                    if ($(i).find('a').text() == inputVal) {
                        falg = false
                    }
                })
                if (inputVal == 2) falg = true
                if (!falg || allPage < inputVal) return;

                //输入页码不在当前页码
                var pNum = allPage - inputVal > pageSize ? inputVal : inputVal - (pageSize - (allPage - inputVal)) //页码起点
                if (inputVal == 2) {
                    pNum = 1
                }
                // console.log(pNum)
                var endPage = pNum + pageSize
                if (inputVal == endPage) {
                    pNum += 1
                } else {
                    endPage -= 1
                }
                var html = '';
                var num = 1;
                for (var index = pNum; index <= endPage; index++) {
                    pNum++;
                    html += '<li class="page" pNum="' + num + '"><a href="#" page="' + index + '">' + index + '</a></li>';
                    num += 1
                }
                $this.find('li.page').remove();
                $this.find('li:nth-child(2)').before(html);
                $("[page=" + $(".goTo").find("input").val() + "]").parent().addClass("active").siblings().removeClass("active");

                bindPages();
            }

            function onClickPage(pageBtn) {
                c.lastSelectedIndex = c.selectedIndex;
                c.selectedIndex = parseInt(pageBtn.text());

                if (c.onPageClicked) {
                    c.onPageClicked.call(this, $this, c.selectedIndex - 1);
                }

                $this.find('li.active').removeClass('active');
                pageBtn.parent().addClass('active');

                if (c.selectedIndex > 1) {
                    if (preBtn.hasClass('disabled')) {
                        //	            		firstBtn.removeClass("disabled");
                        preBtn.removeClass("disabled");

                        bindFirsts();
                    }
                } else {
                    if (!preBtn.hasClass('disabled')) {
                        //          			firstBtn.addClass("disabled");
                        preBtn.addClass("disabled");
                    }
                }

                if (c.selectedIndex >= c.maxPages) {
                    if (!nextBtn.hasClass('disabled')) {
                        nextBtn.addClass("disabled");
                        //          			lastBtn.addClass("disabled");
                    }
                } else {
                    if (nextBtn.hasClass('disabled')) {
                        nextBtn.removeClass("disabled");
                        //          			lastBtn.removeClass("disabled");
                        bindLasts();
                    }
                }
            }

            function onPageBtnClick($_this) {
                //          	var selectedText = $_this.text();
                var selectedBtn = $this.find('li.active').find('a');

                if ($_this.hasClass("next")) {
                    var selectedIndex = parseInt(selectedBtn.text());
                    var selectNum = parseInt($this.find('li.active').attr('pNum')) + 1;
                    if (selectNum > c.maxPageButton) selectNum = c.maxPageButton - 1;

                    if (selectedIndex > 0) {
                        mathNextPage(selectNum, selectedIndex, c.maxPages, c.maxPageButton);
                        selectedBtn = $this.find('li.page').find('a[page="' + (selectedIndex + 1) + '"]');
                    }
                } else if ($_this.hasClass("pre")) {
                    var selectedIndex = parseInt(selectedBtn.text()) - 1;
                    var selectNum = parseInt($this.find('li.active').attr('pNum')) - 1;
                    if (selectNum < 1) selectNum = 1;

                    mathPrePage(selectNum, selectedIndex, c.maxPages, c.pageSize);
                    selectedBtn = $this.find('li.page').find('a[page="' + (selectedIndex) + '"]');
                } else if ($_this.hasClass("go")) {
                    var selectedIndex = parseInt(selectedBtn.text()) //当前的页码
                    var inputVal = parseInt($('.goTo input').val()) //输入的页码
                    var allPage = Math.ceil(c.total / c.pageSize) //总共的页码
                    var inputTest = /^\+?[1-9][0-9]*$/;
                    if (!inputTest.test(inputVal)) {
                        return;
                    }
                    if (!inputVal) {
                        return
                    }
                    if (inputVal > allPage) {
                        alert("您输入的页码不存在，请重新输入！");
                        return;
                    }
                    clickGo(selectedIndex, inputVal, allPage, c.maxPageButton)
                    selectedBtn = $this.find('li.page').find('a[page="' + inputVal + '"]');
                } else {
                    selectedBtn = $_this;
                }

                onClickPage(selectedBtn);
            }

            function bindPages() {
                $this.find("li.page a").each(function() {
                    if ($(this).parent().hasClass('disabled')) return;

                    $(this).on('pageClick', function(e) {
                        onPageBtnClick($(this));
                    });
                });

                $this.find("li.page a").click(function(e) {
                    e.preventDefault();

                    $(this).trigger('pageClick', e);
                });
            }

            function bindFirsts() {
                $this.find("li a.first,li a.pre").each(function() {
                    if ($(this).parent().hasClass('disabled')) return;

                    $(this).unbind('pageClick');
                    $(this).on('pageClick', function(e) {
                        onPageBtnClick($(this));
                    });
                });
            }

            function bindLasts() {
                $this.find("li a.last,li a.next").each(function() {
                    if ($(this).parent().hasClass('disabled')) return;

                    $(this).unbind('pageClick');
                    $(this).on('pageClick', function(e) {
                        onPageBtnClick($(this));
                    });
                });
            }

            function bindALL() {
                $this.find("li.page a,li a.first,li a.last,li a.pre,li a.next,.go").each(function() {
                    if ($(this).parent().hasClass('disabled')) return;

                    $(this).on('pageClick', function(e) {
                        onPageBtnClick($(this));
                    });
                });

                $this.find("li.page a,li a.first,li a.last,li a.pre,li a.next,.go").click(function(e) {
                    e.preventDefault();

                    if ($(this).parent().hasClass('disabled')) return;

                    $(this).trigger('pageClick', e);
                });
            }

        });
    };
})(jQuery);