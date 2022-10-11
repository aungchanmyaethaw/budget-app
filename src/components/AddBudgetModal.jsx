import { Modal, Form, Button } from 'react-bootstrap'
import { useRef } from 'react'
import { useBudgetContext } from '../contexts/BudgetContext'
const AddBudgetModal = ({ show, handleClose }) => {
  const nameRef = useRef()
  const maximumRef = useRef()
  const { addBudget } = useBudgetContext()
  function handleSubmit(e) {
    e.preventDefault()
    addBudget({
      name: nameRef.current.value,
      maximum: parseFloat(maximumRef.current.value),
    })
    handleClose()
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>New Budget</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" ref={nameRef} required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="maximum">
            <Form.Label>Maximum Spending</Form.Label>
            <Form.Control
              type="number"
              min={0}
              step={0.01}
              ref={maximumRef}
              required
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Add
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default AddBudgetModal
