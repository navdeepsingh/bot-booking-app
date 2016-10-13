'use strict'

const Lucid = use('Lucid')

class Room extends Lucid {

  meetings () {
      return this.hasMany('App/Model/Meeting')
  }
}

module.exports = Room
