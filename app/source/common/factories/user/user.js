(function( ){
  var module;

  // We are just accessing the module here, not declaring it
  module = angular.module( 'ngNow.portal' );

  function User( $window, $http, session, api, $rootScope ) {
    this.$window = $window;
    this.$http = $http;
    this.session = session;
    this.api = api;
    this.$rootScope = $rootScope;
  }

  User.prototype = {

    login: function( username, password ) {

      var that = this;

      this.session.user = null;
      this.session.token = null;

      return this.api.login( username, password )
        .then( function ( user ) {
          that.session.user = user;
          that.session.token = user.token;

          that.$rootScope.$broadcast( 'sessionChange' );

          return user;
        });
    },

    logout: function( ) {
      this.session.user = null;
      this.session.token = null;

      this.$rootScope.$broadcast( 'sessionChange' )
    }

  };

  // Job of the factory is to just return a service
  function UserFactory( $window, $http, session, api, $rootScope ) {

    // Pass dependencies to the service
    return new User( $window, $http, session, api, $rootScope )
  }

  module.factory( 'User', [
    //Define dependencies
    '$window',
    '$http',
    'Session',
    'Api',
    '$rootScope',
    //Define factory
    UserFactory
  ])


}( ));