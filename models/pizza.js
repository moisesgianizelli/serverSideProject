const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var pizzaSchemaful = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    customer: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
var bookings = mongoose.model('Booking', pizzaSchemaful);

module.exports = bookings;
