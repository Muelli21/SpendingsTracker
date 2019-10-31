Date.prototype.getDDMMYYYYString = function() {
    let date = new Date(this);
    let dd = date.getDate() + "";
    dd = dd.padStart(2, 0);
    let mm = date.getMonth() + 1 + "";
    mm = mm.padStart(2, 0);
    let yyyy = date.getFullYear();
    return dd +"/"+mm+"/"+yyyy;
}

Array.prototype.clear = function() {
    this.length = 0;
};

Array.prototype.remove = function(element) {
    for (let i = this.length; i--;) {
        if (this[i] === element) {
            this.splice(i, 1);
        }
    }
};