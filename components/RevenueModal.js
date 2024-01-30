/* eslint-disable react/prop-types */
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter, Form,
} from 'react-bootstrap';

const CloseOrderModal = ({
  onSubmit, orderTotal, toggleOn, toggleOff,
}) => {
  console.warn('CloseOrderForm rendered');
  // const toggle = () => setModal(!modal);
  const [tip, setTip] = useState('');
  const [paymentType, setPaymentType] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    // Prevent form from being submitted
    e.preventDefault();
    onSubmit({ tip, paymentType });
    toggleOff();
    router.push('/orders/orders');
  };

  return (
    <div>
      {/* <Button color="danger" onClick={toggle}>
        Click Me
      </Button> */}
      <Modal show={toggleOn} onHide={toggleOff}>
        <ModalHeader onHide={toggleOff}>Close Order</ModalHeader>
        <ModalBody>
          <p>Order Total: ${orderTotal.toFixed(2)}</p>
          <p> Tip: {tip !== '' ? `$${parseFloat(tip).toFixed(2)}` : ''}</p>
          <Form>
            <Form.Group>
              <Form.Label> Enter Tip: </Form.Label>
              <Form.Control type="number" value={tip} onChange={(e) => setTip(e.target.value)} />
              <Form.Label> Payment Type</Form.Label>
              <Form.Control as="select" value={paymentType} onChange={(e) => setPaymentType(e.target.value)}>
                <option>Choose Payment Type</option>
                <option>Debit</option>
                <option>Cash</option>
                <option>Credit</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>
            Finalize
          </Button>{' '}
          <Button color="secondary" onClick={toggleOff}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default CloseOrderModal;
