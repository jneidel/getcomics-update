# getcomics-update

> Check getcomics.info for updates on a list of comics

[![License MIT](https://img.shields.io/badge/license-MIT-green.svg?style=flat-square)](https://github.com/jneidel/getcomics-dl/blob/master/license)

Originally a getcomics.info downloader, [but due to a few problems](https://github.com/jneidel/getcomics-dl/tree/f78e7934e74296e81384de30f4a6427ce0c4149c#readme) it's not possible right now.

<br>

Q: Why is this repo so sloppy?

A: This is not supposed to be a big project and the current description should be enough to get a [Turing Complete User](http://contemporary-home-computing.org/turing-complete-user/) started.

## Features

- Subscribe to regular issues (format: `{title} #{issue-nr} ({year})`)
- Check subscribed comics for updates

## Usage

**Clone the repo:**

```bash
git clone <repo>
cd <repo>
npm install
```

**Fill comic list:**

`comics.json` (see [bin/new.js](bin/new.js) for more info):

```json
[
  [ "Blackbird", 6 ],
  [ "Crowded", 6 ],
  [ "Die!Die!Die!", 8 ],
  [ "Oblivion Song", 13 ],
  [ "Sex Criminals", 25 ],
  [ "Burnouts", 5 ]
]
```

Entries have to be:

- case sensitive
- complete

**To run:**


```bash
# in repo
./bin/new.js

#or
node bin/new.js
```

## Related

- [jneidel/mangareader-dl](https://github.com/jneidel/mangareader-dl): Easily download manga. Inspiration for this module.

## License

MIT © [Jonathan Neidel](https://jneidel.com)

