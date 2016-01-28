'use strict';

var path = require('path'),
    mongoose = require('mongoose'),
    Reservation = mongoose.model('Reservation'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

exports.create = function (req, res) {
    var reservation = new Reservation(req.body);

    reservation.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
        res.json(reservation);
    });
};

exports.read = function (req, res) {
    res.json(req.reservation);
};

exports.update = function (req, res) {
    var reservation = Object.assign(req.reservation, req.body.number);

    reservation.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
        res.json(reservation);
    });
};

exports.delete = function (req, res) {
    var reservation = req.reservation;

    reservation.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
        res.json(reservation);
    });
};

exports.list = function (req, res) {
    Reservation.find().exec(function (err, reservations) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
        res.json(reservations);
    });
};

exports.readByUserId = function (req, res) {
    Reservation.find({
        user: req.params.userId
    }).exec(function (err, reservations) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
        res.json(reservations);
    });
};

exports.readDateRange = function (req, res) {
    Reservation.find({
        $or: [{
            $and: [{
                startDate: {
                    $gte: new Date(req.params.startDate)
                }
            }, {
                startDate: {
                    $lte: new Date(req.params.endDate)
                }
            }]
        }, {
            $and: [{
                endDate: {
                    $lte: new Date(req.params.endDate)
                }
            }, {
                endDate: {
                    $gte: new Date(req.params.startDate)
                }
            }]
        }]
    }).exec(function (err, reservations) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
        res.json(reservations);
    });
};

exports.reservationById = function (req, res, next, id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Reservation is invalid'
        });
    }

    Reservation.findById(id).exec(function (err, reservation) {
        if (err) {
            return next(err);
        } else if (!reservation) {
            return res.status(404).send({
                message: 'No reservation with that identifier has been found'
            });
        }
        req.reservation = reservation;
        next();
    });
};
