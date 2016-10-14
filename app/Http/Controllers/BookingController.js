'use strict'

const Room = use('App/Model/Room')
const Meeting = use('App/Model/Meeting')
const moment = use('moment');
const Database = use('Database')

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
      let roomId = request.param('id')
      const roomFirst = yield Room.query().first()

      if (!roomId) {
        roomId = roomFirst.id
      }

      const meetings = yield Database
                        .table('meetings')
                        .select('users.username', 'meetings.id', 'meetings.room_id', 'meetings.date', 'meetings.title')
                        .innerJoin('users', 'meetings.user_id', 'users.id')
                        .where('room_id', roomId)
                        .orderBy('date', 'ASC')

      //const meetings = yield Meeting.query().where('room_id', roomId).orderBy('date', 'ASC')

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

      const meetingExist = yield Meeting.query().where({'room_id' : meetingData.room, 'date' : meetingData.date})

      console.log(meetingExist.length)
      if (meetingExist.length == 0) {
        meeting.user_id = user.id
        meeting.room_id = meetingData.room
        meeting.date = meetingData.date
        meeting.title = meetingData.title

        yield meeting.save()

        response.json({result : true, redirect : `/room/${meetingData.room}`})
      } else {
         response.unauthorized({error: `Room is already booked for this date ${moment(meetingData.date).format('ll')}`})
      }

  }

}

module.exports = BookingController
