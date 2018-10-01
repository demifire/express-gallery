const bookshelf = require('./bookshelf')

const Gallery = bookshelf.Model.extend({
  tableName: 'gallery',
  idAttribute: 'id',
  hasTimestamps: true
})

module.exports = Gallery;