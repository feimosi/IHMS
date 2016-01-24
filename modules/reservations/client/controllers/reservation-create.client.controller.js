'use strict';

angular.module('reservations').controller('ReservationCreateController', function ($scope, $state, $stateParams) {
    var vm = this;
    vm.personalData = {};

    vm.next = function () {
        $state.go('reservations.list.confirm', {
            room: $stateParams.room,
            personalData: vm.personalData
        });
        $scope.$close();
    };

    vm.dismiss = function () {
        $scope.$dismiss();
    };
});
