'use strict'

const Schema = use('Schema')

class RoomSchema extends Schema {

  up () {
    this.create('rooms', (table) => {
      table.increments()
      table.string('name', 254).notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('rooms')
  }

}

module.exports = RoomSchema
