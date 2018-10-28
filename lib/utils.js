const leftPad = require( "strpad" ).left

function createName( name, issue ) {
  name = name.toLowerCase();
  issue = leftPad( issue, 3, 0 );

  return `${name}-${issue}`
}

function formatName( rawName ) {
  if ( typeof rawName != "string" )
    return new TypeError( "name is not string" )

  const [ , name, issue ] = rawName.match( /^(.*?)\s#(\d+)/ ) // Standard single issue

  return createName( name, issue )
}

module.exports = {
  formatName,
}

