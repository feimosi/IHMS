'use strict';

angular.module('rooms').controller('CreateRoomController', function ($state, Rooms, Floors) {
    var vm = this;
    vm.room = {};
    vm.floors = Floors.query(function (floors) {
        floors.forEach(function (floor) {
            floor.label = 'Floor ' + floor.number;
        });
        vm.room.floor = floors[0];
    });

    vm.create = function () {
        var room = new Rooms({
            number: vm.room.number,
            floor: vm.room.floor._id
        });

        room.$save(function (response) {
            $state.go('rooms.view', {
                roomId: response._id
            });
        }, function (errorResponse) {
            vm.error = errorResponse.data.message;
        });
    };
});
