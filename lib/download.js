const fs = require( "mz/fs" );
const path = require( "path" );
const mkdir = require( "make-dir" );
const http = require( "http" );
const https = require( "https" );

/**
 * Download the given file
 * @arg callback      - Handle data events
 * @arg endCallback   - Handle end event
 * @return outputPath - Download loaction
 */
function download( url, callback, endCallback ) {
  const httpLib = new URL( url ).protocol === "https:" ? https : http;

  const filename = decodeURIComponent( url.split( "/" ).pop() );
  const outputPath = path.resolve( __dirname, "..", "tmp", filename ); // Save to .config/x?
  //await mkdir( path.dirname( outputPath ) ); // Maybe only needed once in the inital setup
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
      endCallback();
    } );
  } );

  return outputPath;
}

module.exports = download;

