#! /usr/bin/env node

const meow = require( "meow" );
const log = require( "../lib/log" );
const commands = require( "../lib/commands" );

/* Cli entry point */

const cli = meow( `Usage
  $ getcomics-dl

Commands
  s, search Search for comics  

Examples
 $ getcomics-dl
 =>

 $ getcomics-dl
 =>

For the documentation please refer to:
https://github.com/jneidel/getcomics-dl`, {
  description: "getcomics-dl: 💾 CLI for comfortable comic download",
  flags      : {},
} );

// Clean up input
const args = cli.flags;
args._ = cli.input;

// Cli requires command
if ( args._.length === 0 ) {
  log.printPrompt( "Specify '--help' for available commands" );
  process.exit();
}

// Flag requires parameter
[].forEach( arg => {
  if ( arg.val === "" ) {
    log.printPrompt( `The '--${arg.name}' flag requires a parameter. Specify '--help' for available commands` );
    process.exit();
  }
} );

// Parse commands
switch ( args._[0] ) {
  case "config":
    commands.config( args );
    break;
  case "s":
  case "search":
    commands.search( args );
    break;
  default:
    commands.search( args );
}

process.on( "unhandledRejection", ( err ) => {
  if ( err.code === "ENOTFOUND" ) {
    log.printPrompt( "There is no internet connection." );
    process.exit();
  } else
    throw err;
} );

