const leftPad = require( "strpad" ).left;

function createName( name, issue ) {
  name = name.toLowerCase();
  name = name.split( " " ).join( "-" );
  issue = leftPad( issue, 3, 0 );

  return `${name}-${issue}`;
}

function formatName( rawName ) {
  console.log( rawName );
  if ( typeof rawName != "string" )
    return new TypeError( "name is not string" );

  const [ , name, issue ] = rawName.match( /^(.*?)\s#(\d+)/ ); // Standard single issue

  return createName( name, issue );
}

module.exports = {
  formatName,
  createName,
};

