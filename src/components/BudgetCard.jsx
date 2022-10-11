import React from 'react'
import { Stack, Button, Card, ProgressBar } from 'react-bootstrap'
import { currencyFormatter } from '../utils'
const BudgetCard = ({
  name,
  max,
  amount,
  gray,
  hideButtons,
  addExpenseOnclick,
  viewExpenseOnclick,
}) => {
  const classNames = []
  if (amount >= max) {
    classNames.push('bg-danger', 'bg-opacity-10')
  }

  if (gray) {
    classNames.push('bg-light')
  }

  return (
    <Card className={`shadow-sm ${classNames.join(' ')}`}>
      <Card.Body>
        <Card.Title className="d-flex align-items-baseline justify-content-between mb-3">
          <h2 className="fs-4 fw-normal">{name}</h2>

          <div>
            <span>{currencyFormatter.format(amount)}</span>
            {max && (
              <span className="fs-6 text-muted ms-1">
                /{currencyFormatter.format(max)}
              </span>
            )}
          </div>
        </Card.Title>
        {max && (
          <ProgressBar
            min={0}
            max={max}
            now={amount}
            variant={prograssBarVariant(max, amount)}
          />
        )}
        {!hideButtons && (
          <Stack className="mt-3" direction="horizontal" gap={3}>
            <Button
              className="ms-auto fs-6"
              variant="outline-primary"
              onClick={addExpenseOnclick}
            >
              Add Expense
            </Button>
            <Button variant="outline-secondary" onClick={viewExpenseOnclick}>
              View Expense
            </Button>
          </Stack>
        )}
      </Card.Body>
    </Card>
  )
}

function prograssBarVariant(max, amount) {
  const ratio = amount / max
  if (ratio > 0.75) {
    return 'danger'
  }
  if (ratio > 0.5) {
    return 'warning'
  }
}

export default BudgetCard
