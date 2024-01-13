/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { getSingleOrder, deleteOrder } from '../../utils/data/orderData';
import { useAuth } from '../../utils/context/authContext';
import getItemsOnSingleOrder from '../../utils/data/OrderItemData';
import ItemCard from '../../components/ItemCard';

function ViewOrder() {
  const [orderDetails, setOrderDetails] = useState({});
  const [items, setItems] = useState([]);
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query ?? {};

  // const getOrderItems = () => {
  //   getItemsOnSingleOrder(id)
  //     .then((data) => setItems(data));
  // };

  const getOrderItems = () => {
    getItemsOnSingleOrder(id)
      .then((data) => {
        console.warn('Items data:', data);
        const itemsData = data.items || [];
        if (Array.isArray(itemsData)) {
          setItems(itemsData);
        } else {
          console.error('Error: Items data is not an array.');
        }
      })
      .catch((error) => {
        console.error('Error fetching items:', error);
      });
  };

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
    getSingleOrder(id)
      .then((data) => setOrderDetails(data))
      .then(getOrderItems);
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
            <div>{(orderDetails.user?.id === user.id) ? (<Button className="delete-button" variant="black">Add Item to order</Button>) : ''}</div>
            <div>
              <h2>Order Items:</h2>
              {items.map((item) => (
                <section key={`item--${item.id}`} className="item">
                  <ItemCard
                    obj={item}
                    onUpdate={getOrderItems}
                  />
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewOrder;
