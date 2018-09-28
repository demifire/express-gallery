const bookshelf = require('./bookshelf')

const Photos = bookshelf.Model.extend({
  tableName: 'gallery',
  idAttribute: 'gallery_id',
  hasTimestamps: true
})

module.exports = Photos