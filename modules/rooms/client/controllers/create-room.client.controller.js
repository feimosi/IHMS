'use strict';

angular.module('rooms').controller('CreateRoomController', function ($state, $window, $timeout,
                                                                     Rooms, Floors, FileUploader) {
    var vm = this;
    vm.room = {};
    vm.floors = Floors.query(function (floors) {
        floors.forEach(function (floor) {
            floor.label = 'Floor ' + floor.number;
        });
        vm.room.floor = floors[0];
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
        $state.go('rooms.view', {
            roomId: response._id
        });
    };

    vm.create = function () {
        var room = new Rooms({
            number: vm.room.number,
            floor: vm.room.floor._id
        });

        room.$save(function (response) {
            vm.room._id = response._id;
            vm.fileUploader.uploadAll();
        }, function (errorResponse) {
            vm.error = errorResponse.data.message;
        });
    };
});