const CLICK_ICON = "./Resources/ClickMeIcon.png";
const CLICK_ICON_FILLED = "./Resources/ClickMeIconFilled.png";
const PLUS_ICON_FILLED = "./Resources/PlusIconFilled.png";
const MONEY_ICON = "./Resources/Money.png";
const RESET_ICON = "./Resources/Icon_2.png";

class Dashboard {
    constructor(spendingMonth) {

        this.spendingMonth = spendingMonth;

        this.displayingStatistics = false;
        this.displayingSelection = false;

    }

    clear() {

        let elementsToClear = document.querySelectorAll(".toClear");
        for (let element of elementsToClear) {
            clearElement(element);
        }

        let statisticsSection = document.getElementById("statisticsSection");
        toggleDisplayVisibility(statisticsSection, false);
    }

    display() {

        this.clear();

        this.displayHeadline();
        this.displayHamburgerMenu();
        this.displayOverview();
        this.displayButtons();

        let dashboardElement = document.getElementById("dashboard");
        dashboardElement.style.overflow = "unset";
        this.displayingSelection = false;

        console.log("This dashboard depicts information on the following month: " + this.spendingMonth.getMonth() + "/" + this.spendingMonth.getYear());
    }

    getHeadlineString() {

        let currentSpendingMonth = this.spendingMonth;
        let currentMonth = currentSpendingMonth.getMonth();
        let currentYear = currentSpendingMonth.getYear();

        let date = new Date();
        let isCurrentData = currentYear == date.getFullYear() && currentMonth == date.getMonth() + 1;
        let archivedHeadline = monthIndexToString(currentMonth - 1) + ", " + currentYear;
        let headline = isCurrentData ? "This month" : archivedHeadline;

        return headline;
    }

    displayHeadline() {

        let headlineWrapper = document.getElementById("headlineWrapper");
        let headlineString = this.getHeadlineString();

        setHeadline(headlineWrapper, "headline", "headline", "h1", headlineString);

    }

    displayHamburgerMenu() {

        let hamburgerMenuWrapper = document.getElementById("hamburgerMenuWrapper");
        let hambugerMenuItem = setElement(hamburgerMenuWrapper, "hambugerMenuItem", "", "div");

        hambugerMenuItem.onclick = this.openMenu;

        for (let index = 0; index < 3; index++) {
            let bar = setElement(hambugerMenuItem, "", "bars", "div");
            bar.id = "bar" + (index + 1);
        }
    }

    openMenu() {

        let spendingMonths = allSpendingMonths;

        document.getElementById('hambugerMenuItem').classList.toggle("change");

        let monthsWrapper = document.getElementById("monthsWrapper");
        let headline = document.getElementById("headline");

        if (this.displayingSelection) {
            let headlineString = dashboard.getHeadlineString();

            clearElement(monthsWrapper);
            headline.textContent = headlineString;

        } else {

            headline.textContent = "Select month";

            for (let spendingMonth of spendingMonths) {
                let month = spendingMonth.getMonth();
                let year = spendingMonth.getYear();
                let name = monthIndexToString(month - 1) + ", " + year;

                setTextButton(monthsWrapper, name, "selectionMonthButton", name, (function (variable) {
                    return function () {
                        let dashboard = new Dashboard(variable);
                        dashboard.display();
                    };
                })(spendingMonth));
            }
        }

        this.displayingSelection = !this.displayingSelection;
    }

    displayOverview() {

        let expenses = this.spendingMonth.getTotalExpenses();
        let budget = this.spendingMonth.getBudget();
        let remainingBudget = budget - expenses;

        let budgetWrapper = document.getElementById("budgetWrapper");
        let budgetButton = setButton(budgetWrapper, "budgetButton", "", function () {
            inputGui.openBudgetInput();
        });

        setHeadline(budgetButton, "budgetHeadline", "headline", "h2", "Remaining Budget");
        setHeadline(budgetButton, "budgetMonitor", "monitor", "h2", remainingBudget + "€");

        let iconWrapper = setElement(budgetButton, "", "clickIconWrapper", "div");
        setElement(iconWrapper, "", "clickIcon", "img").src = CLICK_ICON_FILLED;

        let expensesWrapper = document.getElementById("expensesWrapper");
        setHeadline(expensesWrapper, "expensesHeadline", "headline", "h2", "Expenses");
        setHeadline(expensesWrapper, "expensesMonitor", "monitor", "h2", expenses + "€");
    }

    displayButtons() {
        let addButtonWrapper = document.getElementById("addButtonWrapper");
        let statisticsButtonWrapper = document.getElementById("statisticsButtonWrapper");

        let addButton = setButton(addButtonWrapper, "addButton", "", function () {
            inputGui.openCategorySelector();
        });

        setElement(addButton, "", "clickIcon", "img").src = PLUS_ICON_FILLED;

        setTextButton(statisticsButtonWrapper, "statisticsButton", "", "Statistics", function () {
            if (this.displayingStatistics) {
                dashboard.closeStatistics();
                this.displayingStatistics = false;
            } else {
                dashboard.displayStatistics();
                this.displayingStatistics = true;
            }
        });

        toggleVisibility(addButtonWrapper, true);
    }

    displayStatistics() {

        let statisticsSection = document.getElementById("statisticsSection");
        let addButtonWrapper = document.getElementById("addButtonWrapper");

        let currentSpendings = this.spendingMonth.getSpendings();

        toggleVisibility(addButtonWrapper, false);
        toggleDisplayVisibility(statisticsSection, true);
        $("html, body").animate({ scrollTop: statisticsSection.offsetTop });

        let spendingsHeadlineWrapper = setElement(statisticsSection, "spendingHeadlineWrapper", "headlineWrapper", "div");
        setHeadline(spendingsHeadlineWrapper, "", "headline", "h1", "All Spendings");

        let month = monthIndexToString(this.spendingMonth.getMonth() - 1);
        let headingsArray = ["Category", "Name", "Price", month]
        let contentMatrix = [];

        for (let spending of currentSpendings) {

            let spendingDate = new Date();
            let spendingCategory = spending.getType();
            let spendingEntryIcon = createElement("", "spendingEntryIcon", "img");

            spendingEntryIcon.src = spendingCategory.iconURL;
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
        statisticsSection.appendChild(table);

        let categoryNumberHeadlineWrapper = setElement(statisticsSection, "categoryNumberHeadlineWrapper", "headlineWrapper", "div");
        setHeadline(categoryNumberHeadlineWrapper, "", "headline", "h1", "By number");

        printCategoryChartByNumber();

        let categorySumHeadlineWrapper = setElement(statisticsSection, "categorySumHeadlineWrapper", "headlineWrapper", "div");
        setHeadline(categorySumHeadlineWrapper, "", "headline", "h1", "By sum");

        printCategoryChartBySum();

        let resetButtonWrapper = setElement(statisticsSection, "resetButtonWrapper", "", "div");
        setTextButton(resetButtonWrapper, "resetButton", "", "Reset", function () {
            inputGui.openResetInput();
        });
    }

    closeStatistics() {

        let statisticsSection = document.getElementById("statisticsSection");
        let addButtonWrapper = document.getElementById("addButtonWrapper");

        clearElement(statisticsSection);
        toggleVisibility(addButtonWrapper, true);
        toggleVisibilityUsingHeight(statisticsSection, false);
    }

    getSpendingMonth() {
        return this.spendingMonth;
    }
}