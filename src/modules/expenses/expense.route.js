// src/modules/expenses/expense.routes.js
import express from "express";
import {
  createExpenseController,
  getAllExpensesController,
  getExpenseByIdController,
  updateExpenseController,
  deleteExpenseController
} from "./expense.controller.js";
import { isUserAuthenticated } from "../../middlewares/authMiddleware.js";

const router = express.Router();

// Protect all routes
router.use(isUserAuthenticated);

router.post("/", createExpenseController);
router.get("/", getAllExpensesController);
router.get("/:id", getExpenseByIdController);
router.put("/:id", updateExpenseController);
router.delete("/:id", deleteExpenseController);

export default router;
