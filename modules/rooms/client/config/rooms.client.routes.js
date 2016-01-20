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
            templateUrl: 'modules/rooms/client/views/rooms-list.client.view.html'
        })
        .state('rooms.list.create', {
            url: '/create',
            data: {
                roles: ['user', 'admin']
            },
            onEnter: function ($document, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'modules/rooms/client/views/room-create.client.view.html'
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
            templateUrl: 'modules/rooms/client/views/room-details.client.view.html'
        })
        .state('rooms.list.edit', {
            url: '/:roomId/edit',
            data: {
                roles: ['user', 'admin']
            },
            onEnter: function ($document, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'modules/rooms/client/views/room-edit.client.view.html'
                }).result.then(function (result) {
                    if (result.deleted) {
                        $state.go('rooms.list', {}, {
                            reload: true
                        });
                    } else {
                        $state.go('rooms.view', {
                            roomId: result._id
                        });
                    }
                }).catch(function () {
                    $state.go('rooms.list');
                });
            }
        });
});
