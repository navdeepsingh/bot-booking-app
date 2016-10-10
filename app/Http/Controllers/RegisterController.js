'use strict'

const User = use('App/Model/User')
const Hash = use('Hash')

class RegisterController {

  * index(request, response) {
      const user = new User()
      const formVars = {
        user : user.toJSON(),
        formMethod : 'POST',
        formAction : '/register',
        formTitle : 'Add new user',
        btnTitle : 'Submit'
      }
      yield response.sendView('register', formVars )
    }

  * doRegister(request, response) {
      const user = new User()
      user.username = request.input('name')
      user.email = request.input('email')
      user.password = yield Hash.make(request.input('password'))

      yield user.save()

      var registerMessage = {
          success: 'Registration Successful! Now go ahead and login'
      }

      //yield response.sendView('register', { registerMessage : registerMessage })
      response.json({result : true, redirect : '/users'})
  }

}

module.exports = RegisterController
