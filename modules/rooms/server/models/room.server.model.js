'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RoomSchema = new Schema({
    number: {
        type: Number,
        required: 'The room needs to have a number'
    },
    available: {
        type: Boolean,
        default: true,
        required: true
    },
    floor: {
        type: Schema.ObjectId,
        ref: 'Floor',
        required: true
    },
    imageURL: {
        type: String
    }
});

mongoose.model('Room', RoomSchema);
