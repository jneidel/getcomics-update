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

function getComic( url ) {
  return ajax( url )
    .then( html => {
      const $ = cheerio.load( html.data );

      const contents = $( ".post-contents" ).find( "p" )[0].children;
      const desc = contents[1].data;
      const title = contents[0].children[0].data.split( ":" )[0].trim();
      const down = $( ".aio-red" )[0].attribs.href;
      const zippy = $( ".aio-gray" )[0].attribs.href;

      return {
        url,
        desc,
        title,
        down,
        zippy,
      };
    } );
}

function getZippy( url ) {
  return ajax( url )
    .then( html => {
      const $ = cheerio.load( html.data );

      const contents = $( ".dl_startlink" )[0];
      console.log( contents );
      // Const desc = contents[1].data;
      // const title = contents[0].children[0].data.split( ":" )[0].trim();
      // const down = $( ".aio-red" )[0].attribs.href;
      // const zippy = $( ".aio-gray" )[0].attribs.href;

      return "";
    } );
}

module.exports = {
  formQuery,
  getSearch,
  getComic,
  getZippy,
};

