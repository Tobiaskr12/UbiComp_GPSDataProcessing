export const MedianFilter = (points, colName) => {
    const list = [];

    for (let i = 0; i < points.length; i++) {
        list.push(points[i][colName]);
    }

    const sortedList = list.sort();
    return sortedList[parseInt(sortedList.length / 2)];
}