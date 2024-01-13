import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';

export default function OrderCard({ obj }) {
  // const router = useRouter();

  return (

    <Card className="text-center">
      <Card.Header>Order Name: {obj.name}</Card.Header>
      <Card.Body>
        <Card.Text className="text-muted">Order Type: {obj.order_type}</Card.Text>

        <Link href={`/orders/${obj.id}`} passHref>
          <Button variant="primary" className="m-2">
            View Order
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

OrderCard.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    customer_phone: PropTypes.string.isRequired,
    customer_email: PropTypes.string.isRequired,
    order_type: PropTypes.string.isRequired,
  }).isRequired,
};

// const OrderCard = ({
//   id,
//   name,
//   customerPhone,
//   customerEmail,
//   orderType,
//   onUpdate,
// }) => {
//   const deleteThisOrder = () => {
//     if (window.confirm('Are you sure you want to delete this order?')) {
//       deleteOrder(id).then(() => onUpdate());
//     }
//   };
//   return (
//     <Card className="text-center">
//       <Card.Header>Order Name: {name}</Card.Header>
//       <Card.Body>
//         <Card.Text> Customer Phone: {customerPhone}</Card.Text>
//         <Card.Text> Customer Email: {customerEmail}</Card.Text>
//         <Card.Text> Order Type: {orderType}</Card.Text>
//         <Link href={`/orders/edit/${id}`} passHref>
//           <Button variant="primary" className="m-2">
//             Edit Order
//           </Button>
//         </Link>
//         <Button onClick={deleteThisOrder}>
//           Delete Order
//         </Button>
//       </Card.Body>
//     </Card>
//   );
// };

// OrderCard.propTypes = {
//   id: PropTypes.number.isRequired,
//   name: PropTypes.string.isRequired,
//   customerPhone: PropTypes.string.isRequired,
//   customerEmail: PropTypes.string.isRequired,
//   orderType: PropTypes.string.isRequired,
//   onUpdate: PropTypes.func.isRequired,
// };

// export default OrderCard;
