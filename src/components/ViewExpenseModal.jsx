import { Modal, Button, Stack } from 'react-bootstrap'
import {
  UNCATEGORIZED_BUDGET_ID,
  useBudgetContext,
} from '../contexts/BudgetContext'
import { currencyFormatter } from '../utils'
const ViewExpenseModal = ({ handleClose, defaultBudgetId }) => {
  const {
    budgets,
    getExpenses,
    deleteExpense,
    deleteBudget,
  } = useBudgetContext()
  const budget =
    defaultBudgetId === UNCATEGORIZED_BUDGET_ID
      ? { id: UNCATEGORIZED_BUDGET_ID, name: UNCATEGORIZED_BUDGET_ID }
      : budgets.find((b) => b.id === defaultBudgetId)
  return (
    <Modal show={defaultBudgetId && true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap={3}>
            <h2>Expenses-{budget?.name}</h2>
            {defaultBudgetId !== UNCATEGORIZED_BUDGET_ID && (
              <Button
                variant={'outline-danger'}
                onClick={() => {
                  deleteBudget(budget?.id)
                  handleClose()
                }}
              >
                Delete
              </Button>
            )}
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          {getExpenses(defaultBudgetId).map(({ id, description, amount }) => (
            <Stack
              key={id}
              direction="horizontal"
              gap={2}
              className="align-items-baseline"
            >
              <h2 className="fs-5 me-auto">{description}</h2>
              <p className="fs-5 me-1">{currencyFormatter.format(amount)}</p>
              <Button
                className="btn-sm"
                onClick={() => {
                  deleteExpense(id)
                  handleClose()
                }}
                variant={'outline-danger'}
              >
                Delete
              </Button>
            </Stack>
          ))}
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default ViewExpenseModal
