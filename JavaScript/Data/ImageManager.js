function preloadImages() {

    for (let spendingCategory of spendingCategories) {
        let url = spendingCategory.getIconUrl();
        preloadImage(url);
    }

    preloadImage(CLICK_ICON);
    preloadImage(CLICK_ICON_FILLED);
    preloadImage(PLUS_ICON_FILLED);
    preloadImage(MONEY_ICON);
    preloadImage(RESET_ICON);
}


function preloadImage(url) {
    var img = new Image();
    img.src = url;
}