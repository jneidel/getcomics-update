const test = require("ava")
const utils = require("../lib/utils")

// utils.formatName
test( "format name correctly", t => t.is( utils.formatName( "Redneck #16 (2018)" ), "redneck-016" ) )

test( "format name correctly with 2 zero pads", t => t.is( utils.formatName( "Burnouts #2 (2018)" ), "burnouts-002" ) )

