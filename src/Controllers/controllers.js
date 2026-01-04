import { db } from "../db.js";



// Create Tables
export const createTables = (req, res) => {
  const sql = `
  CREATE TABLE IF NOT EXISTS Suppliers (
    SupplierID INT PRIMARY KEY AUTO_INCREMENT,
    SupplierName VARCHAR(100),
    ContactNumber VARCHAR(15)
  );

  CREATE TABLE IF NOT EXISTS Products (
    ProductID INT PRIMARY KEY AUTO_INCREMENT,
    ProductName VARCHAR(100) NOT NULL,
    Price DECIMAL(10,2),
    StockQuantity INT,
    SupplierID INT,
    FOREIGN KEY (SupplierID) REFERENCES Suppliers(SupplierID)
  );

  CREATE TABLE IF NOT EXISTS Sales (
    SaleID INT PRIMARY KEY AUTO_INCREMENT,
    ProductID INT,
    QuantitySold INT,
    SaleDate DATE,
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
  );
  `;

  db.query(sql, err => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Tables created" });
  });
};

// Alter Tables
export const alterTables = (req, res) => {
  const sql = `
    ALTER TABLE Products ADD Category VARCHAR(50);
    ALTER TABLE Products DROP Category;
    ALTER TABLE Suppliers MODIFY ContactNumber VARCHAR(15);
  `;

  db.query(sql, err => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Alter queries executed" });
  });
};

// Insert Data
export const insertData = (req, res) => {
  const sql = `
    INSERT INTO Suppliers (SupplierName, ContactNumber)
    VALUES ('FreshFoods','01001234567');

    INSERT INTO Products (ProductName,Price,StockQuantity,SupplierID)
    VALUES 
    ('Milk',15,50,1),
    ('Bread',10,30,1),
    ('Eggs',20,40,1);

    INSERT INTO Sales (ProductID, QuantitySold, SaleDate)
    VALUES (1,2,'2025-05-20');
  `;

  db.query(sql, err => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Data inserted" });
  });
};

//Update Product
export const updateProduct = (req, res) => {
  db.query(
    "UPDATE Products SET Price = 25 WHERE ProductName='Bread'",
    err => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Product updated" });
    }
  );
};

// Delete Product
export const deleteProduct = (req, res) => {
  db.query(
    "DELETE FROM Products WHERE ProductName='Eggs'",
    err => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Product deleted" });
    }
  );
};



// Total quantity sold per product
export const totalSold = (req, res) => {
  db.query(
    `SELECT p.ProductName, SUM(s.QuantitySold) AS TotalSold
     FROM Products p
     LEFT JOIN Sales s ON p.ProductID = s.ProductID
     GROUP BY p.ProductID`,
    (err, result) => res.json(result)
  );
};

// Product with highest stock
export const highestStock = (req, res) => {
  db.query(
    `SELECT ProductName, StockQuantity
     FROM Products
     ORDER BY StockQuantity DESC
     LIMIT 1`,
    (err, result) => res.json(result)
  );
};

// Suppliers start with F
export const suppliersWithF = (req, res) => {
  db.query(
    `SELECT * FROM Suppliers WHERE SupplierName LIKE 'F%'`,
    (err, result) => res.json(result)
  );
};

// Products never sold
export const neverSold = (req, res) => {
  db.query(
    `SELECT p.ProductName
     FROM Products p
     LEFT JOIN Sales s ON p.ProductID = s.ProductID
     WHERE s.SaleID IS NULL`,
    (err, result) => res.json(result)
  );
};

// Sales with product name & date
export const salesWithDate = (req, res) => {
  db.query(
    `SELECT p.ProductName, s.SaleDate
     FROM Sales s
     JOIN Products p ON s.ProductID = p.ProductID`,
    (err, result) => res.json(result)
  );
};

//Users & Permissions
export const permissions = (req, res) => {
  const sql = `
    DROP USER IF EXISTS 'store_manager'@'localhost';
    CREATE USER 'store_manager'@'localhost' IDENTIFIED BY 'password123';
    GRANT SELECT, INSERT, UPDATE ON retail_store.* TO 'store_manager'@'localhost';
    REVOKE UPDATE ON retail_store.* FROM 'store_manager'@'localhost';
    GRANT DELETE ON retail_store.Sales TO 'store_manager'@'localhost';
    FLUSH PRIVILEGES;
  `;

  db.query(sql, err => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Permissions executed" });
  });
};



 //  Bonus Question

export const bonus = (req, res) => {
  db.query(
    `SELECT v.customer_id, COUNT(*) AS visits_without_transaction
     FROM Visits v
     LEFT JOIN Transactions t
     ON v.visit_id = t.visit_id
     WHERE t.transaction_id IS NULL
     GROUP BY v.customer_id`,
    (err, result) => res.json(result)
  );
};