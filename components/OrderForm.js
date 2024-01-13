import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { updateOrder, createOrder } from '../utils/data/orderData';
import { useAuth } from '../utils/context/authContext';

const initialState = {
  id: 0,
  name: '',
  customerPhone: '',
  customerEmail: '',
  orderType: '',
  isClosed: false,
};

function OrderForm({ obj }) {
  const [currentOrder, setCurrentOrder] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.id) {
      setCurrentOrder({
        id: obj.id,
        name: obj.name,
        customerPhone: obj.customer_phone,
        customerEmail: obj.customer_email,
        orderType: obj.order_type,
        user: user.id,
      });
    }
  }, [obj, user]);
  console.warn(currentOrder);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentOrder((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      const payload = {
        id: obj.id,
        name: currentOrder.name,
        customerPhone: currentOrder.customerPhone,
        customerEmail: currentOrder.customerEmail,
        orderType: currentOrder.orderType,
        user: user.id,
      };
      console.warn({ payload });
      updateOrder(payload, user.id).then(() => router.push('/orders/orders'));
    } else {
      const payload = { ...currentOrder, user: user.id };
      console.warn('Payload:', payload);
      createOrder(payload)
        .then(() => router.push('/orders/orders'));
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control name="name" required value={currentOrder.name} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Customer Phone</Form.Label>
          <Form.Control name="customerPhone" required value={currentOrder.customerPhone} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control name="customerEmail" required value={currentOrder.customerEmail} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Order Type</Form.Label>
          <Form.Control name="orderType" required value={currentOrder.orderType} onChange={handleChange} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

OrderForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    customer_phone: PropTypes.string,
    customer_email: PropTypes.string,
    order_type: PropTypes.string,
  }),
};

OrderForm.defaultProps = {
  obj: initialState,
};

export default OrderForm;
