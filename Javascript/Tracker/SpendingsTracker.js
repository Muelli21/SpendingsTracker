let appName = "spendingsTracker";
let defaultUserName = "Muelli21";
let appVersion = "1.0";
let browserSupport = true;
let allSpendingMonths = [];
let dashboard;
let inputGui;

window.onload = function() {
    loadSpendingMonths();
}

function login() {

    if (!browserSupport) {
        return;
    }
    
    let date = new Date();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentMonth = allSpendingMonths[allSpendingMonths.length - 1];

    if (currentMonth == null) {
        currentMonth = new SpendingMonth(month, year);
    }

    if (currentMonth.getMonth() != month) {
        currentMonth = new SpendingMonth(month, year);
    }

    let dashboard = new Dashboard(currentMonth);
    let inputGui = new InputGui(currentMonth);
    dashboard.open();
}
