import db from '../models/index'
import bcrypt from 'bcryptjs'
import { decrypt } from './crypt'
import dotenv from 'dotenv'
dotenv.config()


const salt = bcrypt.genSaltSync(8)


let getAllUserService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await db.User.findAll({
                raw: true,
                attributes: {
                    exclude: ['password']
                }
            })
            response
                ? resolve({
                    err: 0,
                    msg: 'OK !',
                    user: response
                })
                : resolve({
                    err: 2,
                    msg: 'Fail got all users !',
                })

        } catch (error) {
            reject(error)
        }
    })
}
let updateAvatarService = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.User.update({
                avatar: body.avatar
            }, {
                where: { id: decrypt(process.env.SALT, body.userId) }
            })
            resolve({
                err: 0,
                msg: 'OK !',
            })
        } catch (error) {
            reject(error)
        }
    })
}
let createFriendService = (body) => {
    return new Promise(async (resolve, reject) => {
        let userId = decrypt(process.env.SALT, body.userId)
        try {
            let response = await db.Friend.findOrCreate({
                where: { from: +userId, to: body.friendId },
                raw: true,
                defaults: {
                    from: +userId,
                    to: body.friendId,
                    status: 'Pending'
                }
            })
            resolve({
                err: 0,
                msg: 'OK',
                response
            })
        } catch (error) {
            reject(error)
        }
    })
}
let getFriendService = (query) => {
    return new Promise(async (resolve, reject) => {
        try {
            let [res1, res2] = await Promise.all([db.Friend.findAll({
                where: [{ from: query.userId }],
                raw: true,
                include: {
                    model: db.User, attributes: ['username', 'avatar'], as: 'receiver'
                }
            }), db.Friend.findAll({
                where: { to: query.userId, status: 'Pending' },
                raw: true,
                include: {
                    model: db.User, attributes: ['username', 'avatar'], as: 'sender'
                }
            })])
            resolve({
                err: 0,
                msg: 'OK',
                response: [...res1, ...res2]
            })
        } catch (error) {
            reject(error)
        }
    })
}
let getInfoFriendsService = (query) => {
    return new Promise(async (resolve, reject) => {
        try {
            let [resUser, resFriend] = await Promise.all([
                db.User.findAll({
                    where: { id: query.friendsId.split(',') },
                    raw: true,
                    attributes: {
                        exclude: ['password']
                    }
                }),
                db.Friend.findAll({
                    where: { to: query.friendsId.split(',') },
                    raw: true,
                    attributes: {
                        exclude: ['id']
                    }
                })
            ])

            resolve({
                err: 0,
                msg: 'OK',
                data: [resUser, resFriend]
            })
        } catch (error) {
            reject(error)
        }
    })
}
let getUserInfo = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response
            if (userId) {
                response = await db.User.findOne({
                    where: { id: +userId },
                    raw: true,
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve({
                err: 0,
                msg: 'OK',
                response
            })

        } catch (error) {
            reject(error)
        }
    })
}
let updateInfoAddFriend = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Promise.all([db.Friend.update({
                status: 'OK'
            }, {
                where: { from: body.userId, to: body.friendId },
            }),
            db.Friend.findOrCreate({
                where: { from: body.friendId, to: body.userId, status: 'OK' },
                defaults: {
                    from: body.friendId,
                    to: body.userId,
                    status: 'OK'
                }
            }),
            db.Conversation.create({
                conversationId: Math.floor(Math.random() * Math.pow(10, 6)),
                userOne: body.userId,
                userTwo: body.friendId
            })
            ])
            resolve({
                err: 0,
                msg: 'OK',
            })
        } catch (error) {
            reject(error)
        }
    })
}
let updateChatService = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            let content = []
            let response = await db.Conversation.findOne({
                where: { conversationId: body.conversationId },
                raw: true
            })
            if (response.text) {
                content = JSON.parse(response.text) // parse string to array
            }
            await db.Conversation.update({
                text: JSON.stringify([...content, body.content]) // lưu mảng dưới dạng string 
            }, {
                where: { conversationId: body.conversationId },
            })
            resolve({
                err: 0,
                msg: 'OK',
            })
        } catch (error) {
            reject(error)
        }
    })
}
let getRoomIdService = (query) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response
            response = await db.Conversation.findOne({
                where: { userOne: query.userId, userTwo: query.friendId },
                raw: true
            })
            if (!response) {
                response = await db.Conversation.findOne({
                    where: { userOne: query.friendId, userTwo: query.userId },
                    raw: true
                })
            }
            response ? resolve({
                err: 0,
                msg: 'OK',
                response
            }) : resolve({
                err: 1,
                msg: 'Not found conversationId!',
            })
        } catch (error) {
            reject(error)
        }
    })
}
let getPastChatService = (query) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await db.Conversation.findOne({
                where: { conversationId: query.conversationId },
                raw: true
            })
            response ? resolve({
                err: 0,
                msg: 'OK',
                response
            }) : resolve({
                err: 1,
                msg: 'Not found conversationId!',
            })
        } catch (error) {
            reject(error)
        }
    })
}
let createNoticeOfflineService = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await db.NoticeOffline.findOrCreate({
                where: { from: body.sender, to: body.receiver, timestamp: JSON.stringify(body.createAt) },
                raw: true,
                defaults: {
                    from: body.sender,
                    to: body.receiver,
                    content: body.text,
                    nameSender: body.nameSender,
                    timestamp: JSON.stringify(body.createAt)
                }
            })
            resolve({
                err: 0,
                msg: 'OK',
                response
            })
        } catch (error) {
            reject(error)
        }
    })
}
let getNoticeOfflineService = (query) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await db.NoticeOffline.findAll({
                where: { to: +query.receiver },
                raw: true,
            })
            resolve({
                err: 0,
                msg: 'OK',
                response
            })
        } catch (error) {
            reject(error)
        }
    })
}
let deleteNoticeOfflineService = (query) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.NoticeOffline.destroy({
                where: { to: +query.userId },
                raw: true,
            })
            resolve({
                err: 0,
                msg: 'OK',
            })
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    getAllUserService,
    updateAvatarService,
    createFriendService,
    getFriendService,
    getInfoFriendsService,
    getUserInfo,
    updateInfoAddFriend,
    updateChatService,
    getRoomIdService,
    getPastChatService,
    createNoticeOfflineService,
    getNoticeOfflineService,
    deleteNoticeOfflineService
}