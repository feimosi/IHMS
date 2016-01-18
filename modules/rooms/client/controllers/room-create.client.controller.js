'use strict';

angular.module('rooms').controller('RoomCreateController', function ($scope, $state, $window, $timeout,
                                                                     Rooms, Floors, RoomFeatureTypes, FileUploader,
                                                                     Notification) {
    var vm = this;
    vm.room = {};
    vm.availableFeatures = RoomFeatureTypes.query();
    vm.floors = Floors.query(function (floors) {
        floors.forEach(function (floor) {
            floor.label = 'Floor ' + floor.number;
        });
    });

    vm.fileUploader = new FileUploader({
        url: '/api/upload/rooms/picture/',
        alias: 'image'
    });

    vm.fileUploader.onAfterAddingFile = function (fileItem) {
        var lastItem = vm.fileUploader.queue.pop();
        vm.fileUploader.clearQueue();
        vm.fileUploader.queue.push(lastItem);
        if ($window.FileReader) {
            var fileReader = new FileReader();
            fileReader.readAsDataURL(fileItem._file);
            fileReader.onload = function (fileReaderEvent) {
                $timeout(function () {
                    vm.room.imageURL = fileReaderEvent.target.result;
                }, 0);
            };
        }
    };

    vm.fileUploader.onBeforeUploadItem = function (fileItem) {
        fileItem.formData = [{
            roomId: vm.room._id
        }];
    };

    vm.fileUploader.onSuccessItem = function (fileItem, response) {
        $scope.$close(response);
    };

    $scope.$watch(function () {
        return vm.room.number;
    }, function () {
        if (vm.roomForm.floor.$pristine) {
            // Is at least 3-digit number
            if (/\d{3,}/.test(vm.room.number)) {
                var potentialFloor = +('' + vm.room.number).slice(0, -2);
                if (angular.isNumber(potentialFloor)) {
                    vm.room.floor = vm.floors[potentialFloor];
                }
            }
        }
    });

    vm.create = function () {
        var roomFeatures = [];
        for (var roomFeature in vm.room.features) {
            if (vm.room.features.hasOwnProperty(roomFeature)) {
                roomFeatures.push(vm.room.features[roomFeature]);
            }
        }

        var room = new Rooms({
            number: vm.room.number,
            floor: vm.room.floor,
            features: roomFeatures
        });

        room.$save(function (response) {
            vm.room._id = response._id;
            if (vm.fileUploader.queue.length > 0) {
                vm.fileUploader.uploadAll();
            } else {
                $scope.$close(response);
                Notification.success('Success! New room has been added.');
            }
        }, function (errorResponse) {
            vm.error = errorResponse.data.message;
        });
    };

    vm.dismiss = function () {
        $scope.$dismiss();
    };
});
