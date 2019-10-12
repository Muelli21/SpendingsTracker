class SpendingMonth {
    constructor(month, year) {
        this.key = month + "" + year;
        this.month = month;
        this.year = year;
        this.spendings = [];
        this.budget = 0;
        allSpendingMonths.push(this);
    }

    setBudget(budget) {
        this.budget = budget;
    };

    addSpending(spending) {
        this.spendings.push(spending);
        saveSpendingMonth(this);
    };

    getSpendings() {
        return this.spendings;
    };

    getMonth() {
        return this.month;
    };

    getYear() {
        return this.year;
    };

    getBudget() {
        return this.budget;
    }

    getTotalExpenses() {
        let sum = 0;
        for (let spending of this.spendings) {
            sum += spending.getCost();
        }
        return sum;
    };

    getRemainingBudget() {
        return this.budget - this.getTotalExpenses();
    };
}
