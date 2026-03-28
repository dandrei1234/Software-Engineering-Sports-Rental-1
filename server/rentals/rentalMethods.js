exports.pool = null;

exports.viewSummary = async (req, res) => {
    try {
        const [rows] = await exports.pool.query('SELECT * FROM rentals_tbl');

        res.status(200).json(rows);


    } catch (error) {
        res.status(500).json({ message: "Server Error", details: error.message });
    }
};