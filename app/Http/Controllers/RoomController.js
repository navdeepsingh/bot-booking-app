'use strict'

const Room = use('App/Model/Room')

class RoomController {

  * index(request, response) {
    const rooms = yield Room.all()
    yield response.sendView('room/listing', {rooms : rooms.toJSON()})
  }

  * create(request, response) {
    const formVars = {
      formMethod : 'POST',
      formAction : '/rooms',
      formTitle : 'Add new room',
      btnTitle : 'Submit'
    }
    yield response.sendView('room/form', formVars)
  }

  * store(request, response) {
    const room = new Room()
    let data = request.except('_csrf')
    room.name = data.name

    yield room.save()
    response.json({result : true, redirect : '/rooms'})
  }

  * show(request, response) {
    //
  }

  * edit(request, response) {
    const id = request.param('id')
    const room = yield Room.findBy('id', id)
    const formVars = {
      room : room.toJSON(),
      formMethod : 'PUT',
      formAction : `/rooms/${id}`,
      formTitle : 'Edit',
      btnTitle : 'Update'
    }
    yield response.sendView('room/form', formVars)
  }

  * update(request, response) {
      const id = request.param('id')
      const room = yield Room.find(id)
      const data = request.except('_csrf')

      room.name = data.name
      yield room.save()

      response.json({result : true, redirect : '/rooms'})
  }

  * destroy(request, response) {
      const id = request.param('id')
      const room = yield Room.find(id)
      yield room.destroy()

      response.json({result : true, redirect : '/rooms'})
  }

}

module.exports = RoomController
