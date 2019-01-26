# DISCONTINUED: getcomics-dl

> ~~💾 CLI for comfortable comic download~~

![Status](https://img.shields.io/badge/status-discontinued-red.svg?style=flat-square)
[![Travis Build Status](https://img.shields.io/travis/jneidel/getcomics-dl.svg?style=flat-square)](https://travis-ci.org/jneidel/getcomics-dl)
[![License MIT](https://img.shields.io/badge/license-MIT-green.svg?style=flat-square)](https://github.com/jneidel/getcomics-dl/blob/master/license)

~~Not ready for release yet. In the future this CLI will be like [jneidel/mangareader-dl](https://github.com/jneidel/mangareader-dl) but for [getcomics.info](https://getcomics.info).~~

I've tested downloading and it's totally unreliable. The problem being that sometimes requests will be deemed 'suspicous', redirecting the request. And as all links on the site go through php redirects, so this will happen a lot. Additionally all of the source providers are hard to scrape, hiding direct access to the file link, with the getcomics download being extremly slow.

I'll fix this cli up to be an easy search interface, as unfortunatly more is not possible right now.

## Features

- Search for comics
- Subscribe to (monthly) comics
- Check subscribed comics for updates
- ~~Easily update subscribed comics~~
- ~~Download using wget~~

## Related

- [jneidel/mangareader-dl](https://github.com/jneidel/mangareader-dl): Easily download manga. Inspiration for this module.

## License

MIT © [Jonathan Neidel](https://jneidel.com)
