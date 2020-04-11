exports.up = function(knex) {
  return knex.schema.createTable ('like', function (table) {
    table.increments()

    table.timestamp('created_at', { useTz: true })
    table.timestamp('updated_at', { useTz: true })

    table.integer('userIDFK').unsigned()
    table.integer('postIDFK').unsigned()
    
    table.foreign('userIDFK').references('id').inTable('user')
    table.foreign('postIDFK').references('id').inTable('post')
  })  
};

exports.down = function(knex) {
  return knex.schema.dropTable('like')
};
