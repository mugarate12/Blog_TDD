exports.up = function (knex) {
  
  return knex.schema.createTable ('users', function (table) {
    table.increments()

    table.string('username').notNullable()
    table.string('name').notNullable()
    table.string('password').notNullable()
    table.string('description').notNullable()

    table.unique('username')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('users')
}
