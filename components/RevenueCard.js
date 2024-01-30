/* eslint-disable react/prop-types */
import React from 'react';
import { Card } from 'react-bootstrap';

function RevenueCard({
  totalRevenue, totalTips,
}) {
  return (
    <Card className="text-center">
      <Card.Header as="h5">Revenue!</Card.Header>
      <Card.Body>
        <Card.Title>Total Revenue: ${totalRevenue.toFixed(2)}</Card.Title>
        <Card.Text>Total Tips: ${totalTips.toFixed(2)}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default RevenueCard;
