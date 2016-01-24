'use strict';

angular.module('reservations').controller('ReservationConfirmController', function ($scope, $stateParams) {
    var vm = this;
    vm.currency = 'EUR';
    vm.room = $stateParams.room;
    vm.personalData = $stateParams.personalData;

    vm.confirm = function () {
        $scope.$close();
    };

    vm.dismiss = function () {
        $scope.$dismiss();
    };
});
