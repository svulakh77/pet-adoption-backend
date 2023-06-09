exports.up = function (knex) {
    return knex.schema.createTable('pets', (table) => {
      table.increments('id').primary();
      table.string('type').notNull();
      table.string('petName').notNull();
      table.string('adoptionStatus').notNullable().default('Available');
      table.string('pic').notNull();
      table.integer('height').notNull();
      table.integer('weight').notNull();
      table.string('color').notNull();
      table.string('petBio').notNull();
      table.boolean('hypoallergenic');
      table.string('dietaryRestrictions').notNull();
      table.string('breed').notNull();
      table.integer('ownerId').notNull().default(0);
      table.timestamp('dateCreated').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('pets');
  };