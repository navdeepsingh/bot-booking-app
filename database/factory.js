'use strict'

/*
|--------------------------------------------------------------------------
| Model and Database Factory
|--------------------------------------------------------------------------
|
| Factories let you define blueprints for your database models or tables.
| These blueprints can be used with seeds to create fake entries. Also
| factories are helpful when writing tests.
|
*/

const Factory = use('Factory')
const moment = use('moment')

/*
|--------------------------------------------------------------------------
| User Model Blueprint
|--------------------------------------------------------------------------
| Below is an example of blueprint for User Model. You can make use of
| this blueprint inside your seeds to generate dummy data.
|
*/
Factory.blueprint('App/Model/User', (fake) => {
  let password = 'test123'
  return {
    username: fake.username(),
    email: fake.email(),
    password: password
  }
})

Factory.blueprint('App/Model/Room', (fake) => {
  return {
    name: `${fake.capitalize(fake.word())} Room`
  }
})

Factory.blueprint('App/Model/Meeting', (fake) => {
  return {
    room_id : '1',
    date: moment(fake.date({string: true, american: false, year : 2016, month : 9})).format('YYYY-MM-DD'),
    title: fake.sentence({words: 3}),
    location: fake.address()
  }
})
