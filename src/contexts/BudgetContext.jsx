import { useContext, createContext } from 'react'
import { v4 as uuidV4 } from 'uuid'
import useLocalStorage from '../hooks/useLocalStorage'

export const UNCATEGORIZED_BUDGET_ID = 'Uncatagorized'

const BudgetContext = createContext()

export function useBudgetContext() {
  return useContext(BudgetContext)
}

export function BudgetProvider({ children }) {
  const [budgets, setButgets] = useLocalStorage('Budgets', [])
  const [expenses, setExpenses] = useLocalStorage('Expenses', [])

  const addBudget = ({ name, maximum }) => {
    setButgets((previousBudgets) => {
      if (
        previousBudgets.find((previousBudget) => previousBudget.name === name)
      ) {
        return previousBudgets
      }

      return [...previousBudgets, { id: uuidV4(), name, maximum }]
    })
  }

  const addExpense = ({ description, amount, budgetId }) => {
    setExpenses((previousExpenses) => {
      return [
        ...previousExpenses,
        { id: uuidV4(), description, amount, budgetId },
      ]
    })
  }

  const getExpenses = (id) => {
    return expenses.filter((expense) => expense.budgetId === id)
  }

  const deleteBudget = (id) => {
    setExpenses((previous) => {
      return previous.map((expense) => {
        if (expense.budgetId !== id) {
          return expense
        }

        return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID }
      })
    })

    setButgets((previous) => previous.filter((budget) => budget.id !== id))
  }

  const deleteExpense = (id) => {
    setExpenses((previous) => {
      return previous.filter((expense) => expense.id !== id)
    })
  }

  return (
    <BudgetContext.Provider
      value={{
        budgets,
        expenses,
        addBudget,
        addExpense,
        getExpenses,
        deleteBudget,
        deleteExpense,
      }}
    >
      {children}
    </BudgetContext.Provider>
  )
}
