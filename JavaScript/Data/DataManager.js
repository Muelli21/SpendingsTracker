function loadSpendingMonths() {

    let name = DEFAULT_USERNAME;
    let userName = DEFAULT_USERNAME;
    let version = APP_VERSION;

    if (!window.indexedDB) {
        window.alert("The browser does not support IndexedDB, which will probably cause some inconveniences!");
        browserSupport = false;
        return;
    }

    let request = window.indexedDB.open(name, version);
    let database = null;

    request.onupgradeneeded = function (event) {
        database = event.target.result;
        let objectStore = database.createObjectStore(userName, { keyPath: "key" });
        objectStore.createIndex("budget", "budget", { unique: false });
        objectStore.createIndex("month", "month", { unique: false });
        objectStore.createIndex("spendings", "spendings", { unique: false });
        objectStore.createIndex("year", "year", { unique: false });
        console.log("upgradeneeded");
    }

    request.onerror = function (event) {
        window.alert("It seems that you have not allowed this website to create a database!");
        console.log("Database error: " + event.target.errorCode);
    }

    request.onsuccess = function () {
        database = request.result;
        console.log("Loading: A connections to the indexedDB database has been established!");
        callbackLoadSpendingMonths(database);
    }
}

function saveSpendingMonth(spendingMonth) {

    let name = DEFAULT_USERNAME;
    let version = APP_VERSION;

    if (!window.indexedDB) {
        window.alert("The browser does not support IndexedDB, which will probably cause some inconveniences!");
        browserSupport = false;
        return;
    }

    let request = window.indexedDB.open(name, version);
    let database = null;

    request.onerror = function (event) {
        window.alert("It seems that you have not allowed this website to create a database!");
        console.log("Database error: " + event.target.errorCode);
    }

    request.onsuccess = function () {
        database = request.result;
        console.log("Saving: A connection to the indexedDB database has been established!");
        callbackSaveSpendingMonth(database, spendingMonth);
    }
}

function callbackLoadSpendingMonths(database) {

    let userName = DEFAULT_USERNAME;
    let transaction = database.transaction(userName, "readwrite");

    let objectStore = transaction.objectStore(userName);
    objectStore.openCursor().onsuccess = function (event) {
        let cursor = event.target.result;

        if (cursor) {
            let data = cursor.value;
            let month = data.month;
            let year = data.year;
            let budget = data.budget;
            let spendingObjects = data.spendings;
            let spendingMonth = new SpendingMonth(month, year);
            spendingMonth.setBudget(budget);

            for (let spendingObject of spendingObjects) {
                let type = spendingObject.type;
                let spendingCategory = getSpendingCategoryByName(type.name);
                let name = spendingObject.name;
                let cost = spendingObject.cost;
                let timestamp = spendingObject.timestamp;
                let spending = new Spending(spendingCategory, cost, name);
                spending.setTimestamp(timestamp);
                spendingMonth.addSpending(spending);
            }

            cursor.continue();
        }
    }

    transaction.oncomplete = function (event) {
        console.log("Loading callback: A connection to indexedDB has successfully been established!");
        login();
    }
}

function callbackSaveSpendingMonth(database, spendingMonth) {

    let userName = DEFAULT_USERNAME;
    let transaction = database.transaction(userName, "readwrite");
    let objectStore = transaction.objectStore(userName, { keyPath: "key" });

    let request = objectStore.put(spendingMonth);
    
    request.onsuccess = function (event) {
        console.log("The month " + spendingMonth.getMonth() + "/" + spendingMonth.getYear() + " has been saved successfully!");
    }

    transaction.oncomplete = function (event) {
        console.log("Saving callback: A connection to indexedDB has successfully been established!");
    }
}