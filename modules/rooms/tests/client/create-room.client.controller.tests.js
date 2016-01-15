describe('CreateRoom controller', function () {
    var $controller;
    var controller;
    var $rootScope;
    var $state;
    var Rooms;
    var Floors;
    var RoomFeatureTypes;

    beforeEach(module(ApplicationConfiguration.applicationModuleName));
    beforeEach(module('rooms'));
    beforeEach(inject(function (_$controller_, _$rootScope_, _$state_, _Rooms_, _Floors_, _RoomFeatureTypes_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $state = _$state_;
        Rooms = _Rooms_;
        Floors = _Floors_;
        RoomFeatureTypes = _RoomFeatureTypes_;
    }));

    describe('initialization', function () {
        it('should get all floors', function () {
            var floors = [];
            var floorsQueryStub = sinon.stub(Floors, 'query').returns(floors);

            controller = $controller('CreateRoomController', {
                $scope: $rootScope.$new(),
                $state: $state,
                Rooms: Rooms,
                Floors: Floors,
                RoomFeatureTypes: RoomFeatureTypes
            });

            sinon.assert.calledOnce(floorsQueryStub);
            controller.floors.should.deepEqual(floors);
        });

        it('should get all available room features', function () {
            var availableFeatures = [];
            var roomFeaturesTypesQueryStub = sinon.stub(RoomFeatureTypes, 'query').returns(availableFeatures);

            controller = $controller('CreateRoomController', {
                $scope: $rootScope.$new(),
                $state: $state,
                Rooms: Rooms,
                Floors: Floors,
                RoomFeatureTypes: RoomFeatureTypes
            });

            sinon.assert.calledOnce(roomFeaturesTypesQueryStub);
            controller.availableFeatures.should.deepEqual(availableFeatures);
        });
    });

    describe('usage', function () {
        it('should create a room', function () {
            var RoomsStub = sinon.stub();
            var FileUploaderStub = sinon.stub();
            var FileUploaderUploadAllStub = sinon.stub();
            RoomsStub.returns({
                $save: function (success) {
                    success({
                        _id: ''
                    });
                }
            });
            FileUploaderStub.returns({
                uploadAll: FileUploaderUploadAllStub
            });
            controller = $controller('CreateRoomController', {
                $scope: $rootScope.$new(),
                $state: $state,
                Rooms: RoomsStub,
                Floors: Floors,
                RoomFeatureTypes: RoomFeatureTypes,
                FileUploader: FileUploaderStub
            });
            var room = {
                number: 1,
                floor: { _id: '' },
                features: []
            };
            controller.room = Object.create(room);

            controller.create();

            sinon.assert.calledWith(RoomsStub, room);
            sinon.assert.calledOnce(FileUploaderStub);
            sinon.assert.calledOnce(FileUploaderUploadAllStub);
            controller.room._id.should.be.a.String();
        });
    });
});
