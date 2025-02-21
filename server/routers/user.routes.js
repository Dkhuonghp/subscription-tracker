import { Router } from "express";

const userRouter = Router()

import authorize from "../middlewares/auth.middleware.js";

import { getUsers, getUser, createUser, editUser, deleteUser  } from "../controllers/user.controller.js";
import arcjetMiddleware from "../middlewares/arcjet.middleware.js";

userRouter.get('/', arcjetMiddleware, getUsers)
userRouter.get('/:id', authorize, getUser)
userRouter.post('/', createUser)
userRouter.put('/:id', editUser)
userRouter.delete('/:id', deleteUser)

export default userRouter