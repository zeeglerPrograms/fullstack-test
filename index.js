const express = require("express");
const app = express();

const PORT = process.env.PORT || 3001;


let films = [
  {
    "id": "1",
    "title": "Pulp Fiction"
  },
  {
    "id": "2",
    "title": "There Will Be Blood"
  },
  {
    "id": "8682",
    "title": "Inglorius Basterds"
  }
]

app.use(express.json())
app.use(express.static('dist'))

app.get('/', (request, response) => {
  response.send('<h1>Hello World</h1>')
})

app.get('/api/films', (request, response) => {
  response.json(films)
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

const generateId = () => {
  const maxId =
    films.length > 0 ? Math.max(...films.map((n) => Number(n.id))) : 0
  return String(maxId + 1)
}

app.post('/api/films', (request, response) => {
  const body = request.body
  if (!body.title) {
    return response.status(400).json({
      error: 'title missing',
    })
  }

  const film = {
    title: body.title,
    id: generateId()
  }

  films = films.concat(film)

  response.json(film)

})

app.delete('/api/films/:id', (request, response) => {
  const id = request.params.id
  films = films.filter(film => film.id === id)

  response.status(204).end()
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});