const authResolver = require('./auth');
const eventsResolver = require('./events');
const bookingResolver = require('./booking');

const rootResolver = {
  ...authResolver
};

module.exports = rootResolver;