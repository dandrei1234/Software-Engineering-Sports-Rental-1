-- Create the Database
CREATE DATABASE softeng_sports_equip_rental;
USE softeng_sports_equip_rental;

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users_tbl (
    userID INT PRIMARY KEY AUTO_INCREMENT,
    fullname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role ENUM('student', 'staff') NOT NULL DEFAULT 'student',
    password VARCHAR(255) NOT NULL,
    registration_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM('active', 'inactive') DEFAULT 'inactive'
);

CREATE TABLE IF NOT EXISTS equipment_category_tbl (
    categoryID INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(100) NOT NULL
);

-- 2. Equipment Table
CREATE TABLE IF NOT EXISTS equipment_tbl (
    equipmentID INT PRIMARY KEY AUTO_INCREMENT,
    categoryID INT,
    equipment_name VARCHAR(255) NOT NULL,
    description TEXT,
    total_quantity INT NOT NULL DEFAULT 1,
    available_quantity INT NOT NULL DEFAULT 1,
    condition_status ENUM('New', 'Good', 'Fair', 'Damaged') DEFAULT 'Good',
    image_url TEXT,
    FOREIGN KEY (categoryID) REFERENCES equipment_category_tbl(categoryID) ON DELETE CASCADE
);

-- 3. Rentals Table
CREATE TABLE IF NOT EXISTS rentals_tbl (
    rentalID INT PRIMARY KEY AUTO_INCREMENT,
    equipmentID INT,
    userID INT NOT NULL,
    request_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    due_date DATETIME NOT NULL,
    return_date DATETIME,
    status ENUM('Pending', 'Approved', 'Returned', 'Overdue') DEFAULT 'Pending',
    FOREIGN KEY (equipmentID) REFERENCES equipment_tbl(equipmentID) ON DELETE CASCADE,
    FOREIGN KEY (userID) REFERENCES users_tbl(userID) ON DELETE CASCADE
);

-- 4. Rental Items Table (Linking rentals to equipment)
CREATE TABLE IF NOT EXISTS rental_items_tbl (
    rental_itemID INT PRIMARY KEY AUTO_INCREMENT,
    rentalID INT NOT NULL,
    equipmentID INT NOT NULL,
    quantity INT DEFAULT 1,
    FOREIGN KEY (rentalID) REFERENCES rentals_tbl(rentalID) ON DELETE CASCADE,
    FOREIGN KEY (equipmentID) REFERENCES equipment_tbl(equipmentID) ON DELETE CASCADE
);

-- 5. Audit Logs Table
CREATE TABLE IF NOT EXISTS audit_log_tbl (
    logID INT PRIMARY KEY AUTO_INCREMENT,
    userID INT,
    action_type VARCHAR(100),
    action_details TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userID) REFERENCES users_tbl(userID) ON DELETE SET NULL
);

-- --- SEED DATA (Optional) ---

-- Add initial Staff and Student
INSERT INTO users_tbl (email, password, fullname, role, status) VALUES 
('staff@smu.edu.ph', 'admin123', 'System Admin', 'staff', 'active'),
('student@smu.edu.ph', 'student123', 'Sample Student', 'student', 'active');

INSERT INTO equipment_category_tbl (category_name) VALUES
('Ball Games'), ('Racket Sports');

-- Add initial Equipment
INSERT INTO equipment_tbl (equipment_name, categoryID, condition_status, total_quantity, available_quantity, image_url) VALUES 
('Basketball (Spalding)', 1, 'Good', 5, 5, 'https://picsum.photos/seed/basketball/400/300'),
('Volleyball (Mikasa)', 1, 'New', 3, 3, 'https://picsum.photos/seed/volleyball/400/300'),
('Badminton Racket', 2, 'Good', 10, 10, 'https://picsum.photos/seed/badminton/400/300'),
('Table Tennis Paddle', 2, 'Fair', 8, 8, 'https://picsum.photos/seed/pingpong/400/300'),
('Soccer Ball', 1, 'Good', 4, 4, 'https://picsum.photos/seed/soccer/400/300');

INSERT INTO rentals_tbl
(equipmentID, userId, request_date, due_date, return_date, status)
VALUES
(1, 1, '2026-03-22', '2026-03-22', '2026-03-22', 'Approved'),
(2, 2, '2026-03-28', '2026-03-28', '2026-03-29', 'Approved');