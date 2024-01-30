import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { removeOrderItem } from '../utils/data/orderData';

export default function ItemCard({ obj, onUpdate }) {
  // const router = useRouter();
  const deleteThisItem = () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      removeOrderItem(obj.id).then(() => onUpdate());
    }
  };

  return (

    <Card className="text-center">
      <Card.Header>Item Name: {obj.name}</Card.Header>
      <Card.Header>Price: {obj.price}</Card.Header>
      <Button onClick={deleteThisItem}> Remove Item</Button>
    </Card>
  );
}

ItemCard.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
