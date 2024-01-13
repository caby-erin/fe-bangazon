import React, { useEffect, useState } from 'react';
import ItemCard from '../../components/ItemCard';
import getItems from '../../utils/data/ItemData';

function Home() {
  const [items, setItems] = useState([]);

  const showItems = () => {
    getItems().then((data) => setItems(data));
  };
  useEffect(() => {
    showItems();
  }, []);
  console.warn(items);
  return (
    <>
      <div className="post-header">
        <h1 className="welcome-text">Menu</h1>
      </div>
      <hr />
      <div style={{
        display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center',
      }}
      >
        {items.map((item) => (
          <div key={`item--${item.id}`} className="item">
            <ItemCard
              obj={item}
              onUpdate={getItems()}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
