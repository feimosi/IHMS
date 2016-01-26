'use strict';

angular.module('reservations').controller('ReservationsListController', function (Rooms, RoomFeatureTypes) {
    var vm = this;
    vm.currency = 'EUR';
    vm.filters = {};
    vm.rooms = Rooms.query(function () {
        // Convert features array to a map
        vm.rooms.forEach(function (room) {
            room.features = room.features.reduce(function (obj, feature) {
                obj[feature.type.name] = feature.value;
                return obj;
            }, {});
        });
    });
    vm.roomFeatureTypes = RoomFeatureTypes.query(function () {
        // Convert features array to a map
        vm.roomFeatureTypes = vm.roomFeatureTypes.reduce(function (obj, feature) {
            obj[feature.name] = feature;
            return obj;
        }, {});
    });
});
