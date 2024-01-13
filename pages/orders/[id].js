/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { getSingleOrder, deleteOrder } from '../../utils/data/orderData';
import { useAuth } from '../../utils/context/authContext';

function ViewOrder() {
  const [orderDetails, setOrderDetails] = useState({});
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query ?? {};

  console.warn(orderDetails);
  console.warn('orderDetails.user:', orderDetails.user);
  console.warn('user:', user);
  console.warn('uid:', user.uid);

  const deleteThisOrder = () => {
    console.warn('Deleting post with ID:', id);
    if (window.confirm('Delete Order?')) {
      deleteOrder(id).then(() => {
        router.push('/orders/orders');
      });
    }
  };

  useEffect(() => {
    getSingleOrder(id, user.uid)
      .then(setOrderDetails);
  }, [id]);

  return (
    <>
      <Head>
        <title>{orderDetails?.name}</title>
      </Head>
      <div className="mt-5 d-flex flex-wrap post-details-cont">
        <div className="d-flex flex-column post-details-cont" />
        <div className="text-white ms-5 details">
          <div className="post-details-cont">
            <div className="post-content-cont">
              <h2 className="post-details-title">Order Name: {orderDetails?.name}</h2>
              <h2 className="post-details-text">Customer Phone: {orderDetails?.customer_phone}</h2>
              <h2 className="post-details-text">Customer Email: {orderDetails?.customer_email}</h2>
              <h2 className="post-details-text">Order Type: {orderDetails?.order_type}</h2>
            </div>
            {/* <Button className="delete-button" variant="black" onClick={deleteThisOrder}>Delete This Order</Button>
            <Button className="delete-button" variant="black" href={`/orders/edit/${orderDetails.id}`}>Edit Order</Button> */}
            <div>{(orderDetails.user?.id === user.id) ? (<Button className="delete-button" variant="black" onClick={deleteThisOrder}>Delete This Order</Button>) : ''}</div>
            <div>{(orderDetails.user?.id === user.id) ? (<Button className="delete-button" variant="black" href={`/orders/edit/${orderDetails.id}`}>Edit This Order</Button>) : ''}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewOrder;
