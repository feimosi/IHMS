'use strict';

angular.module('reservations').config(function ($stateProvider) {
    $stateProvider
        .state('reservations', {
            abstract: true,
            url: '/reservations',
            template: '<ui-view/>'
        })
        .state('reservations.list', {
            url: '',
            templateUrl: 'modules/reservations/client/views/reservations-list.client.view.html'
        })
        .state('reservations.list.create', {
            url: '/book',
            data: {
                roles: ['user', 'admin']
            },
            params: {
                room: null
            },
            onEnter: function ($document, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'modules/reservations/client/views/reservation-create.client.view.html'
                }).result.then(function () {

                }).catch(function () {
                    $state.go('reservations.list');
                });
            }
        })
        .state('reservations.list.confirm', {
            url: '/confirm',
            data: {
                roles: ['user', 'admin']
            },
            params: {
                room: null,
                personalData: null
            },
            onEnter: function ($document, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'modules/reservations/client/views/reservation-confirm.client.view.html'
                }).result.then(function () {
                    $state.go('reservations.list.view');
                }).catch(function () {
                    $state.go('reservations.list');
                });
            }
        });
});
