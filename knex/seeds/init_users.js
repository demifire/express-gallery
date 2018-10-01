exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          email: 'admin@admin.net',
          username: 'admin',
          password: 'admin'
        },
        {
          email: 'hkotak@hawaii.edu',
          username: 'harsh_kotak',
          password: 'abc123'
        },
        {
          email: 'johndoe123@hotmail.com',
          username: 'john_doe',
          password: 'password'
        },
      ]);
    });
};