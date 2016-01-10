'use strict';

angular.module('rooms').controller('ViewRoomController', function ($stateParams, Rooms) {
    var vm = this;
    vm.room = Rooms.get({ roomId: $stateParams.roomId }, function () {

    });
});
