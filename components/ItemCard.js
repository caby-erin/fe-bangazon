import PropTypes from 'prop-types';
import React from 'react';
import { Card } from 'react-bootstrap';

export default function ItemCard({ obj }) {
  // const router = useRouter();

  return (

    <Card className="text-center">
      <Card.Header>Item Name: {obj.name}</Card.Header>
      <Card.Header>Price: {obj.price}</Card.Header>
    </Card>
  );
}

ItemCard.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};
