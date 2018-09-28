exports.up = function (knex, Promise) {
  return knex.schema.createTable('gallery', table => {
    table.increments('gallery_id').primary();
    table.string('author').notNullable();
    table.string('link').notNullable();
    table.string('description').notNullable();
    table.integer('user_id').references('user_id').inTable('user').onDelete('cascade');
    table.timestamps(true, true); //creates created_at && updarted_at columns automatically
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('gallery')
};
