'use strict'

const User = use('App/Model/User')
const Hash = use('Hash')

class AuthController {

 * index (request, response) {
    yield response.sendView('login')
  }

 * login(request, response) {
      const email = request.input('email')
      const password = request.input('password')
      //const login = yield request.auth.attempt(email, password)

      try {
        yield request.auth.validate(email, password)
      } catch (e) {
        response.unauthorized({error: e.message})
      }

      const login = yield request.auth.attempt(email, password)

      if (login) {
        response.json({result : true, redirect : '/'})
        return
      }

      //yield response.sendView('login', { error: loginMessage.error })
      //return response.json({result : false, error : 'Invalid credentails'})
     // response.unauthorized('Invalid credentails')
  }

  * logout(request, response) {
      yield request.auth.logout()

      return response.redirect('/')
  }

}

module.exports = AuthController
