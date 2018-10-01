exports.up = function (knex, Promise) {
  return knex.schema.createTable('gallery', table => {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.string('image_url').notNullable();
    table.string('description', 1000).notNullable();
    table.integer('user_id').references('id').inTable('users').onDelete('cascade');
    table.timestamps(true, true); //creates created_at && updarted_at columns automatically
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('gallery')
};
