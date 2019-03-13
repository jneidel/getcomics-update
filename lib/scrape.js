const cheerio = require( "cheerio" );
const ajax = require( "axios" ).get;

function formQuery( searchQuery ) {
  const search = encodeURIComponent( searchQuery );

  return `https://getcomics.info/?s=${search}`;
}

function getSearch( query ) {
  return ajax( query )
    .then( html => {
      const $ = cheerio.load( html.data );

      const isClass = ( elem, whichClass ) => String( elem.attribs.class ).includes( whichClass );

      const res = [];

      [ ...$( ".post-list-posts" )[0].children ]
        .filter( x => x.type === "tag" && x.name === "article" )
        .map( x => [ ...x.children ]
          .filter( x => x.name === "div" && isClass( x, "post-info" ) )[0]
        ).map( x => [ ...x.children ]
          .filter( x => x.name === "h1" && isClass( x, "post-title" ) )[0]
        ).map( x => x.children[0] )
        .forEach( x => {
          res.push( {
            url  : x.attribs.href,
            title: x.children[0].data,
          } );
        }
        );

      const nextPage = $( ".pagination-button" )[0]; // Also add prevPage
      if ( nextPage.name === "a" ) {
        res.push( {
          next: true,
          url : nextPage.attribs.href,
        } );
      }

      return res;
    } );
}

module.exports = {
  formQuery,
  getSearch,
};

