describe('RoomsManagement controller', function () {
    var $controller;
    var controller;
    var Rooms;
    var Floors;

    beforeEach(module(ApplicationConfiguration.applicationModuleName));
    beforeEach(module('rooms'));

    beforeEach(inject(function (_$controller_, _$rootScope_, _Rooms_, _Floors_) {
        $controller = _$controller_;
        Rooms = _Rooms_;
        Floors = _Floors_;

        controller = $controller('RoomsManagementController', {
            $scope: _$rootScope_.$new(),
            Rooms: Rooms,
            Floors: Floors
        });
    }));

    it('should update rooms list', function () {
        var roomA = new Rooms({
            number: 1,
            floor: ''
        });
        var roomB = new Rooms({
            number: 1,
            floor: ''
        });
        sinon.stub(Rooms, 'query').returns([roomA, roomB]);

        controller.updateRoomsList();

        controller.rooms.should.containDeep([roomA, roomB]);
    });
});
