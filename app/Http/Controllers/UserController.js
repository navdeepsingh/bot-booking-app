'use strict'

const User = use('App/Model/User')

class UserController {

  * index(request, response) {
    const users = yield User.all()
    yield response.sendView('user/listing', { users : users.toJSON() })
  }

  * create(request, response) {
    //
  }

  * store(request, response) {
    //
  }

  * show(request, response) {
    const id = request.param('id')
    const user = yield User.findBy('id', id)
    response.json(user.toJSON())
  }

  * edit(request, response) {
    const id = request.param('id')
    const user = yield User.findBy('id', id)
    const formVars = {
      user : user.toJSON(),
      formMethod : 'PUT',
      formAction : `/users/${id}`,
      formTitle : 'Edit',
      btnTitle : 'Update'
    }
    yield response.sendView('register', formVars)
  }

  * update(request, response) {
      const id = request.param('id')
      const user = yield User.find(id)
      const data = request.except('_csrf')

      user.username = data.name
      user.email = data.email
      yield user.save()

      response.json({result : true, redirect : '/users'})
  }

  * destroy(request, response) {
      const id = request.param('id')
      const user = yield User.find(id)
      yield user.delete()

      response.json({result : true, redirect : '/users'})
  }

}

module.exports = UserController
