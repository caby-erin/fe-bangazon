import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { addItemToOrder } from '../../../utils/data/OrderItemData';
import getItems from '../../../utils/data/ItemData';

function AddOrderItems() {
  const [items, setItems] = useState([]);
  const [itemList, setItemList] = useState([]);
  const [orderId, setOrderId] = useState(null);

  const router = useRouter();
  const { id } = router.query;

  const allItems = () => {
    getItems().then(setItems);
  };

  useEffect(() => {
    allItems();
    // getOrderDetails();
    setOrderId(id);
  }, [id]);

  const handleChange = (e) => {
    const { value, checked } = e.target;

    setItemList((prevArray) => (
      checked ? [...prevArray, value] : prevArray.filter((itemId) => itemId !== value)
    ));
  };

  const handleSubmit = async () => {
    const handleAddItems = itemList.map(async (itemId) => {
      const itemsAdded = {
        order: orderId,
        item: itemId,
      };
      await addItemToOrder(itemsAdded);
    });

    await Promise.all(handleAddItems);
    router.push(`/orders/${id}`);
  };

  return (
    <>
      <div className="add-item-container">
        <div>
          <h2> Menu </h2>
          <div className="menu-items">
            {items.map((item) => (
              <Form key={item.id}>
                <Form.Group>
                  <div className="checkform">
                    <Form.Check type="checkbox" label={item.name} value={item.id} onChange={handleChange} />
                  </div>
                </Form.Group>
              </Form>
            ))}
          </div>
          <Button onClick={handleSubmit} className="add-items-btn">Add Items</Button>
        </div>
      </div>
    </>
  );
}

export default AddOrderItems;
