const clickMeIcon = "./Resources/ClickMeIcon.png";
const clickMeIconFilled = "./Resources/ClickMeIconFilled.png";


class Dashboard {
    constructor(spendingMonth) {
        this.spendingMonth = spendingMonth;
        this.dashboardElement = document.getElementById("dashboard");
        this.statisticsElement = document.getElementById("statistics");
        this.displayingStatistics = false;
        this.displayingSelection = false;
        dashboard = this;
    }

    getSpendingMonth() {
        return this.spendingMonth;
    }

    clear() {

        let headline = document.getElementById("headline");
        let expensesDiv = document.getElementById("expensesDiv");
        let budgetDiv = document.getElementById("budgetDiv");
        let spendingButtonDiv = document.getElementById("spendingButtonDiv");
        let statisticsButtonDiv = document.getElementById("statisticsButtonDiv");
        let statistics = document.getElementById("statistics");
        let menuItemDiv = document.getElementById("menuItemDiv");
        let selectionGui = document.getElementById("selectionGui");

        clearElement(headline);
        clearElement(expensesDiv);
        clearElement(budgetDiv);
        clearElement(spendingButtonDiv);
        clearElement(statisticsButtonDiv);
        clearElement(statistics);
        clearElement(menuItemDiv);
        clearElement(selectionGui);

        let statisticsSection = document.getElementById("statisticsSection");
        toggleDisplayVisibility(statisticsSection, false);
    }

    open() {
        this.clear();
        this.setMenu();
        this.setHeadline();
        this.setBudgetOverview();
        this.setSpendingButton();
        this.setStatisticsButton();

        this.dashboardElement.style.overflow = "unset";
        this.displayingSelection = false;

        console.log("This dashboard depicts information on the following month: " + this.spendingMonth.getMonth() + "/" + this.spendingMonth.getYear());
    }

    setMenu() {
        let menuItemDiv = document.getElementById("menuItemDiv");
        let menuItem = setHTMLElement(menuItemDiv, "div", "menuItem");
        menuItem.id = "menuItem";
        menuItem.onclick = this.openMenu;

        for (let index = 0; index < 3; index++) {
            let bar = setHTMLElement(menuItem, "div", "bars");
            bar.id = "bar" + (index + 1);
        }
    }

    openMenu() {

        let selectionGui = document.getElementById("selectionGui");
        let spendingMonths = allSpendingMonths; 
        let selectionDiv = setHTMLElement(selectionGui, "div", "selectionDiv");

        document.getElementById('menuItem').classList.toggle("change");

        if(this.displayingSelection) {
            clearElement(selectionGui);
            this.displayingSelection = false;
        } else {

            let selectionHeadline = setHTMLElement(selectionDiv, "div", "selectionHeadlineDiv");
            createHeadlineElement(selectionHeadline, "Select month", "h1", "headline");
            let monthsDiv = setHTMLElement(selectionDiv, "div", "monthsDiv")

            for (let spendingMonth of spendingMonths) {
                let month = spendingMonth.getMonth();
                let year = spendingMonth.getYear();
                let name = monthIndexToString(month - 1) + ", " + year;
    
                createTextButtonElement(monthsDiv, name, "monthLink", (function (variable) {
                    return function () {                        
                        let dashboard = new Dashboard(variable);
                        dashboard.open();
                    };
                })(spendingMonth));
            }

            this.displayingSelection = true;
        }
    }

    setHeadline() {

        let headline = document.getElementById("headline");

        let currentSpendingMonth = this.spendingMonth;
        let currentMonth = currentSpendingMonth.getMonth();
        let currentYear = currentSpendingMonth.getYear();

        let date = new Date();

        if (currentYear == date.getFullYear() && currentMonth == date.getMonth() + 1) {
            createHeadlineElement(headline, "This month", "h1", "headline");

        } else {
            let monthName = monthIndexToString(currentMonth - 1);
            createHeadlineElement(headline, monthName + ", " + currentYear, "h1", "headline");
        }
    }

    setBudgetOverview() {

        let expenses = this.spendingMonth.getTotalExpenses();
        let budget = this.spendingMonth.getBudget();
        let savings = budget - expenses;

        let expensesDiv = document.getElementById("expensesDiv");
        let budgetButton = createButtonElement(expensesDiv, "budgetButton", "budgetButton", function () {
            inputGui.openBudgetInput();
        });

        let label = budgetButton[1];

        createHeadlineElement(label, "Expenses", "h2", "expensesHeadline");
        createHeadlineElement(label, expenses + "€", "h2", "expensesMonitor");
        let iconDiv = setHTMLElement(label, "div", "clickMeIconDiv");
        setHTMLElement(iconDiv, "img", "clickMeIcon").src = clickMeIconFilled;

        let budgetDiv = document.getElementById("budgetDiv");
        createHeadlineElement(budgetDiv, "Remaining Budget", "h2", "budgetHeadline");
        createHeadlineElement(budgetDiv, savings + "€", "h2", "budgetMonitor")
    }

    setSpendingButton() {
        let spendingButtonDiv = document.getElementById("spendingButtonDiv");

        createTextButtonElement(spendingButtonDiv, "+", "spendingButton", function () {
            inputGui.openCategorySelector();
        });
    }

    setResetButton() {
        let statisticsDiv = document.getElementById("statistics");
        let resetButtonDiv = setHTMLElement(statisticsDiv, "div", "resetButtonDiv");

        createTextButtonElement(resetButtonDiv, "reset", "resetButton", function () {
            inputGui.openResetInput();
        });
    }

    setStatisticsButton() {
        let statisticsButtonDiv = document.getElementById("statisticsButtonDiv");
        createTextButtonElement(statisticsButtonDiv, "Statistics", "statisticsButton", function () {

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
        let statisticsSection = document.getElementById
            ("statisticsSection");

        toggleDisplayVisibility(statisticsSection, true);

        $("html, body").animate({ scrollTop: statisticsSection.offsetTop });

        let currentSpendings = this.spendingMonth.getSpendings();

        let spendingsHeadline = setHTMLElement(statisticsDiv, "div", "spendingsHeadlineDiv");
        createHeadlineElement(spendingsHeadline, "All Spendings", "h1", "headline");

        let month = monthIndexToString(this.spendingMonth.getMonth() - 1);
        let headingsArray = ["Category", "Name", "Price", month]
        let contentMatrix = [];

        for (let spending of currentSpendings) {

            let spendingCategory = spending.getType();
            let spendingEntryIcon = createHTMLElement("img", "spendingEntryIcon");
            spendingEntryIcon.src = spendingCategory.iconURL;

            let spendingDate = new Date();
            spendingDate.setTime(spending.getTimeStamp());

            let contentRow = [
                spendingEntryIcon,
                spending.getName(),
                spending.getCost() + "€",
                spendingDate.getDate()
            ];

            contentMatrix.push(contentRow)
        }

        let table = createTable("spendingsTable", "statisticsTable", headingsArray, contentMatrix);
        statisticsDiv.appendChild(table);

        let categoryHeadline = setHTMLElement(statisticsDiv, "div", "categoryHeadlineDiv");
        createHeadlineElement(categoryHeadline, "Per category", "h1", "headline");

        printCategoryCharts();
        this.setResetButton();
    }

    clearStatistics() {
        clearElement(this.statisticsElement);
    }

    closeStatistics() {
        this.clearStatistics();
        let statisticsSection = document.getElementById("statisticsSection");
        toggleDisplayVisibility(statisticsSection, false);
    }

    getDashboardElement() {
        return this.dashboardElement;
    }
}
