(function( ){
  var module;

  // We are just accessing the module here, not declaring it
  module = angular.module( 'ngNow.portal' );

  function Session( $window ) {
    this.$window = $window;
  }

  Session.prototype = {

    // Our key for storing data in our session
    AUTH_TOKEN_KEY: 'AUTH_TOKEN',

    // Ensure our token is available everywhere
    get token ( ) {
      return this.$window.localStorage.getItem( this.AUTH_TOKEN_KEY )
    },
    set token ( value ) {
      if (!value) {
        // Remove the token from storage if a null or false value is Passed
        this.$window.localStorage.removeItem( this.AUTH_TOKEN_KEY );
        return;
      }
      this.$window.localStorage.setItem( this.AUTH_TOKEN_KEY, value )
    },

    // Our key for storing data in our session
    USER_KEY: 'USER',

    // Ensure our token is available everywhere
    get user ( ) {
      var value = this.$window.localStorage.getItem(this.USER_KEY);
      return value ? JSON.parse( value ) : null;
    },
    set user ( value ) {
      if (!value) {
        // Remove the user from storage if a null or false value is Passed
        this.$window.localStorage.removeItem(this.USER_KEY);
        return;
      }
      value = JSON.stringify(value);
      this.$window.localStorage.setItem(this.USER_KEY, value)
    }

  };

  // Job of the factory is to just return a service
  function SessionFactory( $window ) {

    // Pass dependencies to the service
    return new Session( $window )
  }

  module.factory( 'Session', [
    //Define dependencies
    '$window',
    //Define factory
    SessionFactory
  ])


}( ));