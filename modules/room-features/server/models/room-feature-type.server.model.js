'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RoomFeatureTypeSchema = new Schema({
    name: {
        type: String,
        required: 'The room feature needs to have a name'
    },
    description: {
        type: String
    },
    filterable: {
        type: Boolean
    },
    important: {
        type: Boolean
    }
});

mongoose.model('RoomFeatureType', RoomFeatureTypeSchema);
