class SpendingCategory {
    constructor(name, importance, iconURL, colorTriplet) {
        this.name = name;
        this.importance = importance;
        this.iconURL = iconURL;
        this.colorTriplet = colorTriplet;
    }

    getName() {
        return this.name;
    }

    getImportance() {
        return this.importance;
    }

    getIconUrl() {
        return this.iconURL;
    }

    getColorTriplet() {
        return this.colorTriplet;
    }
}

var spendingCategories = [
    new SpendingCategory(
        "Food",
        90,
        "./Resources/Food.png",
        [255, 255, 255]
    ),

    new SpendingCategory(
        "Restaurant",
        30,
        "./Resources/Restaurant.png",
        [255, 255, 255]
    ),

    new SpendingCategory(
        "Sport",
        60,
        "./Resources/Sport.png",
        [255, 255, 255]
    ),

    new SpendingCategory(
        "Technology",
        70,
        "./Resources/Technology.png",
        [155, 155, 155]
    ),

    new SpendingCategory(
        "Health",
        100,
        "./Resources/Health.png",
        [155, 155, 155]
    ),

    new SpendingCategory(
        "Rent",
        100,
        "./Resources/Rent.png",
        [155, 155, 155]
    ),

    new SpendingCategory(
        "Books",
        80,
        "./Resources/Books.png",
        [155, 155, 155]
    ),

    new SpendingCategory(
        "Cafe",
        20,
        "./Resources/Cafe.png",
        [155, 155, 155]
    ),

    new SpendingCategory(
        "Clothes",
        80,
        "./Resources/Clothes.png",
        [155, 155, 155]
    ),

    new SpendingCategory(
        "Writing Utensils",
        50,
        "./Resources/Writing Utensils.png",
        [155, 155, 155]
    ),

    new SpendingCategory(
        "Public Transport",
        100,
        "./Resources/Public Transport.png",
        [155, 155, 155]
    ),

    new SpendingCategory(
        "Car",
        40,
        "./Resources/Car.png",
        [155, 155, 155]
    ),

    new SpendingCategory(
        "Gifts",
        10,
        "./Resources/Gifts.png",
        [155, 155, 155]
    )

];

function getSpendingCategoryByName(name) {
    for (let spendingCategory of spendingCategories) {
        if (spendingCategory.getName() == name) {
            return spendingCategory;
        }
    }

    console.log("There is no spending-category with the name " + name + "!");
    return null;
}

function getIndexOfSpendingCategory(spendingCategory) {
    if (spendingCategories.includes(spendingCategory)) {
        console.log("This spending-category is not listed!")
        return null;
    }

    return spendingCategories.indexOf(spendingCategory);;
}