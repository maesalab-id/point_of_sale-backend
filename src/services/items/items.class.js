const { Service } = require('feathers-sequelize');

exports.Items = class Items extends Service {
  async create(data) {
    if (data.image)
      data.image = Buffer.from(data.image, 'base64');
    return await super.create(data);
  }

  async patch(id, data) {
    if (data.image)
      data.image = Buffer.from(data.image, 'base64');
    return await super.patch(id, data);
  }

  async update(id, data) {
    if (data.image)
      data.image = Buffer.from(data.image, 'base64');
    return await super.update(id, data);
  }
};
