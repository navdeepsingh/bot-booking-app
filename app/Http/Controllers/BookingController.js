'use strict'

const Room = use('App/Model/Room')
const moment = use('moment');

class BookingController {

  * index (request, response) {
      const rooms = yield Room.all()
      yield response.sendView('welcome', { rooms :  rooms.toJSON() })
  }

  * getMeetings (request, response) {
      var currentMonth = moment().format('YYYY-MM');
      var nextMonth    = moment().add('month', 1).format('YYYY-MM');
      var events = [
        { date: currentMonth + '-' + '10', title: 'Sailsjs Presentation', location: 'IT Room' },
        { date: currentMonth + '-' + '10', title: 'Test', location: 'Skype' },
        { date: currentMonth + '-' + '19', title: 'Cat Frisbee', location: 'Jefferson Park' },
        { date: currentMonth + '-' + '23', title: 'Kitten Demonstration', location: 'Center for Beautiful Cats' },
        { date: nextMonth + '-' + '07',    title: 'Small Cat Photo Session', location: 'Center for Cat Photography' }
      ];

      response.json( { result : events})
  }

}

module.exports = BookingController
