'use strict';

angular.module('rooms').config(function ($stateProvider) {
    $stateProvider
        .state('rooms', {
            abstract: true,
            url: '/rooms',
            template: '<ui-view/>'
        })
        .state('rooms.list', {
            url: '',
            templateUrl: 'modules/rooms/client/views/list-rooms.client.view.html'
        })
        .state('rooms.list.create', {
            url: '/create',
            data: {
                roles: ['user', 'admin']
            },
            onEnter: function ($document, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'modules/rooms/client/views/create-room.client.view.html'
                }).result.then(function (result) {
                    $state.go('rooms.view', {
                        roomId: result._id
                    });
                }).catch(function () {
                    $state.go('rooms.list');
                });
            }
        })
        .state('rooms.view', {
            url: '/:roomId',
            templateUrl: 'modules/rooms/client/views/view-room.client.view.html'
        })
        .state('rooms.edit', {
            url: '/:roomId/edit',
            templateUrl: 'modules/rooms/client/views/edit-room.client.view.html',
            data: {
                roles: ['user', 'admin']
            }
        });
});
