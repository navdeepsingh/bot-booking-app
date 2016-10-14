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
      let meetings = yield Meeting.query().where('room_id', roomFirst.id).orderBy('date', 'ASC')

      if (roomId) {
        meetings = yield Meeting.query().where('room_id', roomId).orderBy('date', 'ASC')
      }

      response.json( { result : meetings} )
  }

  * store (request, response) {
      const user = yield request.auth.getUser()
      const meeting = new Meeting()
      const meetingData = request.except('_csrf')

      meeting.room_id = meetingData.room_id
      meeting.date = meetingData.date
      meeting.title = meetingData.title

      yield user.meetings().save(meeting)

      response.json({result : true, redirect : `/room/${meetingData.room_id}`})
  }

  * edit (request, response) {
      const id = request.param('id')
      const meeting = yield Meeting.findBy('id', id)

      response.json({meeting : meeting})
  }

  * update (request, response) {
      const meetingId = request.param('id')
      const user = yield request.auth.getUser()

      const meeting = yield Meeting.findBy('id', meetingId)
      const meetingData = request.except('_csrf')

      meeting.user_id = user.id
      meeting.room_id = meetingData.room
      meeting.date = meetingData.date
      meeting.title = meetingData.title

      yield meeting.save()

      response.json({result : true, redirect : `/room/${meetingData.room}`})
  }

}

module.exports = BookingController
