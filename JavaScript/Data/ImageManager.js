function preloadImages() {

    for (let spendingCategory of spendingCategories) {
        let url = spendingCategory.getIconUrl();
        preloadImage(url);
    }
}


function preloadImage(url) {
    var img = new Image();
    img.src = url;
}