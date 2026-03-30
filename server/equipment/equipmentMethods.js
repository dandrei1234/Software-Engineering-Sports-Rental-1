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
            'CALL AddEquipment(?, ?, ?)',
            [equipment_name, categoryID, quantity]
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


exports.searchEquipment = async (req, res) => {
    try {
        console.log("Ran");
        const { equipment_name, categoryID, condition_status, borrow_status } = req.body;
        // console.log("equipment_name: " + (equipment_name? equipment_name : "null"));

        let conditions = [];
        let values = [];

        if (equipment_name) {
            conditions.push("E.equipment_name LIKE ?");
            values.push(`%${equipment_name}%`);
        }
        if (categoryID) {
            conditions.push("E.categoryID=?")
            values.push(categoryID)
        }
        if (condition_status) {
            conditions.push("R.condition_status=?")
            values.push(condition_status)
        }
        if (borrow_status) {
            conditions.push("R.borrow_status=?")
            values.push(borrow_status)
        }

        if (conditions.length > 0) {
            let query = `
SELECT 
    R.*, E.equipment_name,
    C.category_name
FROM equipment_category_tbl AS C
JOIN equipment_tbl AS E
    ON E.categoryID = C.categoryID
JOIN rentals_tbl AS R 
    ON E.equipmentID = R.equipmentID
WHERE `;

                for (let i = 0; i < conditions.length; i++) {
                    // query += " AND " + conditions[i];
                    if (i > 0) {
                        query += " AND ";
                    }
                    query += conditions[i];
                }

            //console.log(query);
            const [existingEquipment] = await exports.pool.query(query, values);

            
            if (existingEquipment.length > 0) {
                // if (existingEquipment[0].equipment_name === equipment_name) {
                //     return res.status(400).json({ message: "Name already exists" });
                // }
            }
            console.log(existingEquipment);
            return res.status(200).json(existingEquipment);
        }



    // const { equipment_name, categoryID, condition_status, borrow_status } = req.body;


        // const [rows] = await exports.pool.execute('CALL GetStaffPasswordByUsername(?)', [username]);

        // // Check if user exists
        // if (rows[0].length === 0) {
        //     return res.status(401).json({ message: "Invalid username or password" });
        // }

        // const receivedPassword = rows[0][0]['Password'];

        // console.log("Comparison: " + password + " vs " + receivedPassword);

        // const isMatch = await bcrypt.compare(password, receivedPassword);

        // if (!isMatch) {
        //     return res.status(401).json({ message: "Invalid username or password" });
        // }

        // res.status(200).json({
        //     message: "Login successful",
        //     username: username
        // });

        
        // console.log("Status code Q: " +res.statusCode);

    } catch (error) {
        res.status(500).json({ message: "Internal server error", details: error.message });
        console.log(error.message);
    }



    const { equipment_name } = req.body;
    try {

        // const [rows] = await exports.pool.query('SELECT * FROM equipment_category_tbl;');

        // res.status(200).json(rows);

    } catch (error) {
        // res.status(500).json({ message: "Server Error", details: error.message });
    }
};