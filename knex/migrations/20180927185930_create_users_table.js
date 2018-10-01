exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('email').notNullable();
    table.string('username').notNullable();
    table.string('password').notNullable();
    table.timestamps(true, true); // shorthand notation for created_at updated_at
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('users')
};
