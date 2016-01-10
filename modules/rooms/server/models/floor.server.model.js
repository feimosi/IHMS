'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FloorSchema = new Schema({
    number: {
        type: Number,
        required: 'The floor needs to have a number'
    }
});

mongoose.model('Floor', FloorSchema);
