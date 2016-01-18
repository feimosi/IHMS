'use strict';

angular.module('rooms').controller('RoomEditController', function ($scope, $state, $stateParams, $window, $timeout,
                                                                   Rooms, Floors, FileUploader, Notification) {
    var vm = this;
    vm.room = Rooms.get({ roomId: $stateParams.roomId });
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

    vm.update = function () {
        vm.room.imageURL = null;
        vm.room.$update(function (response) {
            if (vm.fileUploader.queue.length > 0) {
                vm.fileUploader.uploadAll();
            } else {
                $scope.$close(response);
                Notification.success('<p class="notification-success">Success! The room details have been changed.</p>');
            }
        }, function (errorResponse) {
            vm.error = errorResponse.data.message;
        });
    };

    vm.dismiss = function () {
        $scope.$dismiss();
    };

    vm.delete = function () {
        vm.room.$delete().then(function () {
            $scope.$close({
                deleted: true
            });
            Notification.success('<p class="notification-success">Success! The room have been deleted.</p>');
        });
    };
});
