class Dashboard {
    constructor(spendingMonth) {
        this.spendingMonth = spendingMonth;
        this.dashboardElement = document.getElementById("dashboard");
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
        let budgetButton = createButtonElement(budgetOverviewDiv, "budgetButton", "budgetButton", function() {
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

    setStatisticsButton() {
        let statisticsButtonDiv = document.getElementById("statisticsButtonDiv");
        createTextButtonElement(statisticsButtonDiv, "view statistics", "statisticsButton", function () {
            dashboard.openStatistics();
        });
    }

    openStatistics() {

    }

    closeStatistics() {

    }
}
