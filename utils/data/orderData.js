import { clientCredentials } from '../client';

const getOrders = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orders`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createOrder = (order) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateOrder = (payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orders/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((data) => {
      if (data) {
        resolve(data);
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

// const updateOrder = (id, currentOrder) => new Promise((resolve, reject) => {
//   fetch(`${clientCredentials.databaseURL}/orders/${id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(currentOrder),
//   })
//     .then(resolve)
//     .catch(reject);
// });

const getSingleOrder = (order) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orders/${order}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteOrder = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orders/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(resolve)
    .catch(reject);
});

const removeOrderItem = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orderitems/${id}`, {
    method: 'DELETE',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response error');
      }
      resolve();
    })
    .catch(reject);
});

const closeOrder = (order, uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orders/${order}/close_order`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${uid}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      return response.json();
    })
    .then(resolve)
    .catch(reject);
});

const createRevenue = (rev) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/revenues`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(rev),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch((error) => {
      console.error('Create Order Error:', error);
      reject(error);
    });
});

const getRevenues = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/revenues`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => resolve(data))
    .catch((error) => {
      console.error('Error fetching revenue data:', error);
      reject(error);
    });
});

export {
  getOrders, createOrder, updateOrder, getSingleOrder, deleteOrder, removeOrderItem, closeOrder, createRevenue, getRevenues,
};
