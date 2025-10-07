const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give a password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://zeeglermusic:${password}@cluster0.vp4c8zn.mongodb.net/fullStackTest?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const filmSchema = new mongoose.Schema({
  title: String,
})

module.exports = mongoose.model('Film', filmSchema)