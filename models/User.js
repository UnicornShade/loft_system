const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const CRUD = {
  C: { type: Boolean },
  R: { type: Boolean },
  U: { type: Boolean },
  D: { type: Boolean },
}

const user = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  access_token: { type: String },
  img: { type: String },
  firstName: { type: String },
  middleName: { type: String },
  surName: { type: String },
  permission: {
    chat: CRUD,
    news: CRUD,
    setting: CRUD
  }
})

user.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

user.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

user.methods.getFields = function () {
  return {
    username: this.username,
    surName: this.surName || '',
    firstName: this.firstName || '',
    middleName: this.middleName || '',
    image: this.image || '',
    permission: this.permission || {},
    access_token: this.access_token || ''
  }
}

module.exports = mongoose.model('User', user)