class Dashboard {
    constructor(spendingMonth) {
        this.spendingMonth = spendingMonth;
        this.dashboardElement = document.getElementById("dashboard");
        this.statisticsElement = document.getElementById("statistics");
        this.displayingStatistics = false;
        dashboard = this;
    }

    getSpendingMonth() {
        return this.spendingMonth;
    }

    clear() {

        let budgetOverviewDiv = document.getElementById("budgetOverviewDiv");
        let spendingButtonDiv = document.getElementById("spendingButtonDiv");
        let statisticsButtonDiv = document.getElementById("statisticsButtonDiv");
        let statistics = document.getElementById("statistics");
        clearElement(budgetOverviewDiv);
        clearElement(spendingButtonDiv);
        clearElement(statisticsButtonDiv);
        clearElement(statistics);
    }

    open() {
        this.clear();
        this.setBudgetOverview();
        this.setSpendingButton();
        this.setStatisticsButton();
        console.log("This dashboard depicts information on the following month: " + this.spendingMonth.getMonth() + "/" + this.spendingMonth.getYear());
    }

    setBudgetOverview() {

        let expenses = this.spendingMonth.getTotalExpenses();
        let budget = this.spendingMonth.getBudget();
        let savings = budget - expenses;

        let budgetOverviewDiv = document.getElementById("budgetOverviewDiv");
        let budgetButton = createButtonElement(budgetOverviewDiv, "budgetButton", "budgetButton", function () {
            inputGui.openBudgetInput();
        });

        let label = budgetButton[1];

        createHeadlineElement(label, expenses + "€", "h1", "expensesMonitor");
        createHTMLElement(label, "hr", "line");
        let budgetOverviewContainer = createHTMLElement(label, "div", "flexContainer");
        let budgetMonitor = createTextElement(budgetOverviewContainer, budget + "€", "budgetMonitor one-half");
        let savingsMonitor = createTextElement(budgetOverviewContainer, savings + "€", "savingsMonitor one-half");
    }

    setSpendingButton() {
        let spendingButtonDiv = document.getElementById("spendingButtonDiv");
        createTextButtonElement(spendingButtonDiv, "+", "spendingButton", function () {
            inputGui.openCategorySelector();
        });
    }

    setResetButton() {
        let statisticsDiv = document.getElementById("statistics");
        let resetButtonDiv = createHTMLElement(statisticsDiv, "div", "resetButtonDiv");
        createTextButtonElement(resetButtonDiv, "reset", "resetButton", function () {
            inputGui.openResetInput();
        });
    }

    setStatisticsButton() {
        let statisticsButtonDiv = document.getElementById("statisticsButtonDiv");
        createTextButtonElement(statisticsButtonDiv, "toggle statistics", "statisticsButton", function () {

            if (this.displayingStatistics) {
                dashboard.closeStatistics();
                this.displayingStatistics = false;
            } else {
                dashboard.openStatistics();
                this.displayingStatistics = true;
            }
        });
    }

    openStatistics() {
        let statisticsDiv = document.getElementById("statistics");
        let statisticsSection = document.getElementById("statisticsSection");
        $("html, body").animate({ scrollTop: statisticsSection.offsetTop }, "slow");


        let currentSpendings = this.spendingMonth.getSpendings();
        let spendingsTable = createHTMLElement(statisticsDiv, "table", "spendingsTable");

        let spendingsTableRow = createHTMLElement(spendingsTable, "tr", "spendingsTableRow");

        let spendingsTableHeadline1 = createHTMLElement(spendingsTableRow, "th", "spendingsTableHeadline");
        spendingsTableHeadline1.innerHTML = "Category";

        let spendingsTableHeadline2 = createHTMLElement(spendingsTableRow, "th", "spendingsTableHeadline");
        spendingsTableHeadline2.innerHTML = "Name";

        let spendingsTableHeadline3 = createHTMLElement(spendingsTableRow, "th", "spendingsTableHeadline");
        spendingsTableHeadline3.innerHTML = "Price";

        let spendingsTableHeadline4 = createHTMLElement(spendingsTableRow, "th", "spendingsTableHeadline");
        spendingsTableHeadline4.innerHTML = monthIndexToString(this.spendingMonth.getMonth() -1);

        for (let spending of currentSpendings) {

            let spendingCategory = spending.getType();

            let spendingEntry = createHTMLElement(spendingsTable, "tr", "spendingsTableRow");

            let spendingEntryCategory = createHTMLElement(spendingEntry, "td", "spendingEntryCenter");

            let spendingEntryIcon = createHTMLElement(spendingEntryCategory, "img", "spendingEntryIcon").src = spendingCategory.iconURL;

            let spendingEntryName = createHTMLElement(spendingEntry, "td", "spendingEntry");
            spendingEntryName.innerHTML = spending.getName();

            let spendingEntryPrice = createHTMLElement(spendingEntry, "td", "spendingEntry");
            spendingEntryPrice.innerHTML = spending.getCost() + "€";

            let spendingEntryDate = createHTMLElement(spendingEntry, "td", "spendingEntryCenter");
            let spendingDate = new Date();
            spendingDate.setTime(spending.getTimeStamp());
            spendingEntryDate.innerHTML = spendingDate.getDate();
        }

        printCategoryCharts();
        this.setResetButton();
    }

    clearStatistics() {
        clearElement(this.statisticsElement);
    }

    closeStatistics() {
        this.clearStatistics();
    }
}
