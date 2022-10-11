import { useState } from 'react'
import { Container, Stack, Button } from 'react-bootstrap'
import BudgetCard from './components/BudgetCard'
import AddBudgetModal from './components/AddBudgetModal'
import AddExpenseModal from './components/AddExpenseModal'
import ViewExpenseModal from './components/ViewExpenseModal'
import UncatagorizedBudgetCard from './components/UncatagorizedBudgetCard'
import TotalBudgetCard from './components/TotalBudgetCard'
import {
  useBudgetContext,
  UNCATEGORIZED_BUDGET_ID,
} from './contexts/BudgetContext'

const App = () => {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [defaultBudgetId, setDefaultBudgetId] = useState()
  const [showViewExpenseModal, setShowViewExpenseModal] = useState()
  const { budgets, expenses } = useBudgetContext()

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true)
    setDefaultBudgetId(budgetId)
  }
  return (
    <>
      <Container className="py-3">
        <Stack direction="horizontal" gap={3}>
          <h2 className="me-auto fs-2 fw-normal">Budgets</h2>
          <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>
            Add Budget
          </Button>
          <Button variant="outline-primary" onClick={openAddExpenseModal}>
            Add Expense
          </Button>
        </Stack>
        <div
          className="mt-5"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))',
            gap: '1rem',
            alignItems: 'flex-start',
          }}
        >
          {budgets.map((budget) => {
            const amount = expenses
              .filter((expense) => expense.budgetId === budget.id)
              .reduce((prev, current) => prev + current.amount, 0)

            return (
              <BudgetCard
                key={budget.id}
                name={budget.name}
                max={budget.maximum}
                amount={amount}
                addExpenseOnclick={() => openAddExpenseModal(budget.id)}
                viewExpenseOnclick={() => setShowViewExpenseModal(budget.id)}
              />
            )
          })}
          <UncatagorizedBudgetCard
            addExpenseOnclick={openAddExpenseModal}
            viewExpenseOnclick={() =>
              setShowViewExpenseModal(UNCATEGORIZED_BUDGET_ID)
            }
          />
          <TotalBudgetCard />
        </div>
      </Container>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />
      <AddExpenseModal
        show={showAddExpenseModal}
        handleClose={() => setShowAddExpenseModal(false)}
        defaultBudgetId={defaultBudgetId}
      />
      <ViewExpenseModal
        defaultBudgetId={showViewExpenseModal}
        handleClose={() => setShowViewExpenseModal()}
      />
    </>
  )
}

export default App
