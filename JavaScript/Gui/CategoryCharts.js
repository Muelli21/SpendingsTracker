function printCategoryChartByNumber() {

    let color = new Colors();
    let dataSets = [];
    let backgroundColors = [];
    let categoryChartSection = document.getElementById("statisticsSection");

    let chartDiv = setElement(categoryChartSection, "categoryChart", "", "div");
    let element = setElement(chartDiv, "categoryChartCanvas", "", "canvas");
    let htmlElement = element.getContext('2d');
    let parent = element.parentElement;

    let spendingMonth = dashboard.getSpendingMonth();
    let spendings = spendingMonth.getSpendings();
    let countedCategories = {};

    for (let spendingCategory of spendingCategories) {
        countedCategories[spendingCategory.getName()] = 0;
        backgroundColors.push(color.getRGBAString(spendingCategory.getColorTriplet(), 0.8));
    }

    for (let spending of spendings) {
        let spendingCategory = spending.getType();
        countedCategories[spendingCategory.getName()]++;
    }

    dataSets.push({
        label: "Number of spendings in this category",
        data: Object.values(countedCategories),
        backgroundColor: backgroundColors,
    });

    new Chart(htmlElement, {
        type: "horizontalBar",
        data: {
            labels: Object.keys(countedCategories),
            datasets: dataSets
        },
        options: {
            title: {
                display: true,
            },
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                display: false
            },
        }
    });
}

function printCategoryChartBySum() {

    let color = new Colors();
    let dataSets = [];
    let backgroundColors = [];
    let categoryChartSection = document.getElementById("statisticsSection");

    let chartDiv = setElement(categoryChartSection, "categoryChart", "", "div");
    let element = setElement(chartDiv, "categoryChartCanvas", "", "canvas");
    let htmlElement = element.getContext('2d');
    let parent = element.parentElement;
    //parent.style.width = "100%";

    let spendingMonth = dashboard.getSpendingMonth();
    let spendings = spendingMonth.getSpendings();
    let sumPerCategory = new Map();

    for (let spendingCategory of spendingCategories) {
        backgroundColors.push(color.getRGBAString(spendingCategory.getColorTriplet(), 0.8));
        sumPerCategory.set(spendingCategory.getName(), 0);
    }


    for (let spending of spendings) {
        let cost = spending.getCost();
        let category = spending.getType();
        let categoryName = category.getName();
        let currentSum = sumPerCategory.get(categoryName);
        sumPerCategory.set(categoryName, currentSum + cost);
    }

    dataSets.push({
        label: "Sum of spendings in this category",
        data: [...sumPerCategory.values()],
        backgroundColor: backgroundColors,
    });

    new Chart(htmlElement, {
        type: "horizontalBar",
        data: {
            labels: [...sumPerCategory.keys()],
            datasets: dataSets
        },
        options: {
            title: {
                display: true,
            },
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                display: false
            },
        }
    });
}