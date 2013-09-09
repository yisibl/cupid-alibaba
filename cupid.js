var buc = require('node-buc')
var join = require('path').join


module.exports = function(app) {
  // add node-buc authentication
  app.use(buc(/\//, {
    server: app.get('buc server'),
    account: 'cupid',
  }))

  app.use(function(req, res, next) {
    var user = req.session.user

    user.gravatar = require('crypto').createHash('md5').update(user.email).digest('hex')
    res.locals.user = user
    next()
  })

  app.set('views', join(__dirname, 'views'))
}