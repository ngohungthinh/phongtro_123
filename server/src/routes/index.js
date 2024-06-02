import authRouter from './auth'
import insertRouter from './insert'
import categoryRouter from './category'
import postRouter from './post'
import priceRouter from './price'
import areaRouter from './area'
import provinceRouter from './province'
import userRouter from './user'

const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minutes
    max: 2,
    message: 'Too many connection',
});

const initRoutes = (app) => {
    app.use('/api/v1/auth', apiLimiter, authRouter)
    app.use('/api/v1/insert', apiLimiter, insertRouter)
    app.use('/api/v1/category', apiLimiter, categoryRouter)
    app.use('/api/v1/post', apiLimiter, postRouter)
    app.use('/api/v1/price', apiLimiter, priceRouter)
    app.use('/api/v1/area', apiLimiter, areaRouter)
    app.use('/api/v1/province', apiLimiter, provinceRouter)
    app.use('/api/v1/user', apiLimiter, userRouter)

    return app.use('/', (req, res) => {
        res.send('server on...')

    })
}

export default initRoutes