import userService from '../services/user-services'

let getAllUser = async (req, res) => {
    try {
        let response = await userService.getAllUserService()
        res.status(200).json(response)
    } catch (error) {
        res.status(200).json({
            err: -1,
            msg: 'Fail at controller: ' + error
        })
    }
}
let updateAvatar = async (req, res) => {
    try {
        if (!req.body || !req.body.avatar || !req.body.userId) {
            return res.status(200).json({
                err: 3,
                msg: 'Misding input !'
            })
        } else {
            let response = await userService.updateAvatarService(req.body)
            res.status(200).json(response)
        }
    } catch (error) {
        res.status(200).json({
            err: -1,
            msg: 'Fail at controller: ' + error
        })
    }
}

let createFriend = async (req, res) => {
    try {
        if (!req.body || !req.body.userId || !req.body.friendId) {
            return res.status(200).json({
                err: 3,
                msg: 'Misding input !'
            })
        } else {
            let response = await userService.createFriendService(req.body)
            res.status(200).json(response)
        }
    } catch (error) {
        res.status(200).json({
            err: -1,
            msg: 'Fail at controller: ' + error
        })
    }
}
let getFriend = async (req, res) => {
    try {
        if (!req.query?.userId) {
            return res.status(200).json({
                err: 3,
                msg: 'Misding input !'
            })
        } else {
            let response = await userService.getFriendService(req.query)
            res.status(200).json(response)
        }
    } catch (error) {
        res.status(200).json({
            err: -1,
            msg: 'Fail at controller: ' + error
        })
    }
}
let getInfoFriends = async (req, res) => {
    try {
        if (!req.query?.friendsId) {
            return res.status(200).json({
                err: 3,
                msg: 'Misding input !'
            })
        } else {
            let response = await userService.getInfoFriendsService(req.query)
            res.status(200).json(response)
        }
    } catch (error) {
        res.status(200).json({
            err: -1,
            msg: 'Fail at controller: ' + error
        })
    }
}
let updateStatusFriend = async (req, res) => {
    try {
        if (!req.body?.friendId || !req.body.userId) {
            return res.status(200).json({
                err: 3,
                msg: 'Misding input !'
            })
        } else {
            let response = await userService.updateInfoAddFriend(req.body)
            res.status(200).json(response)
        }
    } catch (error) {
        res.status(200).json({
            err: -1,
            msg: 'Fail at controller: ' + error
        })
    }
}
let updateChat = async (req, res) => {
    try {
        if (!req.body?.conversationId) {
            return res.status(200).json({
                err: 3,
                msg: 'Misding input !'
            })
        } else {
            let response = await userService.updateChatService(req.body)
            res.status(200).json(response)
        }
    } catch (error) {
        res.status(200).json({
            err: -1,
            msg: 'Fail at controller: ' + error
        })
    }
}
let getRoomId = async (req, res) => {
    try {
        if (!req.query?.userId || !req.query?.friendId) {
            return res.status(200).json({
                err: 3,
                msg: 'Misding input !'
            })
        } else {
            let response = await userService.getRoomIdService(req.query)
            res.status(200).json(response)
        }
    } catch (error) {
        res.status(200).json({
            err: -1,
            msg: 'Fail at controller: ' + error
        })
    }
}
let getPastChat = async (req, res) => {
    try {
        if (!req.query?.conversationId) {
            return res.status(200).json({
                err: 3,
                msg: 'Misding input !'
            })
        } else {
            let response = await userService.getPastChatService(req.query)
            res.status(200).json(response)
        }
    } catch (error) {
        res.status(200).json({
            err: -1,
            msg: 'Fail at controller: ' + error
        })
    }
}
let createNoticeOffline = async (req, res) => {
    try {
        if (!req.body?.sender || !req.body?.receiver) {
            return res.status(200).json({
                err: 3,
                msg: 'Misding input !'
            })
        } else {
            let response = await userService.createNoticeOfflineService(req.body)
            res.status(200).json(response)
        }
    } catch (error) {
        res.status(200).json({
            err: -1,
            msg: 'Fail at controller: ' + error
        })
    }
}
let getNoticeOffline = async (req, res) => {
    try {
        if (!req.query?.receiver) {
            return res.status(200).json({
                err: 3,
                msg: 'Misding input !'
            })
        } else {
            let response = await userService.getNoticeOfflineService(req.query)
            res.status(200).json(response)
        }
    } catch (error) {
        res.status(200).json({
            err: -1,
            msg: 'Fail at controller: ' + error
        })
    }
}
let deleteNoticeOffline = async (req, res) => {
    try {
        if (!req.query?.userId) {
            return res.status(200).json({
                err: 3,
                msg: 'Misding input !'
            })
        } else {
            let response = await userService.deleteNoticeOfflineService(req.query)
            res.status(200).json(response)
        }
    } catch (error) {
        res.status(200).json({
            err: -1,
            msg: 'Fail at controller: ' + error
        })
    }
}
module.exports = {
    getAllUser,
    updateAvatar,
    createFriend,
    getFriend,
    getInfoFriends,
    updateStatusFriend,
    updateChat,
    getRoomId,
    getPastChat,
    createNoticeOffline,
    getNoticeOffline,
    deleteNoticeOffline
}