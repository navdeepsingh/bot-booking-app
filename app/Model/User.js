'use strict'

const Lucid = use('Lucid')

class User extends Lucid {

  static get rules () {
    return {
      username: 'required',
      email: 'required|email|unique:users',
      password: 'required|min:5|max:30',
    }
  }

  static boot () {
    super.boot()
    this.addHook('beforeCreate', 'User.encryptPassword')
  }

  apiTokens () {
    return this.hasMany('App/Model/Token')
  }

  meetings () {
    return this.hasMany('App/Model/Meeting')
  }

}

module.exports = User
