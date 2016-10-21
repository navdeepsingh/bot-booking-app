'use strict'

const Schema = use('Schema')

class MeetingsSchema extends Schema {

  up () {
    this.create('meetings', (table) => {
      table.increments()
      table.integer('room_id').unsigned()
      table.foreign('room_id').references('rooms.id')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('users.id')
      table.date('date')
      table.time('start_time')
      table.time('end_time')
      table.string('title')
      table.string('description')
      table.timestamps()
    })
  }

  down () {
    this.drop('meetings')
  }

}

module.exports = MeetingsSchema
