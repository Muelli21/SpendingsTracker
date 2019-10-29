Date.prototype.getDDMMYYYYString = function() {
    let date = new Date(this);
    let dd = date.getDate() + "";
    dd = dd.padStart(2, 0);
    let mm = date.getMonth() + 1 + "";
    mm = mm.padStart(2, 0);
    let yyyy = date.getFullYear();
    return dd +"/"+mm+"/"+yyyy;
}