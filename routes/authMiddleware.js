const basicAuth = require('basic-auth');

const users = {
  admin: '1234',
};

const authMiddleware = () => {
  return (req, res, next) => {
    const user = basicAuth(req);
    if (!user || !users[user.name] || users[user.name] !== user.pass) {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      return res.status(401).send('Unauthorized Access!');
    }
    next();
  };
};

module.exports = authMiddleware;
