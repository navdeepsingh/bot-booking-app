'use strict'

const Room = use('App/Model/Room')
const Meeting = use('App/Model/Meeting')
const moment = use('moment');

class BookingController {

  * index (request, response) {
      const rooms = yield Room.all()
      yield response.sendView('welcome', { rooms :  rooms.toJSON(), roomId : request.param('id') })
  }

  * getMeetings (request, response) {
      const roomId = request.param('id')
      const roomFirst = yield Room.query().first()
      let meetings = yield Meeting.query().where('room_id',roomFirst.id)
      if (roomId) {
        meetings = yield Meeting.query().where('room_id',roomId)
      }

      response.json( { result : meetings} )
  }

}

module.exports = BookingController
