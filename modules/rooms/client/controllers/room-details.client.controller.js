'use strict';

angular.module('rooms').controller('RoomDetailsController', function ($scope, $stateParams,
                                                                      Rooms) {
    var vm = this;
    vm.room = Rooms.get({ roomId: $stateParams.roomId }, function () {

    });

    vm.close = function () {
        $scope.$close();
    };
});
