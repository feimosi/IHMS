'use strict';

angular.module('reservations').controller('ReservationConfirmController', function ($scope, $state, $stateParams,
                                                                                    Reservations, Authentication,
                                                                                    Notification) {
    var vm = this;
    vm.currency = 'EUR';
    vm.room = $stateParams.reservation.room;
    vm.startDate = $stateParams.reservation.startDate;
    vm.endDate = $stateParams.reservation.endDate;
    vm.personalData = $stateParams.personalData;

    vm.confirm = function () {
        var reservation = new Reservations({
            room: vm.room._id,
            user: Authentication.user._id,
            startDate: vm.startDate,
            endDate: vm.endDate
        });

        reservation.$save(function (response) {
            $state.go('reservations.list.summary', {
                reservation: $stateParams.reservation,
                personalData: $stateParams.personalData
            });
            Notification.success('Reservation process has completed successfully');
            $scope.$close(response);
        }, function (errorResponse) {
            if (errorResponse.data.message.includes('reservation needs an end date')) {
                Notification.warning('You can\'t make a reservation without end date specified');
            } else {
                vm.error = errorResponse.data.message;
            }
        });
    };

    vm.dismiss = function () {
        $scope.$dismiss();
    };
});
