'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RoomFeatureSchema = new Schema({
    type: {
        type: Schema.ObjectId,
        ref: 'RoomFeatureType',
        required: true
    },
    value: {
        type: String
    },
    note: {
        type: String
    }
});

mongoose.model('RoomFeature', RoomFeatureSchema);
