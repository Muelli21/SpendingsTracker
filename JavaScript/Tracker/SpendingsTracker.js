const APP_NAME = "spendingsTracker";
const DEFAULT_USERNAME = "Muelli21";
const APP_VERSION = "1.0";

var browserSupport = true;
var allSpendingMonths = [];
var dashboard;
var inputGui;

window.onload = function() {
    loadSpendingMonths();
}

function login() {

    if (!browserSupport) {
        alert("This browser does not apper to be compatible with this progressive web app!")
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

    dashboard = new Dashboard(currentMonth);
    inputGui = new InputGui(currentMonth);
    dashboard.display();

    preloadImages();
}
