const logUpdate = require( "log-update" );
const chalk = require( "chalk" );
const inquirer = require( "inquirer" );

exports.update = function update( msg ) {
  logUpdate( msg );
};
exports.print = function print( msg ) {
  console.log( msg );
};

exports.updatePrompt = function updatePrompt( msg ) {
  logUpdate( `${chalk.green( `❯` )} ${msg}` );
};
exports.printPrompt = function printPrompt( msg ) {
  console.log( `${chalk.green( `❯` )} ${msg}` );
};

exports.prompt = obj => inquirer.prompt( [ obj ] );

