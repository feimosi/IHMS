'use strict';

var path = require('path'),
    mongoose = require('mongoose'),
    Floor = mongoose.model('Floor'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

exports.create = function (req, res) {
    var floor = new Floor(req.body);

    floor.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
        res.json(floor);
    });
};

exports.read = function (req, res) {
    res.json(req.floor);
};

exports.update = function (req, res) {
    var floor = req.floor;
    floor.number = req.body.number;

    floor.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
        res.json(floor);
    });
};

exports.delete = function (req, res) {
    var floor = req.floor;

    floor.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
        res.json(floor);
    });
};

exports.list = function (req, res) {
    Floor.find().sort('number').exec(function (err, floors) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
        res.json(floors);
    });
};

exports.floorByID = function (req, res, next, id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Floor is invalid'
        });
    }

    Floor.findById(id).exec(function (err, floor) {
        if (err) {
            return next(err);
        } else if (!floor) {
            return res.status(404).send({
                message: 'No floor with that identifier has been found'
            });
        }
        req.floor = floor;
        next();
    });
};
