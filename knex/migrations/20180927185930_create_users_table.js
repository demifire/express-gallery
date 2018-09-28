exports.up = function (knex, Promise) {
  return knex.schema.createTable('user', table => {
    table.increments('user_id').primary();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.timestamps(true, true); // shorthand notation for created_at updated_at
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('user')
};
