const jwt = require('jsonwebtoken')

const jwtMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.token
        const verifyUser = await jwt.verify(token, process.env.SECRET_KEY)
        if (!verifyUser) {
            returncres.json({ success: false, message: "user not authorised" })
        }
        req.payload = verifyUser.userId
        next()
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

module.exports = jwtMiddleware