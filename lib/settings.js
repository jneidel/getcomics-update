const fs = require( "mz/fs" );
const path = require("path")
const fileExists = require( "file-exists" );
const expandHomeDir = require( "expand-home-dir" );

/**
 * Includes functions related to reading/writing the settings file
 */

const getSettings = path =>  

