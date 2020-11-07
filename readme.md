# getcomics-update

> Check getcomics.info for updates on a list of comics

[![License MIT](https://img.shields.io/badge/license-MIT-green.svg?style=flat-square)](https://github.com/jneidel/getcomics-dl/blob/master/license)

Check [getcomics](https://getcomics.info) for updates to your favorite series.

<details>
<summary><strong>Background</strong></summary>

Originally intended as a complete getcomics downloader, [but due to a few problems](https://github.com/jneidel/getcomics-dl/tree/f78e7934e74296e81384de30f4a6427ce0c4149c#readme) it's not possible right now.

</details>

## Features

- Subscribe to regular issues
- Check subscribed comics for updates

## Usage

### Setup:

```bash
# clone repo
git clone git@github.com:jneidel/getcomics-update.git
cd getcomics-update

# install dependencies
npm install

# initialize empty subscribe list
printf '[\n\n]' >comics.json
```

### Add subscribed comics:

The file `comics.json` ([path can be changed here](bin/new.js)) in the project
directory contains an array of array with the name of a series followed by the
last issue you've downloaded:

```json
[
  ["Deadly Class", 44],
  ["Oblivion Song", 27],
  ["The Walking Dead Deluxe", 2]
]
```

- You can only subscribe to running issues, which take the
`<title> #<issue_number> (<year>)` format at getcomics.
Like `Deadly Class #44 (2020)`

- For the name, case as well as having the complete title, is important.
  - `'deadly class'` != `'Deadly Class'`
  - `'Walking Dead'` != `'The Walking Dead'`

  Just copy the name directly from getcomics.

- The missing tailing comma on the last entry is important (has to be valid JSON
syntax).

**Example:**

You want to subscribe to the new Walking Dead Deluxe series. Looking at a [sample
issue](https://getcomics.info/other-comics/the-walking-dead-deluxe-1-2020/) you
get the format: <br> `The Walking Dead Deluxe #1 (2020)` so add the following entry to your `comics.json` file:

```json
  ["The Walking Dead Deluxe", 0]
```

### Check for updates:

```sh
# in the repo
./bin/new.js

# you will get output like
New: The Walking Dead Deluxe #2 (2020) - https://getcomics.info/?s=The%20Walking%20Dead%20Deluxe%20%232%20(2020)
New: Fire Power #5 (2020) - https://getcomics.info/?s=Fire%20Power%20%235%20(2020)
```

You can then download the new issues through the site (see [backgroud
fold](#getcomics-update) for why I am not doing more).

You will have to manually upgrade the issue number you are on in `comics.json`.

## Related

- [jneidel/mangareader-dl](https://github.com/jneidel/mangareader-dl): Easily download manga. Inspiration for this module.

## License

MIT © [Jonathan Neidel](https://jneidel.com)

