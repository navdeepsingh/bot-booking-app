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
    date: moment(Date.now()).format('YYYY-MM-DD'),
    start_time : '1000',
    end_time : '1200',
    title: fake.sentence({words: 3}),
    description: fake.sentence({words: 5})
  }
})
