import React from 'react'
import {
  useBudgetContext,
  UNCATEGORIZED_BUDGET_ID,
} from '../contexts/BudgetContext'
import BudgetCard from './BudgetCard'
const UncatagorizedBudgetCard = (props) => {
  const { getExpenses } = useBudgetContext()

  const amount = getExpenses(UNCATEGORIZED_BUDGET_ID).reduce(
    (total, current) => total + current.amount,
    0,
  )

  if (amount === 0) return null

  return <BudgetCard name="Uncatagorized" amount={amount} {...props} gray />
}

export default UncatagorizedBudgetCard
