'use strict';

var Acl = require('acl');

var acl = new Acl(new Acl.memoryBackend());

exports.invokeRolesPolicies = function () {
    acl.allow([{
        roles: ['admin'],
        allows: [{
            resources: '/api/room-feature-types',
            permissions: '*'
        }]
    }, {
        roles: ['user'],
        allows: [{
            resources: '/api/room-feature-types',
            permissions: ['get', 'post']
        }]
    }, {
        roles: ['guest'],
        allows: [{
            resources: '/api/room-feature-types',
            permissions: ['get']
        }]
    }]);
};

exports.isAllowed = function (req, res, next) {
    var roles = (req.user) ? req.user.roles : ['guest'];

    // Check for user roles
    acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
        if (err) {
            // An authorization error occurred.
            return res.status(500).send('Unexpected authorization error');
        }
        if (isAllowed) {
            // Access granted! Invoke next middleware
            return next();
        }
        return res.status(403).json({
            message: 'User is not authorized'
        });
    });
};
