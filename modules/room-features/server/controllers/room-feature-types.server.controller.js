'use strict';

var path = require('path'),
    mongoose = require('mongoose'),
    Room = mongoose.model('Room'),
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

exports.read = function (req, res) {
    Room.aggregate().unwind('features')
        .match({ 'features.type.name': req.featureType.name })
        .group({ _id: '$features.value' })
        .exec(function (err, result) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            }
            var response = req.featureType.toObject();
            response.values = result;
            res.json(response);
        });
};

exports.featureTypeById = function (req, res, next, id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Feature Type ID is invalid'
        });
    }

    RoomFeatureType.findById(id).exec(function (err, featureType) {
        if (err) {
            return next(err);
        } else if (!featureType) {
            return res.status(404).send({
                message: 'No feature type with that identifier has been found'
            });
        }
        req.featureType = featureType;
        next();
    });
};
