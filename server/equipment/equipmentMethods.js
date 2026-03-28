exports.pool = null;

exports.addEquipment = async (req, res) => {
    const { equipment_name, categoryID, quantity } = req.body;

    try {
        const [existingEquipment] = await exports.pool.execute(
            'SELECT equipment_name FROM equipment_tbl WHERE equipment_name = ?',
            [equipment_name]
        );

        if (existingEquipment.length > 0) {
            if (existingEquipment[0].equipment_name === equipment_name) {
                return res.status(400).json({ message: "Name already exists" });
            }
        }

        await exports.pool.execute(
            'INSERT INTO equipment_tbl (equipment_name, categoryID, total_quantity, available_quantity) VALUES (?, ?, ?, ?)',
            [equipment_name, categoryID, quantity, quantity]
        );

        res.status(201).json({ message: "Equipment added successfully!" });

    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ message: "Error adding equipment", details: error.message });
    }
};

exports.getCategories = async (req, res) => {
    try {
        const [rows] = await exports.pool.query('SELECT * FROM equipment_category_tbl;');

        res.status(200).json(rows);

    } catch (error) {
        res.status(500).json({ message: "Server Error", details: error.message });
    }
};