const fs = require( "mz/fs" );
const path = require( "path" );
const mkdir = require( "make-dir" );
const httpBase = require( "follow-redirects" );
const utils = require("./utils")

/**
 * Download the given file
 * @arg callback      - Handle data events
 * @arg endCallback   - Handle end event
 * @return outputPath - Download loaction
 */
function download( url, callback, endCallback, name ) {
  console.log( url )
  const httpLib = new URL( url ).protocol === "https:" ? httpBase.https : httpBase.http;
  
  const filename = name ? `${utils.formatName(name)}.cbr` : decodeURIComponent( url.split( "/" ).pop() );
  const outputPath = path.resolve( __dirname, "..", "tmp", filename ); // Save to .config/x?
  // await mkdir( path.dirname( outputPath ) ); // Maybe only needed once in the inital setup
  const outputStream = fs.createWriteStream( outputPath );

  httpLib.get( url, dataStream => {
    const total = dataStream.headers["content-length"];
    let progress = 0;

    dataStream.on( "data", chunk => {
      outputStream.write( chunk );

      progress += outputStream._writableState.writelen;
      const percent = Number( progress / total * 100 ).toFixed( 2 );
      callback( percent );
    } );

    dataStream.on( "end", () => {
      outputStream.end();
      endCallback( outputPath );
    } );
  } );

  return outputPath;
}

module.exports = download;

