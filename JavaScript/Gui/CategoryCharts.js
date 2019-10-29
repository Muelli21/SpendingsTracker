function printCategoryCharts() {

    let color = new Colors();
    let dataSets = [];
    let backgroundColors = [];
    let categoryChartSection = document.getElementById("statistics");
    let chartDiv = createHTMLElement(categoryChartSection, "div", "categoryChart");
    let element = createHTMLElement(chartDiv, "canvas", "categoryChartCanvas");
    let htmlElement = element.getContext('2d');
    let parent = element.parentElement;
    parent.style.width = "100%";
    parent.style.height = "50vh";


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

    console.log(countedCategories);

    dataSets.push({
        label: "Number of spendings of this category",
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
                text: "Spendings per category"
            },
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                display: false
            },
        }
    });
}