'use strict'

/*
|--------------------------------------------------------------------------
| Database Seeder
|--------------------------------------------------------------------------
| Database Seeder can be used to seed dummy data to your application
| database. Here you can make use of Factories to create records.
|
| make use of Ace to generate a new seed
|   ./ace make:seed [name]
|
*/

const Factory = use('Factory')


class DatabaseSeeder {

  * run () {
      const users = yield Factory.model('App/Model/User').create(2)

      const User = use('App/Model/User')
      const user = yield User.find(1)

      const rooms = yield Factory.model('App/Model/Room').create(2)

      const meeting = Factory.model('App/Model/Meeting').make()
      yield user.meetings().save(meeting)
  }

}

module.exports = DatabaseSeeder
