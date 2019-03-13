const log = require( "./log" );
const searchLib = require( "./search" );

/* Functions for parsing cli commands */

function config( args ) {
  checkForUpdate();
}

async function search( args ) {
  // Args._.shift(); // Remove search command
  const searchArgs = args._.join( " " );

  searchLib( searchArgs, args.raw );
}

function checkForUpdate() {
  /* eslint-disable global-require */
  const updateCheck = require( "update-check" );
  const pkg = require( "../package.json" );

  updateCheck( pkg )
    .then( update => {
      if ( update )
        log.promptConsole( `A new version of getcomics-dl is available: current ${pkg.version}, latest ${update.latest}` );
    } );
}

module.exports = {
  config,
  search,
};

