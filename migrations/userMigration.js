exports.up = function (knex) {
    return knex.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('email').notNull();
      table.string('password').notNull();
      table.string('repassword').notNull();
      table.string('firstName').notNull();
      table.string('lastName').notNull();
      table.string('phoneNumber').notNull();
      table.boolean("isAdmin");
      table.string('bio');
      table.timestamp('dateCreated').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('users');
  };