exports.up = function (knex) {
    return knex.schema.createTable('pets', (table) => {
      table.increments('id').primary();
      table.string('type').notNull();
      table.string('name').notNull();
      table.enu('adoptionStatus', ['Adopted', 'Fostered', 'Availible']).notNullable().default('Availible')
      table.binary('picture',[100]).notNull();
      table.float('height').notNull();
      table.float('weight').notNull();
      table.string('color').notNull();
      table.binary('bio',[100]).notNull();
      table.boolean('hypoallergenic');
      table.binary('dietaryRestrictions',[100]).notNull();
      table.string('breed').notNull();
      table.timestamp('dateCreated').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('pets');
  };