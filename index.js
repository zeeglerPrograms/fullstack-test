const app = require('./app') // the actual express App
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT, () => {
  logger.info(`Server listening on ${config.PORT}`)
})