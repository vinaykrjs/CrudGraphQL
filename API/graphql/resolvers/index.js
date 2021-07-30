
const Event = require('../../models/event');
const User = require('../../models/user');
const bcrypt = require("bcryptjs");

const events = async eventIds => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    events.map(event => {
      return {
        ...event._doc,
        _id: event.id,
        date: new Date(event._doc.date).toISOString(),
      }
    });
    return events;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
      return events;
    } catch (err) {
      throw err;
    }
  },
  createUser: args => {
    return User.findOne({ email: args.userInput.email })
      .then(user => {
        if (user) {
          throw new Error('User exists already.');
        }
        return bcrypt.hash(args.userInput.password, 12);
      })
      .then(hashedPassword => {
        const user = new User({
          name: args.userInput.name,
          email: args.userInput.email,
          password: hashedPassword
        });
        return user.save();
      })
      .then(result => {
        return { ...result._doc, password: null, _id: result.id };
      })
      .catch(err => {
        throw err;
      });
  },
  createEvent: args => {
    console.log(args)
    const event = new Event();
    event.name = args.eventInput.name;
    event.startDate = args.eventInput.startDate;
    event.endDate = args.eventInput.endDate;
    event.slots = args.eventInput.slots;
    event.place = args.eventInput.place;
    event.country = args.eventInput.country;
    event.state = args.eventInput.state;
    event.city = args.eventInput.city;
    return event.save().then((data) => {
      return data
    }).catch((error) => {
      return error
    })
  }
}