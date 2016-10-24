'use strict'

const User = use('App/Model/User')
const Validator = use('Validator')

class RegisterController {

  * index(request, response) {
      const user = new User()
      const formVars = {
        user : user.toJSON(),
        formMethod : 'POST',
        formAction : '/register',
        formTitle : 'Add new user',
        btnTitle : 'Submit',
        newUser : true
      }
      yield response.sendView('register', formVars )
    }

  * doRegister(request, response) {
      const user = new User()
      const userData = request.except('_csrf')
      const validation = yield Validator.validate(userData, User.rules)

      if (validation.fails()) {
        response.json(validation.messages())
        return
      }

      // Validation passed, create the user.
      yield User.create(userData)

      response.json({result : true, redirect : '/users'})
  }

}

module.exports = RegisterController
