class SpendingCategory {
    constructor(name, importance, iconURL) {
        this.name = name;
        this.importance = importance;
        this.iconURL = iconURL;
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
}

var spendingCategories = [
    new SpendingCategory("Food", 90, "./Resources/Food.png"),
    new SpendingCategory("Restaurant", 30, "./Resources/Restaurant.png"),
    new SpendingCategory("Sport", 60, "./Resources/Sport.png"),
    new SpendingCategory("Technology", 70, "./Resources/Technology.png"),
    new SpendingCategory("Health", 100, "./Resources/Health.png"),
    new SpendingCategory("Rent", 100, "./Resources/Rent.png"),
    new SpendingCategory("Books", 80, "./Resources/Books.png"),
    new SpendingCategory("Cafe", 20, "./Resources/Cafe.png"),
    new SpendingCategory("Clothes", 80, "./Resources/Clothes.png"),
    new SpendingCategory("Writing Utensils", 50, "./Resources/Writing Utensils.png"),
    new SpendingCategory("Public Transport", 100, "./Resources/Public Transport.png"),
    new SpendingCategory("Car", 40, "./Resources/Car.png"),
    new SpendingCategory("Gifts", 10, "./Resources/Gifts.png")
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