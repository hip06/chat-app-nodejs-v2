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
        let userId = decrypt(process.env.SALT, query.userId)
        try {
            let response = await db.Friend.findAll({
                where: { from: +userId },
                raw: true,
                include: {
                    model: db.User, attributes: ['username', 'avatar'], as: 'listFriend'
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
        let friendId = decrypt(process.env.SALT, body.friendId)
        try {
            await db.Friend.update({
                status: 'OK'
            }, {
                where: { from: body.userId, to: +friendId },
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
    updateInfoAddFriend
}