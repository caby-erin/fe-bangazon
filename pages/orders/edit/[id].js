import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import OrderForm from '../../../components/OrderForm';
import { getSingleOrder } from '../../../utils/data/orderData';
import { useAuth } from '../../../utils/context/authContext';

export default function EditOrderDetails() {
  const [editOrder, setEditOrder] = useState({});
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  console.warn(id);

  useEffect(() => {
    getSingleOrder(id).then(setEditOrder);
  }, [id]);

  console.warn(setEditOrder);

  return (<OrderForm user={user} obj={editOrder} />);
}
