#! /usr/bin/env node

const fs = require( "fs" );
const chalk = require( "chalk" );
const search = require( "../lib/search" );

/* Array of comics to check for updates

  Structure:
    [
      [ "Oblivion Song", 12 ],
      [ "{title}", {issue-nr} ],
    ]

  Case matters, full title, only works for comics of this format:
    'Gunning For Hits #3 (2019)'
    '{title} #{issue-nr}'

  This file has to be manually updated after running the script.
 */
const comics = require( "../comics" );

/* Updates file, new updates are added to this file

  To deactive remove the line with 'fs.appendFileSync()' toward the end of this file
 */
const updatesFile = "/home/jneidel/comics/updates";

// Remove annotated console.log lines below to make script silent

comics
  .filter( c => !c[2] ) /* 3rd value (skip) not true */
  .forEach( c => main( c[0], c[1] ) );

async function main( value, n ) {
  // Print which comics are being checked
  //console.log( chalk.green( "Checking:" ), value, "at", n );
  // (to fix spacing adjust spaces in line 52)

  const args = [ value ];
  let data = await search( args );

  const valueNoSpaces = value.replace( /\s/g, "\\s" ).replace( /-/g, "." );
  const regex = new RegExp( `^(:?${valueNoSpaces})\\s.*?#(\\d\\d?)` );

  data = data
    .map( x => x.match( regex ) )
    .filter( x => x !== null )
    .filter( x => x[2] > n )
    .map( x => x.input );

  if ( data.length !== 0 ) {
    // Print new comics
    console.log( `${chalk.red( "New:" )} ${data.join( "\n     " )}` );
    // Write new comics to file
    data.forEach( x => fs.appendFileSync( updatesFile,
      `${x.replace( /\(\d+\):\shttp.*$/g, "" )}\n` ) ); // Remove year nr and link from logs
  }
}

