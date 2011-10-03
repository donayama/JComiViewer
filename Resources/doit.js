(function() {
    jc.doit = {};
    jc.action = {};
    jc.action.menu = {};

    jc.doit.start = function() {
        jc.main = jc.ui.createApplicationWindow();
        jc.main.open();
        jc.doit.showMenu();
    };

    jc.doit.showAction = function() {
        var actionSheet = jc.ui.createActionSheet();
        actionSheet.show();
    };

    jc.doit.showMenu = function(showClose) {
        jc.ui.menuWindow = jc.ui.createMainMenuWindow(showClose);
        jc.ui.menuWindow.open({
            modal : true,
            modalTransitionStyle : Ti.UI.iPhone.MODAL_TRANSITION_STYLE_COVER_VERTICAL,
            modalStyle : Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET
        });
    };

    jc.doit.showInfo = function() {
        var window = jc.ui.createInfoWindow();
        window.open({
            modal : true,
            modalTransitionStyle : Ti.UI.iPhone.MODAL_TRANSITION_STYLE_FLIP_HORIZONTAL
            //modalStyle : Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET
        });

    };
})();

Ti.include('/action/menu_index.js', '/action/menu_title.js','/action/menu_comic.js');
