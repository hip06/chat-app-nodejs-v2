import express from "express";
import authController from '../controllers/auth-controller'
import userController from '../controllers/user-controllers'

const router = express.Router()

const initWebRoutes = (app) => {

    router.get('/', (req, res) => {
        return res.send('OK')
    })
    //auth
    router.post('/api/register', authController.register)
    router.post('/api/login', authController.login)

    //user
    router.get('/api/get-all-user', userController.getAllUser)
    router.put('/api/set-avatar', userController.updateAvatar)
    router.post('/api/set-friend', userController.createFriend)
    router.get('/api/get-friend', userController.getFriend)
    router.get('/api/get-info-friends', userController.getInfoFriends)
    router.put('/api/update-status-friends', userController.updateStatusFriend)

    // conversation
    router.get('/api/get-conversation-id', userController.getRoomId)
    router.put('/api/update-chat', userController.updateChat)
    router.get('/api/past-chat', userController.getPastChat)




    return app.use('/', router)
}
export default initWebRoutes