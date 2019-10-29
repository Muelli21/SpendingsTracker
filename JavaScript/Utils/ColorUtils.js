class Colors {
    constructor() {}

    getRGBAString(triplet, opacity) {
        let r = triplet[0];
        let g = triplet[1];
        let b = triplet[2];
        return "rgba(" + r + ", " + g + ", " + b + ", " + opacity + ")";
    }

    getRGBAStringSetByIndex(index, opacity) {
        let rgbaStringSet = [];
        if (index > this.colorSets.length - 1) {
            index = 0;
            console.log("the index is to high!");
        }
        let triplets = this.colorSets[index];
        for (let triplet of triplets) {
            let string = this.getRGBAString(triplet, opacity);
            rgbaStringSet.push(string);
        }
        return rgbaStringSet;
    }
}
