const jwt = require('jsonwebtoken')
module.exports = async (req, res, next) => {
  try {
    // get the token from the autorization header
    const token = req.headers.authorization.split(' ')[1]
    // check if the token matches the supposed origin
    const decodedToken = await jwt.verify(token, 'RANDOM-TOKEN')
    // returns the payload decoded if the signature is valid and optional expiration
    const user = await decodedToken
    // pass the user data returned by jwt down to the endpoint here
    req.user = user
    // pass down functionality to the endpoint
    next()
  } catch (error) {
    res.status(401).json({
      error: new Error('Invalid request!')
    })
  }
}
