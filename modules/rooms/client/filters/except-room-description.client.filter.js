'use strict';

angular.module('rooms').filter('exceptRoomDescription', function () {
    return function (features) {
        var filtered = [];
        if (angular.isArray(features)) {
            filtered = features.filter(function (feature) {
                return feature.type.name !== 'Description';
            });
        }
        return filtered;
    };
});
