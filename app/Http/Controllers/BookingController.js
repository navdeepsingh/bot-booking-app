'use strict'

const Room = use('App/Model/Room')
const Meeting = use('App/Model/Meeting')
const moment = use('moment');

class BookingController {

  * index (request, response) {
      const rooms = yield Room.all()
      let selectedRoom = yield Room.query().first()
      const roomId = request.param('id')

      if (roomId) {
        selectedRoom = yield Room.findBy('id', roomId)
      }

      yield response.sendView('booking', { rooms :  rooms.toJSON(), selectedRoom : selectedRoom })
  }

  * getMeetings (request, response) {
      const roomId = request.param('id')
      const roomFirst = yield Room.query().first()
      let meetings = yield Meeting.query().where('room_id', roomFirst.id)

      if (roomId) {
        meetings = yield Meeting.query().where('room_id', roomId)
      }

      response.json( { result : meetings} )
  }

  * store(request, response) {
      const user = yield request.auth.getUser()
      const meeting = new Meeting()
      let data = request.except('_csrf')

      meeting.room_id = data.room_id
      meeting.date = data.date
      meeting.title = data.title

      yield user.meetings().save(meeting)

      response.json({result : true, redirect : `/room/${data.room_id}`})
  }

}

module.exports = BookingController
