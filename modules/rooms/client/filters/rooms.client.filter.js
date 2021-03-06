'use strict';

angular.module('rooms').filter('roomsFilter', function () {
    function byRoomNumber(rooms, roomNumberFilter) {
        var filtered = [];
        var roomNumbers = roomNumberFilter.split(/[,|\s]\s*/);
        roomNumbers.forEach(function (roomNumber) {
            filtered = filtered.concat(rooms.filter(function (room) {
                return room.number === +roomNumber;
            }));
        });
        return filtered;
    }

    function byFloorNumber(rooms, floorNumberFilter) {
        var filtered = [];
        var floorNumbers = floorNumberFilter.split(/[,|\s]\s*/);
        floorNumbers.forEach(function (floorNumber) {
            filtered = filtered.concat(rooms.filter(function (room) {
                return room.floor.number === +floorNumber;
            }));
        });
        return filtered;
    }

    return function (rooms, filters) {
        var isFiltered = false;
        var filtered = [];
        if (filters.roomNumber) {
            isFiltered = true;
            filtered = byRoomNumber(rooms, filters.roomNumber);
        }
        if (filters.floorNumber) {
            isFiltered = true;
            filtered = byFloorNumber(filtered.length ? filtered : rooms, filters.floorNumber);
        }
        return isFiltered ? filtered : rooms;
    };
});
