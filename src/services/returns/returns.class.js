const { Service } = require('feathers-sequelize');

exports.Returns = class Returns extends Service {
  constructor(options, app) {
    super(options, app);
    this.app = app;
  }
  async create(data) {
    /**
     * data.receipt_id: number
     * data.items: array->item
     *    item.type: enum(error, damaged)
     *    item.price: number
     *    item.quantity: number
     *    item.item_id: number
     *    item.receipt_item_id: number
     */
    const receipt = await this.app.service('receipts').get(data.receipt_id);
    const returnr = await super.create({ receipt_id: receipt.id });
    const items = await this.app.service('return-items').create(data.items.map((item) => ({
      ...item,
      return_id: returnr.id
    })));
    for (let i = 0; i < data.items.length; i++) {
      const item = data.items[i];
      const product = await this.app.service('items').get(item.item_id);
      const rItem = await this.app.service('receipt-items').get(item.receipt_item_id);

      // modify receipt item
      if (rItem.quantity - item.quantity > 0)
        await this.app.service('receipt-items').patch(item.receipt_item_id, {
          quantity: rItem.quantity - item.quantity
        });
      else await this.app.service('receipt-items').remove(item.receipt_item_id);

      if (item.type === 'error') {
        // return to stock
        await this.app.service('items').patch(item.item_id, {
          quantity: product.quantity + item.quantity
        });
      } else if (item.type === 'damaged') {
        // move to bad stock
        await this.app.service('items').patch(item.item_id, {
          bad_quantity: product.bad_quantity + item.quantity
        });
      }
    }
    return returnr;
  }
};
