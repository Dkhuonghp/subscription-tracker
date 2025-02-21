import express from 'express'
import http from 'http'
import { Server } from 'socket.io';
import cors from 'cors'

import cookieParser from 'cookie-parser';
import { PORT } from './config/env.js';
import authRouter from './routers/auth.routes.js';
import userRouter from './routers/user.routes.js';
import subscriptionRouter from './routers/subscription.routes.js';
import connectToDatabase from './database/mongodb.js';
// import errorMiddleware from './middlewares/error.middleware.js';


const app = express()
const server = http.createServer(app)
const io = new Server(server, {cors: {origin: '*'}})

app.use(cors())

app.use((req, res, next) => {
    req.io = io
    next()
})

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(cookieParser())

// Routes API
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/subscriptions', subscriptionRouter)


io.on('connection', (socket) => {
    console.log('Client disconnected', socket.id);
    socket.on('disconnect', () => {
        console.log('client disconnected');
    })
})
app.get('/', (req, res) => {
    res.send({body: 'hello world'})
})

app.listen(PORT, async () => {
    console.log(`Subscription Tracker API is running on http://localhost:${PORT}`);
    await connectToDatabase()
})

export default app