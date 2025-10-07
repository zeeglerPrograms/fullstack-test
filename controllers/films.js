const filmsRouter = require('express').Router()
const Film = require('../models/film')

filmsRouter.get('/', (request, response) => {
  Film.find({}).then(films => {
    response.json(films)
  })
})

filmsRouter.get('/:id', (request, response, next) => {
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

filmsRouter.post('/', (request, response, next) => {
  const body = request.body
  if (!body.title) {
    return response.status(400).json({
      error: 'title missing',
    })
  }

  const film = new Film({
    title: body.title
  })

  film.save()
    .then(savedFilm => {
      response.json(savedFilm)
    })
    .catch(error => next(error))
})

filmsRouter.delete('/:id', (request, response, next) => {
  Film.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

filmsRouter.put('/:id', (request, response, next) => {
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

module.exports = filmsRouter