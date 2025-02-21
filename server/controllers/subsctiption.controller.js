import Subscription from '../models/subscription.model.js'

export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id
        })

        res.status(200).json({
            success: true,
            message: 'Subscription created successfully',
            data: {
                subscription
            }
        })
    } catch (error) {
        next(error);
    }
}

export const getUserSubscription = async (req, res, next) => {

    try {        
        if (!req.user) {
            return res.status(401).json({
                success: true,
                message: 'User not authenticated'
            })
        }
        if (req.user.id !== req.params.id) {
            const error = new Error('You are not the owner of this subscription')
            error.status = 401
            throw error
        }
        
        const subscription = await Subscription.find({user: req.params.id})

        res.status(200).json({
            success: true,
            message: 'Subscription found successfully',
            data: {
                subscription
            }
        })

    } catch (error) {
        next(error);
    }
}

export const getSubscriptionDetails = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Subscription details',
            data: subscription
        })
    } catch (error) { 
        next(error);
    }
}


export const updateSubscription = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({success: false, message: 'User not authenticated'})
        }
        const { id } = req.params

        const subscription = await Subscription.findById(id)

        if (!subscription) {
            return res.status(404).json({ success: false, message: "Subscription not found" });
        }        

        if (subscription.user.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: "You are not authorized to update this subscription" });
        }

        const updateSubscription = await Subscription.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true, runValidators: true }
        )

        res.status(200).json({
            success: true,
            message: 'Subscription updated successfully',
            data: { updateSubscription }
        })
    } catch (error) {
        next(error);
    }
}

export const deleteSubscription = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({success: false, message: 'User not authenticated'})
        }
        const { id } = req.params

        const subscription = await Subscription.findById(id)

        if (!subscription) {
            return res.status(404).json({ success: false, message: "Subscription not found" });
        }        

        if (subscription.user.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: "You are not authorized to update this subscription" });
        }

        const deleteSubscription = await Subscription.findByIdAndDelete(
            id,
            { $set: req.body },
            { new: true, runValidators: true }
        )

        res.status(200).json({
            success: true,
            message: 'Subscription delete successfully',
            data: { deleteSubscription }
        })

    } catch (error) {
        next(error);
    }
}
