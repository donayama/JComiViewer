(function() {
    jc.action.menu.title = {};

    jc.action.menu.title.parse = function(dan, page, deferedFunction) {
        var url = 'http://www.j-comi.jp/title/klist/' + dan + '/page:' + page;
        jc.xpath.scrape(url, function(e, web) {
            var count = jc.xpath.count(web, '//li[@class="item title"]');
            var rows = [];
            if(count > 0) {
                for(var j = 1; j <= count; j++) {
                    rows.push(jc.ui.createMenuRow({
                        title : jc.xpath.text(web, '//li[@class="item title"][' + j + ']/div[@class="outline"]//a'),
                        imageUrl : jc.xpath.text(web, '//li[@class="item title"][' + j + ']/div[@class="thumbnail"]/a/img/@src'),
                        url : jc.xpath.text(web, '//li[@class="item title"][' + j + ']/div[@class="outline"]//a/@href'),
                        description : jc.xpath.text(web, '//li[@class="item title"][' + j + ']/div[@class="outline"]/p')
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
        }, 3);
    };
    jc.action.menu.title.index = function() {
        var window = jc.ui.createMenuWindow({
            title : 'タイトル五十音順',
            rows : [{
                title : 'あ'
            }, {
                title : 'か'
            }, {
                title : 'さ'
            }, {
                title : 'た'
            }, {
                title : 'な'
            }, {
                title : 'は'
            }, {
                title : 'ま'
            }, {
                title : 'や'
            }, {
                title : 'ら'
            }, {
                title : 'わ'
            }],
            callback : function(e) {
                if(e.index >= 0) {
                    jc.action.menu.title.load(e.rowData.title, 1);
                }
            }
        });
        jc.ui.menuWindow.navigation.open(window, {
            animated : true
        });
        /*
        jc.action.menu.title.parse(dan, 1, function(pRows) {
            pRows.forEach(function(element, index, array) {
                window.tableview.appendRow(element);
            });
        });
        */
    };
    jc.action.menu.title.load = function(dan, page) {

        var window = jc.ui.createMenuWindow({
            title : 'タイトル[' + dan + ']',
            rows : [],
            callback : function(e) {
                if(e.index >= 0) {
                    if(e.rowData.url != null) {
                        var comicId = e.rowData.url.substring(e.rowData.url.lastIndexOf('/'), e.rowData.url.length);
                        jc.action.menu.comic.load(comicId, e.rowData.comicTitle, 1);
                        return;
                    }
                    if(e.rowData.nextPage != null) {
                        var nextPage = e.rowData.nextPage;
                        jc.action.menu.title.parse(dan, nextPage, function(pRows) {
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
        jc.action.menu.title.parse(dan, 1, function(pRows) {
            pRows.forEach(function(element, index, array) {
                window.tableview.appendRow(element);
            });
        });
    };
})();
