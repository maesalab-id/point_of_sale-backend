const { Service } = require('feathers-sequelize');
const { NotAcceptable } = require('@feathersjs/errors');

exports.Receipts = class Receipts extends Service {
  constructor(options, app) {
    super(options, app);
    this.app = app;
  }
  async create(data) {
    for (let i = 0; i < data.items.length; i++) {
      const d = data.items[i];
      const item = await this.app.service('items').get(d.item_id);
      if (item.quantity < d.quantity) throw NotAcceptable(`Item quantity not enough at ${item.name}`);
    }
    const lastReceipt = (await this.app.service('receipts').find({
      query: {
        $select: ['receipt_number'],
        $limit: 1,
        $sort: {
          receipt_number: -1
        }
      }
    })).data[0];

    const receipt = await super.create({
      receipt_number: lastReceipt ? lastReceipt.receipt_number + 1 : 1,
      tax: this.app.get('taxValue'),
      voucher_id: data.voucher_id,
      customer_id: data.customer_id
    });
    data.items = data.items.map((d) => ({ ...d, receipt_id: receipt.id, discount: d.discount }));
    const receiptItems = await this.app.service('receipt-items').create(data.items);
    receipt.receipt_items = receiptItems;

    for (let i = 0; i < receiptItems.length; i++) {
      const ri = receiptItems[i];
      const item = await this.app.service('items').get(ri.item_id);
      await this.app.service('items').patch(ri.item_id, {
        quantity: item.quantity - ri.quantity
      });
    }
    return receipt;
  }
};
