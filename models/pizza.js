const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;


var pizzaSchemaful = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    customer: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
var pizzas = mongoose.model('Pizza', pizzaSchemaful);

module.exports = pizzas;