describe('RoomsList controller', function () {
    var $controller;
    var controller;
    var $state;
    var Rooms;
    var RoomFeatureTypes;

    beforeEach(module(ApplicationConfiguration.applicationModuleName));
    beforeEach(module('rooms'));

    beforeEach(inject(function (_$controller_, _$rootScope_, _$state_, _Rooms_, _RoomFeatureTypes_) {
        $controller = _$controller_;
        Rooms = _Rooms_;
        RoomFeatureTypes = _RoomFeatureTypes_;
        $state = _$state_;

        controller = $controller('RoomsListController', {
            $scope: _$rootScope_.$new(),
            $state: $state,
            Rooms: Rooms,
            RoomFeatureTypes: RoomFeatureTypes
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

    it('should open edit view', function () {
        var roomA = new Rooms({
            _id: 'AAA',
            number: 1,
            floor: ''
        });
        var stopPropagationSpy = sinon.spy();
        var $event = { stopPropagation: stopPropagationSpy };
        var stateGoStub = sinon.stub($state, 'go');

        controller.openEditView($event, roomA);

        sinon.assert.calledOnce(stopPropagationSpy);
        sinon.assert.calledWith(stateGoStub, 'rooms.list.edit', { roomId: roomA._id });
    });
});
