(function() {
   jc.ui.createInfoWindow = function() {
        var window = Ti.UI.createWindow({
            title : '作品情報'
        });

/*
        // 格納する行データ配列を用意する
        var rowData = [];

        // １つ目のスイッチとボタン
        var row1 = Ti.UI.createTableViewRow({
            height : 50
        });
        var sw1 = Ti.UI.createSwitch({
            right : 10,
            value : false
        });
        row1.add(sw1);

        var button1 = Ti.UI.createButton({
            style : Titanium.UI.iPhone.SystemButton.DISCLOSURE,
            left : 10
        });
        row1.add(button1);
        row1.className = 'control';
        rowData.push(row1);

        // ２つ目は省略

        // 先ほど同様にGROUPEDstyleを指定する
        var tableView = Ti.UI.createTableView({
            data : rowData,
            style : Titanium.UI.iPhone.TableViewStyle.GROUPED,
            top : 50
        });
        window.add(tableView);
        */
        return window;

    };
})();
