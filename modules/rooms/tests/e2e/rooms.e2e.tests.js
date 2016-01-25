'use strict';

describe('Rooms Management E2E Tests', function () {
    var sampleUser = {
        firstName: 'test',
        lastName: 'user',
        email: 'test.user@meanjs.com',
        username: 'testUser',
        password: 'P@$$w0rd!!'
    };

    function signUp() {
        browser.get('http://localhost:3001/authentication/signup');
        element(by.model('credentials.firstName')).sendKeys(sampleUser.firstName);
        element(by.model('credentials.lastName')).sendKeys(sampleUser.lastName);
        element(by.model('credentials.email')).sendKeys(sampleUser.email);
        element(by.model('credentials.username')).sendKeys(sampleUser.username);
        element(by.model('credentials.password')).sendKeys(sampleUser.password);
        element(by.css('button[type="submit"]')).click();
        expect(browser.getCurrentUrl()).toEqual('http://localhost:3001/');
    }

    function signIn() {
        browser.get('http://localhost:3001/authentication/signin');
        element(by.model('credentials.username')).sendKeys(sampleUser.username);
        element(by.model('credentials.password')).sendKeys(sampleUser.password);
        element(by.css('button[type="submit"]')).click();
        var errorMsg = element(by.binding('error'));
        if (errorMsg.isPresent()) {
            signUp();
        }
    }

    beforeEach(function () {
        signIn();
    });

    describe('Test articles page', function () {
        it('Should add a new room', function () {
            browser.get('http://localhost:3001/rooms');

            element(by.id('add-room-btn')).click();
            element(by.model('roomCreate.room.number')).sendKeys(101);
            element(by.cssContainingText('option', 'Floor 1')).click();
            element(by.id('create-room-btn')).click();

            expect(element(by.css('.ui-notification .message')).getText()).toContain('Success');
            expect(element(by.binding('roomDetails.room.number')).getText()).toEqual('101');
            expect(element(by.binding('roomDetails.room.floor.number')).getText()).toEqual('1');
        });
    });
});
