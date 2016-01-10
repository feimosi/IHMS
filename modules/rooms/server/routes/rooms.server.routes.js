'use strict';

var roomsPolicy = require('../policies/rooms.server.policy'),
    rooms = require('../controllers/rooms.server.controller');

module.exports = function (app) {
    app.route('/api/rooms').all(roomsPolicy.isAllowed)
        .get(rooms.list)
        .post(rooms.create);

    app.route('/api/rooms/:roomId').all(roomsPolicy.isAllowed)
        .get(rooms.read)
        .put(rooms.update)
        .delete(rooms.delete);

    app.route('/api/upload/rooms/picture')
        .post(rooms.changePicture);

    app.param('roomId', rooms.roomByID);
};
