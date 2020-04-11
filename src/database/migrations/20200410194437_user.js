exports.up = function (knex) {
  
  return knex.schema.createTable ('user', function (table) {
    table.increments()

    table.string('username').notNullable()
    table.string('name').notNullable()
    table.string('password').notNullable()
    table.string('description').notNullable()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('user')
}
