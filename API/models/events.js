const moongoose = require('mongoose');
const Schema = moongoose.Schema;

const eventSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    date: {
        type: Date,
        require: true
    },
});

module.exports = moongoose.model('event', eventSchema);