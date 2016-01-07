'use strict';

require('../../server/models/floor.server.model');
var should = require('should'),
    mongoose = require('mongoose');

describe('Floor Model', function () {
    var Floor;
    var floor;

    before(function () {
        mongoose.connect('mongodb://localhost/local');
        Floor = mongoose.model('Floor');
    });

    beforeEach(function () {
        floor = new Floor({
            number: 1
        });
    });

    describe('Save', function () {
        it('should save without problems', function (done) {
            return floor.save(function (err) {
                should.not.exist(err);
                done();
            });
        });

        it('should throw an error when trying to save without number', function (done) {
            floor.number = undefined;

            return floor.save(function (err) {
                should.exist(err);
                done();
            });
        });
    });

    afterEach(function () {
        Floor.remove().exec();
    });
});
