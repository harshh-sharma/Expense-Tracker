// src/modules/expenses/expense.controller.js
import * as expenseService from "./expense.service.js";

/**
 * Create a new expense
 */
export const createExpenseController = async (req, res) => {
  try {
    const userId = req.user.userId; // from JWT middleware
    const data = req.body;

    const expense = await expenseService.createExpense({ userId, data });
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Get all expenses for the logged-in user
 */
export const getAllExpensesController = async (req, res) => {
  try {
    const userId = req.user.userId;
    const expenses = await expenseService.getAllExpenses(userId);
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Get a single expense by ID
 */
export const getExpenseByIdController = async (req, res) => {
  try {
    const userId = req.user.userId;
    const id = req.params.id;

    const expense = await expenseService.getExpenseById({ id, userId });
    res.json(expense);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/**
 * Update an expense
 */
export const updateExpenseController = async (req, res) => {
  try {
    const userId = req.user.userId;
    const id = req.params.id;
    const data = req.body;

    const updatedExpense = await expenseService.updateExpense({ id, userId, data });
    res.json(updatedExpense);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/**
 * Delete an expense
 */
export const deleteExpenseController = async (req, res) => {
  try {
    const userId = req.user.userId;
    const id = req.params.id;

    await expenseService.deleteExpense({ id, userId });
    res.json({ message: "Expense deleted successfully" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
