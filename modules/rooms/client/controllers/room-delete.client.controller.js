'use strict';

angular.module('rooms').controller('RoomDeleteController', function ($scope, $stateParams, Rooms, Notification) {
    var vm = this;
    vm.room = Rooms.get({
        roomId: $stateParams.roomId
    });

    vm.delete = function () {
        vm.room.$delete().then(function () {
            $scope.$close();
            Notification.success('<p class="notification-success">Success! The room has been deleted.</p>');
        });
    };

    vm.dismiss = function () {
        $scope.$dismiss();
    };
});
