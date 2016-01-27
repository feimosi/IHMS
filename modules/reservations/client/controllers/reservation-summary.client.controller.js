'use strict';

angular.module('reservations').controller('ReservationSummaryController', function ($scope, $state, $stateParams) {
    var vm = this;
    vm.currency = 'EUR';
    vm.room = $stateParams.reservation.room;
    vm.personalData = $stateParams.personalData;

    vm.close = function () {
        $scope.$close();
    };
});
