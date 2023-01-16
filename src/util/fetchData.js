export const fetchData = async (filename) => {
    const data = [];

    try {
        const res = await fetch(`./${filename}`);
        const text = await res.text();
        const rows = text.split('\n');

        for (let i = 1; i < rows.length; i++) {
            const cells = rows[i].split(',');

            data.push({
                timestamp: parseInt(cells[0]),
                gt_lat: parseFloat(cells[1]),
                gt_long: parseFloat(cells[2]),
                phone_lat: parseFloat(cells[3]),
                phone_long: parseFloat(cells[4])
            });
        }

        return data;
    } catch (err) {
        console.log(err);
    }
};