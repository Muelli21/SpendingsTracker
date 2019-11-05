function preloadImages() {

    for (let spendingCategory of spendingCategories) {
        let url = spendingCategory.getIconUrl();
        preloadImage(url);
        console.log("The image with the following url has been preloaded: " + spendingCategory.getIconUrl());
    }
}


function preloadImage(url) {
    var img = new Image();
    img.src = url;
}