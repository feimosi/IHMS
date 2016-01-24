'use strict';

angular.module('rooms').controller('RoomDetailsController', function ($scope, $stateParams,
                                                                      Rooms) {
    var vm = this;
    vm.room = Rooms.get({ roomId: $stateParams.roomId }, function () {
        vm.room.features.forEach(function (feature) {
            if (feature.type.name === 'Description') {
                vm.room.description = feature.value;
            }
        });
    });

    vm.exceptDetails = function (feature, index) {
        return feature.type.name !== 'Description';
    }

    vm.close = function () {
        $scope.$close();
    };
});
