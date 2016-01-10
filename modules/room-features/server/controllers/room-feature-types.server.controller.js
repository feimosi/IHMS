'use strict';

var path = require('path'),
    mongoose = require('mongoose'),
    RoomFeatureType = mongoose.model('RoomFeatureType'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

exports.create = function (req, res) {
    var room = new RoomFeatureType(req.body);

    room.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
        res.json(room);
    });
};

exports.list = function (req, res) {
    RoomFeatureType.find().exec(function (err, rooms) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
        res.json(rooms);
    });
};
