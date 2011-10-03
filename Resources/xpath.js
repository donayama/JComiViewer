// xpath.js
(function() {
    // ネームスペース定義
    jc.xpath = {};

    jc.xpath.scrape = function(url, xpathFunc, throughCount) {
        if(throughCount != null) {
            throughCount = 1;
        }
        var modalWindow = jc.ui.createActivityIndicator('読み込み中です');
        var webview = Ti.UI.createWebView({
            bottom : -200,
            height : 150
        });
        jc.main.add(webview);
        var loadEventHandler = function(e) {
            throughCount--;
            if(throughCount == 0) {
                setTimeout(function() {
                    xpathFunc(e, webview);
                    jc.ui.menuWindow.remove(modalWindow);
                }, 500);
                webview.removeEventListener('load', loadEventHandler);
            }
        };
        webview.addEventListener('load', loadEventHandler);
        webview.url = url;
        jc.ui.menuWindow.add(modalWindow);
    };

    jc.xpath.evaluate = function(web/* Titanium.UI.WebView */, expression/* XPath Expression without "'" */, nodeTypeString, returnValueString) {
        var text = 'document.evaluate(\'' + expression + '\', document, null, ' + nodeTypeString + ', null)' + returnValueString;
        //Ti.API.debug(text);
        return web.evalJS(text);
    };
    jc.xpath.count = function(web/*Titanium.UI.WebView */, expression /* XPath Expression without "'" */) {
        return jc.xpath.evaluate(web, 'count(' + expression + ')', "XPathResult.NUMBER_TYPE", '.numberValue');
    };
    jc.xpath.text = function(web/*Titanium.UI.WebView */, expression/* XPath Expression without "'" */, supressReturn /* boolean*/) {
        var answer = jc.xpath.evaluate(web, expression, "XPathResult.STRING_TYPE", '.stringValue');
        if(supressReturn) {
            answer = answer.replace(/\n/g, "");
            answer = answer.replace(/^\s+$/g, "");
        }
        return answer;
    };
})();
