'use strict';

angular.module('rooms').controller('RoomsListController', function ($scope, $state, Rooms, RoomFeatureTypes) {
    var vm = this;
    vm.rooms = [];
    vm.filters = {};
    vm.roomFeatureTypes = RoomFeatureTypes.query();
    vm.error = null;

    vm.updateRoomsList = function () {
        vm.rooms = Rooms.query();
    };

    vm.openEditView = function ($event, room) {
        $event.stopPropagation();
        $state.go('rooms.list.edit', { roomId: room._id });
    };

    vm.isNotNull = function (item) {
        return item !== null;
    };

    vm.updateRoomsList();
});
