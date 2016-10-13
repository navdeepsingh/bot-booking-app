'use strict'

const Lucid = use('Lucid')

class Meeting extends Lucid {

  user () {
    return this.belongsTo('App/Model/User')
  }

  room () {
    return this.belongsTo('App/Model/Room')
  }

}

module.exports = Meeting
