(function() {
    jc.action.menu.comic = {};
    
    jc.action.menu.comic.parse = function(comicId, page, deferedFunction) {
        var url = 'http://www.j-comi.jp/book/comic/' + comicId + "/page:" + page;
        jc.xpath.scrape(url, function(e, web) {
            var count = jc.xpath.count(web, '//div[@class="box"]');
            var rows = [];
            if(count > 0) {
                for(var j = 1; j <= count; j++) {
                    rows.push(jc.ui.createMenuRow({
                        title : jc.xpath.text(web, '//div[@class="box"][' + j + ']/div[@class="outline"]/h3/a'),
                        imageUrl : jc.xpath.text(web, '//div[@class="box"][' + j + ']/div[@class="img"]//a/img/@src'),
                        url : jc.xpath.text(web, '//div[@class="box"][' + j + ']/div[@class="outline"]/ul/li[@class="icon42"]/a/@href'),
                        description : ''
                    }));
                }
                var nextCount = jc.xpath.count(web, '//ul[@class="forward"]//a[@class="next"]');
                if(nextCount > 0) {
                    rows.push(jc.ui.createMenuRow({
                        title : 'もっと読む...',
                        nextPage : page + 1
                    }));
                }
                deferedFunction(rows);
            }
            web.url = 'about:blank';
            jc.main.remove(web);
        },3);
    };

    jc.action.menu.comic.load = function(comicId, comicTitle, page) {

        var window = jc.ui.createMenuWindow({
            title : comicTitle,
            rows : [],
            callback : function(e) {
                if(e.index >= 0) {
                    if(e.rowData.url != null) {
                        /*
                        var modalWindow = jc.ui.createActivityIndicator('準備中です');
                        var loaded = function(e) {
                            jc.ui.webview.removeEventListener('load', loaded);
                            modalWindow.close();
                            jc.main.remove(modalWindow);
                        };
                        jc.ui.webview.addEventListener('load', loaded);
                        jc.main.add(modalWindow);
                        */
                        var modalWindow = jc.ui.createActivityIndicator('少々お待ちください');
                        jc.main.add(modalWindow);
                        setTimeout(function(){
                            modalWindow.close();
                            jc.main.remove(modalWindow);
                        },1000);

                        jc.ui.webview.url = e.rowData.url;
                        jc.ui.menuWindow.navigation.close();
                        jc.ui.menuWindow.close();
                        return;
                    }
                    if(e.rowData.nextPage != null) {
                        var nextPage = e.rowData.nextPage;
                        jc.action.menu.comic.parse(comicId, nextPage, function(pRows) {
                            pRows.forEach(function(element, index, array) {
                                window.tableview.appendRow(element);
                            });
                            window.tableview.deleteRow(e.index);
                            window.tableview.scrollToIndex(e.index);
                        });
                    }
                }
            }
        });
        jc.ui.menuWindow.navigation.open(window, {
            animated : true
        });
        jc.action.menu.comic.parse(comicId, 1, function(pRows) {
            pRows.forEach(function(element, index, array) {
                window.tableview.appendRow(element);
            });
        });
    };
})();
