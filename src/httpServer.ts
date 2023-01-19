import { listen, mainRouter } from './utils/http'
import { apiRouter, indexRoute } from './routes'

mainRouter.get('/', indexRoute)
mainRouter.use('/api', apiRouter)

export default listen
