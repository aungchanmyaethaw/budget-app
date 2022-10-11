import React from 'react'
import { useBudgetContext } from '../contexts/BudgetContext'
import BudgetCard from './BudgetCard'
const TotalBudgetCard = () => {
  const { expenses, budgets } = useBudgetContext()

  const total = expenses.reduce((total, expense) => total + expense.amount, 0)

  const max = budgets.reduce((total, budget) => total + budget.maximum, 0)

  if (max === 0) return null

  return <BudgetCard name="Total" amount={total} max={max} gray hideButtons />
}

export default TotalBudgetCard
