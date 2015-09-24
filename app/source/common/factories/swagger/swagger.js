(function( ){

  var module;

  module = angular.module( 'ngNow.portal' );

  // Should be defined, make the IDE happy
  this.SwaggerSchema = SwaggerSchema || { };

  function SwaggerClientFactory( $http, $q ) {

    var client;

    client = new SwaggerClient( { } );

    // `SwaggerSchema` comes from our `documentation.js` file
    client.buildFromSpec( SwaggerSchema );

    return client;
  }

  module.factory(
    'SwaggerClient',
    [
      '$http',
      '$q',
      SwaggerClientFactory
    ]

  )


}( ));