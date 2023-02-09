exports.up = function (knex) {
    return knex.schema.createTable('saves',(table)=>{
        table.integer('ownerId').notNull();
        table.integer('petId').notNull()
    })}
    exports.down = function (knex) {
        return knex.schema.dropTable('saves');
      };