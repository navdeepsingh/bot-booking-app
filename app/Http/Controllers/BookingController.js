'use strict'

const Room = use('App/Model/Room')

class BookingController {

  * index (request, response) {
      const rooms = yield Room.all()
      yield response.sendView('welcome', { rooms :  rooms.toJSON() })
  }

}

module.exports = BookingController
