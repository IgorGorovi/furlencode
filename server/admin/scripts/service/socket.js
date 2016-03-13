app..service('SocketService', ['$rootScope', '$location', '$q','User', function ($rootScope, $location, $q, User) {

    var def = $q.defer();
    var socket = io('/flight-updates').connect($location.protocol() + '://' + $location.host() + ':' + $location.port());
    socket.on('connect', function(){
        def.resolve();
        if(User.name) {
            socket.emit('register', {uid: User.uid, crew: User.crewSession});
        }
    });

    /*
        ensures we have a socket to work with
    */

    socket.on('disconnected', function() {
        def = $q.defer();
    });

    socket.on('reconnect', function () {
        def.resolve();
        $rootScope.$broadcast('connectionEstablished');
    });

    this.ready = function(){
        return def.promise;
    }

    this.on = function (eventName, callback) {
        socket.on(eventName, function () {
            var args = arguments;
            $rootScope.$apply(function () {
                callback.apply(socket, args);
            });
        });

    };


    this.emit = function (eventName, data, callback) {
        if(!data) {
            if(callback) {
                callback.apply(new Error('Invalid data!'));
            }
        } else {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            });
        }
    };

    this.removeAllListeners = function (eventName, callback) {
        socket.removeAllListeners(eventName, function () {
            var args = arguments;
            $rootScope.$apply(function () {
                callback.apply(socket, args);
            });
        });
    };

}]);
