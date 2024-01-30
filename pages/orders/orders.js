import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import OrderCard from '../../components/OrderCard';
import { getOrders } from '../../utils/data/orderData';

function Home() {
  const [orders, setOrders] = useState([]);
  const router = useRouter();

  // const showOrders = () => {
  //   getOrders().then((data) => setOrders(data));
  // };

  // useEffect(() => {
  //   showOrders();
  // }, []);
  // console.warn(orders);

  const showOrders = async () => {
    const data = await getOrders();
    setOrders(data);
  };

  useEffect(() => {
    const intervalTime = setInterval(() => {
      showOrders();
    }, 500);

    return () => clearInterval(intervalTime);
  }, []);

  return (
    <>
      <div className="post-header">
        <h1 className="welcome-text">Orders</h1>
        <Button
          className="register-btn"
          onClick={() => {
            router.push('/orders/new');
          }}
        >
          Create New Order
        </Button>
      </div>
      <hr />
      <div style={{
        display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center',
      }}
      >
        {orders.map((order) => (
          <div key={`order--${order.id}`} className="post">
            <OrderCard
              obj={order}
              onUpdate={showOrders}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
