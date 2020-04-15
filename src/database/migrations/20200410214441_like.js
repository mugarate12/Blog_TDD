exports.up = function(knex) {
  return knex.schema.createTable ('likes', function (table) {
    table.increments()

    table.timestamp('created_at', { useTz: true })
    table.timestamp('updated_at', { useTz: true })

    table.integer('userIDFK').unsigned()
    table.integer('postIDFK').unsigned()
    
    table.foreign('userIDFK').references('id').inTable('users')
    table.foreign('postIDFK').references('id').inTable('posts')
  })  
};

exports.down = function(knex) {
  return knex.schema.dropTable('likes')
};
