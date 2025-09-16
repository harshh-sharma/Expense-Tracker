import prisma from "../../prisma.js";

// Create a new expense
export const createExpense = async ({ userId, data }) => {
  const expense = await prisma.expense.create({
    data: {
      ...data,
      userId,
    },
  });
  return expense;
};

// Get all expenses for a user
export const getAllExpenses = async (userId) => {
  const expenses = await prisma.expense.findMany({
    where: { userId },
  });
  return expenses;
};

// Get a single expense by id and userId
export const getExpenseById = async ({ id, userId }) => {
  const expense = await prisma.expense.findFirst({
    where: { id, userId },
  });
  if (!expense) throw new Error("Expense not found or not yours");
  return expense;
};

// Update an expense
export const updateExpense = async ({ id, userId, data }) => {
  // Ensure the user owns the expense
  const expense = await prisma.expense.findFirst({
    where: { id, userId },
  });
  if (!expense) throw new Error("Expense not found or not yours");

  const updatedExpense = await prisma.expense.update({
    where: { id },
    data,
  });

  return updatedExpense;
};

// Delete an expense
export const deleteExpense = async ({ id, userId }) => {
  const result = await prisma.expense.deleteMany({
    where: { id, userId },
  });
  if (result.count === 0) throw new Error("Expense not found or not yours");

  return true;
};
