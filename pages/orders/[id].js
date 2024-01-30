/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import {
  getSingleOrder, deleteOrder, createRevenue, closeOrder,
} from '../../utils/data/orderData';
import { getItemsOnSingleOrder } from '../../utils/data/OrderItemData';
import ItemCard from '../../components/ItemCard';
import CloseOrderModal from '../../components/RevenueModal';

function ViewOrder() {
  const [orderDetails, setOrderDetails] = useState({});
  const [items, setItems] = useState([]);
  const router = useRouter();
  const [orderTotal, setOrderTotal] = useState(0);
  // const [closeOrderForm, setCloseOrderForm] = useState(false);
  // const { user } = useAuth();
  const { id } = router.query ?? {};
  const [closeOrderForm, setCloseOrderForm] = useState(false);
  console.warn(orderDetails);

  // const getOrderItems = () => {
  //   getItemsOnSingleOrder(id)
  //     .then((data) => setItems(data));
  // };

  const closeThisOrder = () => {
    console.warn('closeThisOrder button clicked');
    setCloseOrderForm(true);
  };

  // const closeOrderSubmission = ({ tip, paymentType }) => {
  //   closeOrder(id)
  //     .then(() => {
  //       const revenueData = {
  //         order: parseInt(id, 10),
  //         payment_type: paymentType,
  //         total_order_amount: orderTotal.toString(),
  //         tip_amount: parseFloat(tip).toFixed(2),
  //       };

  //       createRevenue(revenueData)
  //         .then(() => {
  //         })
  //         .catch((error) => {
  //           console.error('Error creating revenue:', error);
  //         });
  //     });
  // };

  const closeOrderSubmission = async ({ tip, paymentType }) => {
    try {
      await closeOrder(id);
      const revenueData = {
        order: parseInt(id, 10),
        payment_type: paymentType,
        total_order_amount: orderTotal.toString(),
        tip_amount: parseFloat(tip).toFixed(2),
      };
      await createRevenue(revenueData);
      router.push('/revenues/revenues');
    } catch (error) {
      console.error('Error closing order:', error);
    }
  };

  const getOrderItems = () => {
    getItemsOnSingleOrder(id)
      .then((data) => {
        // console.warn('Items data:', data);
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

  const deleteThisOrder = () => {
    // console.warn('Deleting post with ID:', id);
    if (window.confirm('Delete Order?')) {
      deleteOrder(id).then(() => {
        router.push('/orders/orders');
      });
    }
  };

  // const calculateOrderTotal = () => {
  //   const total = items.reduce((itemTotal, item) => itemTotal + item.price, 0);
  //   setOrderTotal(total);
  //   return total.toFixed(2);
  // };

  useEffect(() => {
    getSingleOrder(id)
      .then((data) => setOrderDetails(data))
      .then(getOrderItems);
  }, [id]);

  useEffect(() => {
    // Calculate order total only if items have been fetched
    if (items.length > 0) {
      const total = items.reduce((itemTotal, item) => itemTotal + item.price, 0);
      setOrderTotal(total);
    }
  }, [items]);

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

            <div><Button className="delete-button" variant="black" onClick={deleteThisOrder}>Delete This Order</Button></div>
            <div><Button className="delete-button" variant="black" href={`/orders/edit/${orderDetails.id}`}>Edit This Order</Button></div>
            <div>
              <Link href={`/orders/add/${id}`} passHref>
                <Button variant="black" className="addItems">Add items to Order</Button>
              </Link>
            </div>
            <div>
              <Button variant="black" onClick={closeThisOrder}>Close Order</Button>
              <CloseOrderModal
                toggleOn={closeOrderForm}
                toggleOff={() => setCloseOrderForm(false)}
                onSubmit={closeOrderSubmission}
                orderTotal={orderTotal}
              />
            </div>

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
              <div>Order Total: ${orderTotal.toFixed(2)}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewOrder;
