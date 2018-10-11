const inquirer = require( "inquirer" );
const separator = new inquirer.Separator();
const log = require( "./log" );
const scrape = require( "./scrape" );

module.exports = function search( args ) {
  const query = scrape.formQuery( args );

  handleSearch( query );
};

function addNextPrevChoices( results, choices ) {
  const next = results[results.length - 1];
  const prev = results[0];

  const hasNext = next.next;
  const hasPrev = prev.prev;

  const more = hasNext || hasPrev ? {} : null;
  if ( hasNext ) more.next = next.url;
  if ( hasPrev ) more.prev = prev.url;

  if ( hasNext || hasPrev ) {
    choices.push( separator );
    if ( hasPrev ) choices.push( { name: "Show previous page of results", value: "prev" } );
    if ( hasNext ) choices.push( { name: "Show next page of results", value: "next" } );
  }

  return [ choices, more ];
}

async function handleSearch( url, prevPage ) {
  const data = await scrape.getSearch( url );
  let more;
  let titles = data
    .map( x => x.title )
    .filter( x => !!x );

  [ titles, more ] = addNextPrevChoices( data, titles );

  const selection = await log.prompt( {
    type    : "list",
    name    : "comic",
    message : "Select a comic",
    choices : titles,
    pageSize: 15,
  } )
    .then( anwsers => anwsers.comic );

  if ( more )
    if ( selection === "prev" )
      return handleSearch( more.prev );
  if ( selection === "next" )
    return handleSearch( more.next );
  const comic = data.filter( x => x.title === selection )[0];
  return handleComic( comic.url, url );
}

async function handleComic( url, backUrl ) {
  const data = await scrape.getComic( url );

  log.printPrompt( `${data.title}
  ${data.desc}
` );

  const selection = await log.prompt(
    {
      type   : "list",
      name   : "choice",
      message: "What do you want to do?",
      choices: [
        { name: "Download", value: "download" },
        { name: "Go back", value: "back" },
      ],
    }
  ).then( anwsers => anwsers.choice )

  if ( selection === "back" )
    return handleSearch( backUrl );
  
  // Handle download here
}

