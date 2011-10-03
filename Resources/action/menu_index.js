(function() {
    // ネームスペース定義
    jc.action.menu.index = {};

    jc.action.menu.index.parse = function(page, query, deferedFunction) {
        var url = 'http://www.j-comi.jp/title/index/page:' + page;
        if(query != null) {
            url += '/query:' + query;
        }
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
    jc.action.menu.index.load = function(page, query) {
        var window = jc.ui.createMenuWindow({
            title : query ? query : '新着タイトル',
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
                        jc.action.menu.index.parse(nextPage, query, function(pRows) {
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
        jc.action.menu.index.parse(1, query, function(pRows) {
            pRows.forEach(function(element, index, array) {
                window.tableview.appendRow(element);
            });
        });
    };

    jc.action.menu.index.keyword = function(keyword) {
        var titles = [];
        if(keyword == 'ジャンル別') {
            titles = ['恋愛', 'バトル', 'ギャグ/コメディ', '学園', 'SF/メカ', 'ラブコメ', '時代物', 'ファンタジー', 'お色気', 'スポーツ', '4コマ'];
        }
        if(keyword == '対象別'){
            titles = ['少年漫画','少女漫画','青年漫画','女性漫画','ライトノベル'];
        }
        if(keyword == '年代別'){
            titles = ['2000年代','1990年代','1980年代','1970年代'];
        }
        if(titles.length == 0){
            return;
        }
        var titleRows = [];
        titles.forEach(function(element, index, array) {
            titleRows.push({
                title : element
            });
        });
        var window = jc.ui.createMenuWindow({
            title : keyword,
            rows : titleRows,
            callback : function(e) {
                if(e.index >= 0) {
                    jc.action.menu.index.load(1, e.rowData.title);
                }
            }
        });
        jc.ui.menuWindow.navigation.open(window, {
            animated : true
        });
    };
})();
