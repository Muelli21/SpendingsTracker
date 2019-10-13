class Spending {
    constructor(type, cost, name) {
        this.type = type;
        this.cost = cost;
        this.name = name;
        this.timestamp = new Date().getTime();
    }

    setTimestamp(timestamp) {
        this.timestamp = timestamp;
    };

    getTimeStamp() {
        return this.timestamp;
    };

    getType() {
        return this.type;
    };

    getCost() {
        return Number(this.cost);
    };

    getName() {
        return this.name;
    };
}

