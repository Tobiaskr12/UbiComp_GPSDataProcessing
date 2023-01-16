export const MeanFilter = (points, colName) => {
    let sum = 0;

    for (let i = 0; i < points.length; i++) {
        sum += points[i][colName];
    }

    return sum / points.length;
}
