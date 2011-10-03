(function() {
    jc.ui.menuWindow = null;

    jc.ui.createMainMenuWindow = function(showClose) {
        var baseWindow = Ti.UI.createWindow();
        baseWindow.navBarHidden = true;

        var windowMainMenu = jc.ui.createMenuWindow({
            title : 'Jコミ非公式Viewer',
            rows : [{
                title : '新着タイトル'
            }, {
                title : 'タイトル５０音順'
            }, {
                title : '対象別'
            }, {
                title : 'ジャンル別'
            }, {
                title : '年代別'
            }],
            callback : function(e) {
                if(e.index >= 0) {
                    if(e.index == 0) {
                        jc.action.menu.index.load(1);
                    } else if(e.index == 1) {
                        jc.action.menu.title.index();
                    } else                    {
                        jc.action.menu.index.keyword(e.rowData.title);
                    }
                }
            }
        });

        var navigation = Titanium.UI.iPhone.createNavigationGroup({
            window : windowMainMenu
        });
        baseWindow.add(navigation);
        baseWindow.navigation = navigation;

        if(showClose) {
            var button = Ti.UI.createButton({
                title : '閉じる'
            });
            button.addEventListener('click', function() {
                baseWindow.close();
            });
            windowMainMenu.leftNavButton = button;
        }

        var infoButton = Ti.UI.createButton({
            systemButton : Ti.UI.iPhone.SystemButton.INFO_LIGHT
        });
        infoButton.addEventListener('click', function() {
            alert('@donayama');
        });
        windowMainMenu.rightNavButton = infoButton;
        return baseWindow;
    };

    jc.ui.createMenuWindow = function(pParams) {
        var window = Ti.UI.createWindow({
            title : pParams.title
        });
        var tableview = Ti.UI.createTableView({
            data : pParams.rows
        });
        tableview.addEventListener('click', pParams.callback);
        window.add(tableview);
        window.tableview = tableview;
        return window;
    };

    jc.ui.createMenuRow = function(pParams) {
        var row = null;
        var view = Ti.UI.createView({
            backgroundColor : '#fff'
        });
        if(pParams.nextPage == null) {
            Ti.API.info(pParams.imageUrl);
            row = Ti.UI.createTableViewRow({
                height : 146,
                className : 'thumbnail',
                url : pParams.url,
                comicTitle : pParams.title,
                font : {
                    size : 24
                }
            });
            var thumbnail = Ti.UI.createImageView({
                image : pParams.imageUrl,
                width : 100,
                height : 142,
                left : 2,
                top : 2
            });
            var title = Ti.UI.createLabel({
                text : pParams.title,
                left : 108,
                top : 2,
                right : 8,
                height : 40,
                font : {
                    fontSize : 16,
                    fontWeight : 'bold'
                }
            });
            var desc = Ti.UI.createLabel({
                text : pParams.description,
                left : 108,
                top : 44,
                right : 8,
                height : 100,
                font : {
                    fontSize : 12
                }
            });
            view.add(thumbnail);
            view.add(title);
            view.add(desc);
        } else {
            row = Ti.UI.createTableViewRow({
                className : 'row',
                nextPage : pParams.nextPage
            });
            var prompt = Ti.UI.createLabel({
                text : pParams.title
            });
            view.add(prompt);
        }
        row.add(view);
        return row;
    };
})();
