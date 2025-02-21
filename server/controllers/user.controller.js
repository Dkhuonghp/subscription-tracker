import User from "../models/user.model.js"

export const getUsers = async(req, res, next) => {
    try {
        const user = await User.find().select('-password -email')
        res.status(200).json({
            success: true,
            data: user
        })
    } catch (error) {
        next(error)
    }
}

export const getUser = async(req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select('-password -email')
        if(!user) {
            const error = new Error('User not found')
            error.statusCode = 404
            throw error
        }
        res.status(200).json({
            success: true,
            data: user
        })
    } catch (error) {
        next(error)
    }
}

export const createUser = (req, res) => {
    res.send({title: 'CREATE new user'})
}

export const editUser = (req, res) => {
    res.send({title: 'EDIT user'})
}

export const deleteUser = (req, res) => {
    res.send({title: 'DELETE user'})
}
