
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
  currentEvent: async params => {
    //     console.log(params._id,'vinay');

    // // db.test.find({_id:myId})
    // console.log(myId,'vinay objec');

    try {
      let mongoose = require('mongoose');
      // var myId = new Mongo.ObjectID(_id);
      let myId = mongoose.Types.ObjectId(params._id.trim());
      console.log(params._id, 'i m in try');
      const currentEvent = await Event.find({ _id: myId });
      return currentEvent;
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
  },
  updateEvent: args => {
    if (!args._id) return;
    return Event.findOneAndUpdate(
      {
        _id: args._id
      },
      {
        $set: {
          name: args.name,
          startDate: args.startDate,
          endDate: args.endDate,
          slots: args.slots,
          place: args.place,
          country: args.country,
          state: args.state,
          city: args.city

        }
      }, { new: true }, (err, Event) => {
        if (err) {
          console.log('Something went wrong when updating the events');
        } else {
        }
      }
    );
  },
  deleteEvent: args => {
    return Event.findOneAndDelete({ _id: args._id })
  }
  /*  updateEvent: args => {
     return Event.findOneAndUpdate({_id: args._id},{name: args.name},{ new:true } )
      return Event.findOneAndUpdate({_id: args._id},{name: args.name},{StartDate: args.startDate},{EndDate: args.endDate},{Slot: args.slots},{Place: args.place},{Country: args.country},{State: args.state},{Place: args.city},{ new:true } )
   }, */

}