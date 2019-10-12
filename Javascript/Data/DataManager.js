function loadSpendingMonths() {

    let name = defaultUserName;
    let userName = defaultUserName;
    let version = appVersion;

    if (!window.indexedDB) {
        window.alert("The browser does not support IndexedDB, which will probably cause some inconveniences!");
        browserSupport = false;
        return;
    }

    let request = window.indexedDB.open(name, version);
    let database = null;

    request.onupgradeneeded = function(event) {
        database = event.target.result;
        database.createObjectStore(userName, { keyPath: "key" });
        console.log("upgradeneeded");
    }

    request.onerror = function (event) {
        window.alert("It seems that you have not allowed this website to create a database!");
        console.log("Database error: " + event.target.errorCode);
    }

    request.onsuccess = function () {
        database = request.result;
        console.log("The connections to the indexedDB database has been established!");
        callbackLoadSpendingMonths(database);
    }
}

function saveSpendingMonths() {

    let name = defaultUserName;
    let version = appVersion;

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
        console.log("The connections to the indexedDB database has been established!");
        callbackSaveSpendingMonths(database);
    }
}

function saveSpendingMonth(spendingMonth) {

    let name = defaultUserName;
    let version = appVersion;

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
        console.log("The connections to the indexedDB database has been established!");
        callbackSaveSpendingMonth(database, spendingMonth);
    }
}

function callbackLoadSpendingMonths(database) {

    let userName = defaultUserName;
    let transaction = database.transaction(userName, "readwrite");
    let loadedMonths = [];

    let objectStore = transaction.objectStore(userName);
        objectStore.openCursor().onsuccess = function (event) {
            let cursor = event.target.result;
    
            if (cursor) {
                let data = cursor.value;
                loadedMonths.push(JSON.parse(data));
                cursor.continue();
            }
        }
    
        for (let monthObject of loadedMonths) {
            let month = monthObject.month;
            let year = monthObject.year;
            let budget = monthObject.budget;
            let spendingObjects = monthObject.spendings;
            let spendingMonth = new SpendingMonth(month, year);
            spendingMonth.setBudget(budget);
    
            for (let spendingObject of spendingObjects) {
                let type = spendingObject.type;
                let name = spendingObject.name;
                let cost = spendingObject.cost;
                let timestamp = spendingObject.timestamp;
                let spending = new Spending(type, cost, name);
                spending.setTimestamp(timestamp);
                spendingMonth.addSpending(spending);
            }
        }

        login();

    transaction.oncomplete = function (event) {
        console.log("A connection to indexedDB has successfully been established!");     
    }
}

function callbackSaveSpendingMonths(database) {

    let userName = defaultUserName;
    let transaction = database.transaction(userName, "readwrite");

    let objectStore = transaction.objectStore(userName, { keyPath: "key" });
        let spendingMonths = allSpendingMonths;

        for (let i = 0; i < spendingMonths.length; i++) {
            let spendingMonth = spendingMonths[i];
            let JSONspendingMonth = JSON.stringify(spendingMonth);

            let request = objectStore.put(JSONspendingMonth);
            request.onsuccess = function (event) {
                console.log("The month " + spendingMonth.getMonth() + "/" + spendingMonth.getYear() + " has been saved successfully!");
            }
        }

    transaction.oncomplete = function (event) {
        console.log("A connection to indexedDB has successfully been established!");   
    } 
}

function callbackSaveSpendingMonth(database, spendingMonth) {

    let userName = defaultUserName;
    let transaction = database.transaction(userName, "readwrite");

    let objectStore = transaction.objectStore(userName, { keyPath: "key" });
    let JSONspendingMonth = JSON.stringify(spendingMonth);

    console.log(JSONspendingMonth);

    let request = objectStore.put(JSONspendingMonth);
    request.onsuccess = function (event) {
        console.log("The month " + spendingMonth.getMonth() + "/" + spendingMonth.getYear() + " has been saved successfully!");
    }

    transaction.oncomplete = function (event) {
        console.log("A connection to indexedDB has successfully been established!");
    }
}