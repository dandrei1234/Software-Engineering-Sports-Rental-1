const bcrypt = require('bcrypt');
const saltRounds = 10;
exports.pool = null;

exports.login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    try {
        const [rows] = await exports.pool.execute('CALL GetStaffPasswordByUsername(?)', [username]);

        if (rows[0].length === 0) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const receivedPassword = rows[0][0]['Password'];

        console.log("Comparison: " + password + " vs " + receivedPassword);

        const isMatch = await bcrypt.compare(password, receivedPassword);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        res.status(200).json({
            message: "Login successful",
            username: username
        });

        
        console.log("Status code Q: " +res.statusCode);

    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ message: "Internal server error", details: error.message });
    }
};

exports.signUp = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    try {
        const [existingUser] = await exports.pool.execute(
            'SELECT CountStaffByUsername(?) AS value',
            [username]
        );

        if (existingUser[0].value > 0) {
            return res.status(400).json({ message: "Username is already taken" });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        await exports.pool.execute(
            'CALL CreateStaff(?, ?, "", "", "")',
            [username, hashedPassword]
        );

        res.status(201).json({ message: "User registered successfully!" });

    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ message: "Error registering user", details: error.message });
    }
};