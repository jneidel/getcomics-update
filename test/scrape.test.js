const test = require( "ava" );

const scrape = require( "../lib/scrape" );

// scrape.formQuery
test( "form query with spaces [unit]", t => {
  const search = "oblivion song";
  const result = "https://getcomics.info/?s=oblivion%20song";

  const query = scrape.formQuery( search );
  t.is( query, result );
} );
test( "form query with symbol characters [unit]", t => {
  const search = `!"§$%&/()=?{[]}+*~#-_.:,;<>|^°`; // Misses \'
  const result = "https://getcomics.info/?s=!%22%C2%A7%24%25%26%2F()%3D%3F%7B%5B%5D%7D%2B*~%23-_.%3A%2C%3B%3C%3E%7C%5E%C2%B0";

  const query = scrape.formQuery( search );
  t.is( query, result );
} );

// scrape.getSearch
test( "get results for query", async t => {
  const search = scrape.formQuery( "100 bullets 2014" );
  const result = [
    {
      title: "100 Bullets Book 1 – 5 (2014-2016)",
      url  : "https://getcomics.info/dc/100-bullets-book-1-5/",
    },
    {
      title: "100 Bullets – Brother Lono (2014)",
      url  : "https://getcomics.info/dc/100-bullets-brother-lono-2014/",
    },
    {
      title: "Justice – Inc. #1 – 6 (2014-2015)",
      url  : "https://getcomics.info/other-comics/justice-inc-1-6-2014-2015/",
    },
    {
      title: "Stray Bullets Vol. 6 – Killers (2014)",
      url  : "https://getcomics.info/other-comics/stray-bullets-vol-6-killers-2014/",
    },
  ];

  await scrape.getSearch( search )
    .then( results => t.deepEqual( results, result ) );
} );
test( "get search with 2nd page", async t => {
  const search = "https://getcomics.info/?s=alan+moore+198";
  const result = {
    next: true,
    url : "https://getcomics.info/page/2/?s=alan+moore+198",
  };

  await scrape.getSearch( search )
    .then( results => t.deepEqual( results[results.length - 1], result ) );
} );

// scrape.getComic
test( "get comic page info", async t => {
  const url = "https://getcomics.info/other-comics/oblivion-song-7-2018/";
  const result = {
    url,
    // down : "http://weekly1.comicfiles.ru/2018.09.12/Up2/Oblivion%20Song%20By%20Kirkman%20%2526%20De%20Felici%20007%20%282018%29%28Digital%29%28TCHQ%29.cbz", Old one
    down : "https://getcomics.info/go.php-url=/aHR0cDovL3dlZWtseTEuY29taWNmaWxlcy5ydS8yMDE4LjA5LjEyL1VwMi9PYmxpdmlvbiUyMFNvbmclMjBCeSUyMEtpcmttYW4lMjAlMjUyNiUyMERlJTIwRmVsaWNpJTIwMDA3JTIwJTI4MjAxOCUyOSUyOERpZ2l0YWwlMjklMjhUQ0hRJTI5LmNieg==",
    title: "Oblivion Song #7 (2018)",
    desc : "In the wake of last issue’s startling revelation, Nathan Cole’s world comes crashing down around him. For the sake of two worlds, he must pick up the pieces and carry on.",
    zippy: "https://getcomics.info/go.php-url=/aHR0cHM6Ly93d3c0MS56aXBweXNoYXJlLmNvbS92L2RqZXNHWDloL2ZpbGUuaHRtbA==",
  };

  await scrape.getComic( url )
    .then( r => t.deepEqual( result, r ) );
} );

// scrape.getZippy
test( "getZippy", async t => {
  // const url = "https://getcomics.info/go.php-url=/aHR0cHM6Ly93d3c0Mi56aXBweXNoYXJlLmNvbS92L2NkU1hadU1ML2ZpbGUuaHRtbA=="
  const url = "https://getcomics.info/go.php-url=/aHR0cDovL3d3dy5tZWRpYWZpcmUuY29tL2ZpbGUvMWZjdDlnNHB5aGg5MmNkL09ibGl2aW9uX1NvbmdfMDExXyUyNTI4MjAxOSUyNTI5XyUyNTI4RGlnaXRhbCUyNTI5XyUyNTI4Wm9uZS1FbXBpcmUlMjUyOS5jYnIvZmlsZQ==";
  const result = "https://www42.zippyshare.com/d/cdSXZuML/23/Oblivion%20Song%20011%20%282019%29%20%28Digital%29%20%28Zone-Empire%29.cbr";

  await scrape.getZippy( url )
    .then( r => t.equal( result, r ) );
} );

