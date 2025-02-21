import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { createSubscription, deleteSubscription, getSubscriptionDetails, getUserSubscription, updateSubscription } from "../controllers/subsctiption.controller.js";

const subscriptionRouter = Router()

subscriptionRouter.get('/', getUserSubscription)
subscriptionRouter.get('/:id', authorize, getSubscriptionDetails)
subscriptionRouter.post('/', authorize, createSubscription)
subscriptionRouter.put('/:id', authorize, updateSubscription)
subscriptionRouter.delete('/:id', authorize, deleteSubscription)
subscriptionRouter.get('/user/:id', authorize, getUserSubscription)
subscriptionRouter.put('/:id/cancel', (req, res) => res.send({title: 'Cancel subscriptions'}))
subscriptionRouter.get('/upcoming-renewals', (req, res) => res.send({title: 'Get upcoming subscriptions'}))


export default subscriptionRouter; 