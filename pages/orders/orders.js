import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import OrderCard from '../../components/OrderCard';
import { getOrders } from '../../utils/data/orderData';

function Home() {
  const [orders, setPosts] = useState([]);
  const router = useRouter();

  const showOrders = () => {
    getOrders().then((data) => setPosts(data));
  };
  useEffect(() => {
    showOrders();
  }, []);
  console.warn(orders);

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

// function Home() {
//   const [orders, setOrders] = useState([]);
//   const router = useRouter();

//   useEffect(() => {
//     getOrders().then((data) => setOrders(data));
//   }, []);

//   const updateCards = () => {
//     getOrders().then((data) => setOrders(data));
//   };

//   return (
//     <article className="orders">
//       <h1>All Orders</h1>
//       <Button
//         onClick={() => {
//           router.push('/orders/new');
//         }}
//       >
//         Create New Order
//       </Button>

//       {orders.map((order) => (
//         <section key={`order--${order.id}`} className="order">
//           <OrderCard id={order.id} name={order.name} customerPhone={order.customer_phone} customerEmail={order.customer_email} orderType={order.order_type} onUpdate={updateCards} />
//         </section>
//       ))}
//     </article>

//   );
// }

// export default Home;
