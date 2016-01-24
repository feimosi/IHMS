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
        });
});
