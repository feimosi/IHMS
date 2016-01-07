'use strict';

var path = require('path'),
    mongoose = require('mongoose'),
    Room = mongoose.model('Room'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

exports.create = function (req, res) {
    var room = new Room(req.body);

    room.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
        res.json(room);
    });
};

exports.read = function (req, res) {
    res.json(req.room);
};

exports.update = function (req, res) {
    var room = req.room;

    room.number = req.body.number;
    room.available = req.body.available;

    room.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
        res.json(room);
    });
};

exports.delete = function (req, res) {
    var room = req.room;

    room.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
        res.json(room);
    });
};

exports.list = function (req, res) {
    Room.find().sort('number').exec(function (err, rooms) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
        res.json(rooms);
    });
};

exports.roomByID = function (req, res, next, id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Room is invalid'
        });
    }

    Room.findById(id).exec(function (err, room) {
        if (err) {
            return next(err);
        } else if (!room) {
            return res.status(404).send({
                message: 'No room with that identifier has been found'
            });
        }
        req.room = room;
        next();
    });
};
