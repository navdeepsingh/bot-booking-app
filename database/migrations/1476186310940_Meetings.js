'use strict'

const Schema = use('Schema')

class MeetingsSchema extends Schema {

  up () {
    this.create('meetings', (table) => {
      table.increments()
      table.integer('room_id').unsigned()
      table.foreign('room_id').references('rooms.id')
      table.date('date')
      table.string('title')
      table.string('location')
      table.timestamps()
    })
  }

  down () {
    this.drop('meetings')
  }

}

module.exports = MeetingsSchema
