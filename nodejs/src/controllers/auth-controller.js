import authService from '../services/auth-service'

let register = async (req, res) => {
    try {
        if (!req.body || !req.body.username || !req.body.password) {
            res.status(200).json({
                err: 1,
                msg: 'Missing input !'
            })
        } else {
            let response = await authService.registerService(req.body)
            res.status(200).json(response)
        }
    } catch (error) {
        res.status(200).json({
            err: -1,
            msg: 'Fail at controller: ' + error
        })
    }
}
let login = async (req, res) => {
    try {
        if (!req.body || !req.body.username || !req.body.password) {
            res.status(200).json({
                err: 1,
                msg: 'Missing input !'
            })
        } else {
            let response = await authService.loginService(req.body)
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
    register,
    login
}