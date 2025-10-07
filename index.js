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
  const id = request.params.id
  const film = films.find(film => film.id === id)
  if (film) {
    response.json(film)
  } else {
    response.status(404).end()
  }
})

// const generateId = () => {
//   const maxId =
//     films.length > 0 ? Math.max(...films.map((n) => Number(n.id))) : 0
//   return String(maxId + 1)
// }

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
  Film.findById(request.params.id).then(film => {
    response.json(film)
  })
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});