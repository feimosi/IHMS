'use strict';

angular.module('reservations').controller('ReservationsListController', function ($scope, Rooms, RoomFeatureTypes) {
    var vm = this;
    vm.currency = 'EUR';
    vm.filters = {};
    vm.datepickerOptions = {
        startingDay: 1,
        showWeeks: false,
        showButtonBar: false
    };
    vm.datepickerStartOpened = false;
    vm.datepickerEndOpened = false;
    vm.dateStart = Date.now();
    vm.dateEnd = null;
    vm.minStartDate = Date.now();
    vm.minEndDate = null;
    vm.rooms = Rooms.query(function () {
        // Convert features array to a map
        vm.rooms.forEach(function (room) {
            room.features = room.features.reduce(function (obj, feature) {
                obj[feature.type.name] = feature.value;
                return obj;
            }, {});
        });
    });
    vm.roomFeatureTypes = RoomFeatureTypes.query(function () {
        // Convert features array to a map
        vm.roomFeatureTypes = vm.roomFeatureTypes.reduce(function (obj, feature) {
            obj[feature.name] = feature;
            return obj;
        }, {});
    });

    vm.openDatepickerStart = function openDatepickerStart() {
        vm.datepickerStartOpened = true;
    };

    vm.openDatepickerEnd = function openDatepickerEnd() {
        vm.datepickerEndOpened = true;
    };

    $scope.$watch(function () {
        return vm.dateStart;
    }, function () {
        if (vm.dateStart !== null) {
            var dateStart = new Date(vm.dateStart);
            dateStart.setDate(dateStart.getDate() + 1);
            vm.minEndDate = dateStart;
        }
    });
});
