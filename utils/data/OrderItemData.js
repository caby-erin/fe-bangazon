import { clientCredentials } from '../client';

const getItemsOnSingleOrder = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orders/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export default getItemsOnSingleOrder;
