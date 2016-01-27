'use strict';
/**
 * @module rooms/models/Room
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    RoomFeatureSchema = require('../../../room-features/server/models/room-feature.server.model');

/**
 * @property {int} number
 * @property {boolean} available
 * @property {Floor} floor
 * @property {String} imageUrl
 * @property {Array} features
 */
var RoomSchema = new Schema({
    number: {
        type: Number,
        unique: true,
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
    },
    features: [RoomFeatureSchema]
});

mongoose.model('Room', RoomSchema);
