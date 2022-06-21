import db from '../models/index'
import bcrypt from 'bcryptjs'
import { crypt } from './crypt'
import dotenv from 'dotenv'
dotenv.config()

const salt = bcrypt.genSaltSync(8)

let hassPassword = password => bcrypt.hashSync(password, salt)

let registerService = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await db.User.findOrCreate({
                where: { username: body.username },
                raw: true,
                defaults: {
                    username: body.username,
                    password: hassPassword(body.password)
                }
            })
            response[1]
                ? resolve({
                    err: 0,
                    msg: 'Account is created !',
                    user: {
                        username: response[0].username,
                        userId: crypt(process.env.SALT, response[0].id + '') //
                    }
                })
                : resolve({
                    err: 2,
                    msg: 'Account has existed !',
                    user: {
                        username: response[0].username,
                        userId: crypt(process.env.SALT, response[0].id + '')
                    }
                })

        } catch (error) {
            reject(error)
        }
    })
}
let loginService = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await db.User.findOne({
                where: { username: body.username },
                raw: true,
            })
            if (response) {
                let checkPassword = bcrypt.compareSync(body.password, response.password)
                checkPassword
                    ? resolve({
                        err: 0,
                        msg: 'Login succeed !',
                        user: {
                            username: response.username,
                            userId: crypt(process.env.SALT, (response.id).toString()),
                            avatar: response.avatar
                        }
                    })
                    : resolve({
                        err: 2,
                        msg: 'Password was wrong !',
                    })
            } else {
                resolve({
                    err: 3,
                    msg: 'Username hasnt existed !',
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}


module.exports = {
    registerService,
    loginService
}