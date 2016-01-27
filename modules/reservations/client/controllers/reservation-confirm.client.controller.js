'use strict';

angular.module('reservations').controller('ReservationConfirmController', function ($scope, $state, $stateParams) {
    var vm = this;
    vm.currency = 'EUR';
    vm.room = $stateParams.reservation.room;
    vm.startDate = $stateParams.reservation.startDate;
    vm.endDate = $stateParams.reservation.endDate;
    vm.personalData = $stateParams.personalData;

    vm.confirm = function () {
        $state.go('reservations.list.summary', {
            room: vm.room,
            personalData: vm.personalData
        });
        $scope.$close();
    };

    vm.dismiss = function () {
        $scope.$dismiss();
    };
});
