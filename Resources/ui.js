(function() {
    // ネームスペース定義
    jc.ui = {};

    // main window
    jc.ui.createApplicationWindow = function() {
        var window = Ti.UI.createWindow();

        jc.ui.webview = Ti.UI.createWebView({
            url : 'about:blank',
            scalesPageToFit : true
        });

        jc.ui.toolbar = jc.ui.createApplicationToolbar();

        jc.ui.webview.add(jc.ui.toolbar.control);
        window.add(jc.ui.webview);

        // shakeイベント
        Ti.Gesture.addEventListener("shake", function() {
            jc.ui.toolbar.toggle();
        });
        return window;
    };
    // ツールバーの定義
    jc.ui.createApplicationToolbar = function() {
        var flexSpace = Titanium.UI.createButton({
            systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
        });

        var bookmark = Titanium.UI.createButton({
            systemButton : Titanium.UI.iPhone.SystemButton.BOOKMARKS
        });
        bookmark.addEventListener('click', function() {
            jc.doit.showMenu(true);
        });
        var action = Titanium.UI.createButton({
            systemButton : Titanium.UI.iPhone.SystemButton.ACTION
        });
        action.addEventListener('click', function() {
            jc.doit.showAction();
        });
        var info = Titanium.UI.createButton({
            systemButton : Titanium.UI.iPhone.SystemButton.INFO_LIGHT
        });
        info.addEventListener('click', function() {
            jc.doit.showInfo();
        });
        var cancel = Titanium.UI.createButton({
            systemButton : Titanium.UI.iPhone.SystemButton.CANCEL
        });
        cancel.addEventListener('click', function() {
            hide();
        });
        var toolbar = Ti.UI.createToolbar({
            items : [bookmark, flexSpace,  cancel],
            //items : [bookmark, flexSpace, action, flexSpace, info, flexSpace, cancel],
            bottom : -50,
            borderTop : true,
            borderBottom : false,
            translucent : true
        });
        var visible = false;
        var show = function() {
            toolbar.animate({
                bottom : 0,
                duration : 200
            });
            visible = true;
            // 再表示する
            //Titanium.UI.iPhone.showStatusBar();
        };
        var hide = function() {
            toolbar.animate({
                bottom : -50,
                duration : 200
            });
            visible = false;
            // ステータスバーを消す
            //Titanium.UI.iPhone.hideStatusBar();
        }
        return {
            control : toolbar,
            toggle : function() {
                if(!visible) {
                    show();
                } else {
                    hide();
                }
            }
        }
    };

    jc.ui.createActionSheet = function() {
        // ダイアログの生成
        var dialog = Titanium.UI.createOptionDialog();

        // タイトルということになっていますが、プロンプト的な位置づけですね。
        dialog.setTitle('どの処理を実行しますか？');

        // ボタンの配置（ちなみに配列なので0オリジンでindexを持ちます）
        dialog.setOptions(["更新", "削除", "キャンセル"]);

        // 削除などの破壊的な挙動をするボタンは赤くするという規定が
        // iPhoneにはあるのでそれに該当するボタンのindexを指定します。
        dialog.setDestructive(1);

        // キャンセルボタンにも同様の規定があるので、indexを指定します。
        dialog.setCancel(2);

        // ボタン選択時の処理はイベントハンドラを記述します。
        // 第一引数のindexプロパティで選択されたボタンのindexが設定されます。
        dialog.addEventListener('click', function(event) {
            if(event.index == 0) {
                // 更新処理
            } else if(event.index == 1) {
                // 削除処理(event.desctructive == trueでも可能)
            }
            // キャンセル時はevent.cancel == trueとなる
        });
        return dialog;

    };
    
    jc.ui.createActivityIndicator = function(message){
        var modalWindow = Ti.UI.createWindow({
            borderRadius : 16,
            borderColor : '#999',
            opacity : 0.8,
            backgroundColor : '#000',
            width : 200,
            height : 40
        });
        var ind = Ti.UI.createActivityIndicator({
            message : message,
            color : 'white'
        });
        ind.show();
        modalWindow.add(ind);
        return modalWindow;
    }
})();

Ti.include('/ui/menu.js', '/ui/info.js');
