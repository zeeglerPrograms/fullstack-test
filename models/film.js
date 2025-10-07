const mongoose = require('mongoose')

const filmSchema = new mongoose.Schema({
  title: String,
})

filmSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Film', filmSchema)