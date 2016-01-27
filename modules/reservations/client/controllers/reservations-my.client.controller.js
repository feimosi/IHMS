'use strict';

angular.module('reservations').controller('MyReservationsController', function ($scope, Reservations, Authentication) {
    var vm = this;
    vm.reservations = Reservations.getByUser({
        userId: Authentication.user._id
    });
});
