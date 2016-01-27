'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ReservationSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    room: {
        type: Schema.ObjectId,
        ref: 'Room',
        required: true
    },
    submitDate: {
        type: Date,
        default: Date.now()
    },
    startDate: {
        type: Date,
        required: 'The reservation needs a start date'
    },
    endDate: {
        type: Date,
        required: 'The reservation needs an end date'
    },
    canceled: {
        type: Boolean,
        default: false
    },
    note: {
        type: String
    },
    coupon: {
        type: String
    }
});

mongoose.model('Reservation', ReservationSchema);
