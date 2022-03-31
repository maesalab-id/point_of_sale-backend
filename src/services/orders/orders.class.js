const { Service } = require('feathers-sequelize');

exports.Orders = class Orders extends Service {
  constructor(options, app) {
    super(options, app);
    this.app = app;
  }
  async create(data) {
    const lastOrder = (await this.app.service('orders').find({
      query: {
        $select: ['order_number'],
        $limit: 1,
        $sort: {
          order_number: -1
        }
      }
    })).data[0];

    const order = await super.create({
      order_number: lastOrder ? lastOrder.order_number + 1 : 1,
      tax: this.app.get('taxValue'),
      vendor_id: data.vendor_id
    });
    data.orders = data.orders.map((d) => ({ ...d, order_id: order.id }));
    const orderList = await this.app.service('order-list').create(data.orders);
    order.order_list = orderList;

    for (let i = 0; i < orderList.length; i++) {
      const ol = orderList[i];
      const item = await this.app.service('items').get(ol.item_id);
      await this.app.service('items').patch(ol.item_id, {
        quantity: parseInt(item.quantity, 10) + parseInt(ol.quantity, 10)
      });
    }
    return order;
  }
};
