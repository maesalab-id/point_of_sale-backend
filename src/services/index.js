const users = require('./users/users.service.js');
const items = require('./items/items.service.js');
const orders = require('./orders/orders.service.js');
const orderList = require('./order-list/order-list.service.js');
const receipts = require('./receipts/receipts.service.js');
const receiptItems = require('./receipt-items/receipt-items.service.js');
const refunds = require('./refunds/refunds.service.js');
const categories = require('./categories/categories.service.js');
const customers = require('./customers/customers.service.js');
const vendors = require('./vendors/vendors.service.js');
const vouchers = require('./vouchers/vouchers.service.js');
const returns = require('./returns/returns.service.js');
const returnItems = require('./return-items/return-items.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(items);
  app.configure(orders);
  app.configure(orderList);
  app.configure(receipts);
  app.configure(receiptItems);
  app.configure(refunds);
  app.configure(categories);
  app.configure(customers);
  app.configure(vendors);
  app.configure(vouchers);
  app.configure(returns);
  app.configure(returnItems);
};
