const scrape = require( "./scrape" );

module.exports = function search( args, raw ) {
  const query = scrape.formQuery( args );

  return rawSearch( query );
};

async function rawSearch( url ) {
  const data = await scrape.getSearch( url );
  const titles = data
    .map( x => x.title )
    .filter( x => !!x )
    .map( x => {
      const comic = data.filter( y => y.title === x )[0];
      return `${x}: ${comic.url}`;
    } );

  return titles;
}

