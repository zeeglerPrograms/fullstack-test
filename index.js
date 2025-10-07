require('dotenv').config()
const express = require("express");
const Film = require('./models/film')

const app = express();

app.use(express.json())
app.use(express.static('dist'))

app.get('/api/films', (request, response) => {
  Film.find({}).then(films => {
    response.json(films)
  })
})

app.get('/api/films/:id', (request, response) => {
  Film.findById(request.params.id)
    .then(film => {
      if (film) {
        response.json(film)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.post('/api/films', (request, response) => {
  const body = request.body
  if (!body.title) {
    return response.status(400).json({
      error: 'title missing',
    })
  }

  const film = new Film({
    title: body.title
  })

  film.save().then(savedFilm => {
    response.json(savedFilm)
  })
})

app.delete('/api/films/:id', (request, response) => {
  Film.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/films/:id', (request, response, next) => {
  const { title } = request.body

  Film.findById(request.params.id)
    .then(film => {
      if(!film) {
        return response.status(404).end()
      }

      film.title = title

      return film.save().then((updatedFilm) => {
        response.json(updatedFilm)
      })
    })
    .catch(error => next(error))
})

const undknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});