'use strict';

require('../../server/models/room.server.model');
var should = require('should'),
    mongoose = require('mongoose');

describe('Room Model', function () {
    var Room;
    var room;

    before(function () {
        mongoose.connect('mongodb://localhost/local');
        Room = mongoose.model('Room');
    });

    beforeEach(function () {
        room = new Room({
            number: 1,
            floor: { _id: new mongoose.Types.ObjectId }
        });
    });

    describe('Save', function () {
        it('should save without problems', function (done) {
            return room.save(function (err) {
                should.not.exist(err);
                done();
            });
        });

        it('should throw an error when trying to save without a number', function (done) {
            room.number = undefined;

            return room.save(function (err) {
                should.exist(err);
                err.errors.number.kind.should.be.equal('required');
                done();
            });
        });

        it('should throw an error when trying to save without a floor', function (done) {
            room.floor = undefined;

            return room.save(function (err) {
                should.exist(err);
                err.errors.floor.kind.should.be.equal('required');
                done();
            });
        });
    });

    afterEach(function () {
        Room.remove().exec();
    });
});
