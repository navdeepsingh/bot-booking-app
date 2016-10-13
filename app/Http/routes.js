'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

Route.get('/login', 'AuthController.index')
Route.post('/login', 'AuthController.login')
Route.get('/logout', 'AuthController.logout')

Route.get('/register', 'RegisterController.index')
Route.post('register', 'RegisterController.doRegister')

Route.group('auth-routes', () => {
  Route.get('/', 'BookingController.index')
  Route.get('/room/:id', 'BookingController.index')
  Route.resource('users', 'UserController')
  Route.resource('rooms', 'RoomController')
  Route.get('/get_meetings/:id?', 'BookingController.getMeetings')
}).middleware('auth')
