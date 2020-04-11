exports.up = function(knex) {
  return knex.schema.createTable ('post', function (table) {
    table.increments()

    table.string('title').notNullable()
    table.string('content').notNullable()

    table.timestamp('created_at', { useTz: true })
    table.timestamp('updated_at', { useTz: true })

    table.integer('userIDFK').unsigned()

    table.foreign('userIDFK').references('id').inTable('user')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('post')
}
