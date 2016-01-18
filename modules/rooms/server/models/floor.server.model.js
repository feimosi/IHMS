'use strict';
/**
 * @module rooms/models/Floor
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * @property {int} number
 * */
var FloorSchema = new Schema({
    number: {
        type: Number,
        required: 'The floor needs to have a number'
    }
});

mongoose.model('Floor', FloorSchema);
