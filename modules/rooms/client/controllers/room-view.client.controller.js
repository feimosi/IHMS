'use strict';

angular.module('rooms').controller('RoomViewController', function ($stateParams, Rooms) {
    var vm = this;
    vm.room = Rooms.get({ roomId: $stateParams.roomId }, function () {

    });
});
