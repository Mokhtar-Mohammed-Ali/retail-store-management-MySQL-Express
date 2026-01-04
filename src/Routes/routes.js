import express from "express";
const router = express.Router();

import * as c from "../Controllers/controllers.js";

router.post("/create-tables", c.createTables);
router.post("/alter-tables", c.alterTables);
router.post("/insert", c.insertData);

router.put("/update-product", c.updateProduct);
router.delete("/delete-product", c.deleteProduct);

router.get("/total-sold", c.totalSold);
router.get("/highest-stock", c.highestStock);
router.get("/suppliers-f", c.suppliersWithF);
router.get("/never-sold", c.neverSold);
router.get("/sales", c.salesWithDate);

router.post("/permissions", c.permissions);
router.get("/bonus", c.bonus);

export default router;
