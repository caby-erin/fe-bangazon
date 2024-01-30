import { clientCredentials } from '../client';

const getItemsOnSingleOrder = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orders/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const addItemToOrder = (payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orderitems`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export { getItemsOnSingleOrder, addItemToOrder };
