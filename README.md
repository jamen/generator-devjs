generator-devjs
===============
> DevJS's Yeoman generator, for our own projects, but also for you.

## Installation
```shell
$ npm i -g generator-devjs
```

## Usage
Usable generators:
  - `devjs`: Everything
  - `devjs:boilerplate`: Some common pieces (package.json, README, etc.)
  - `devjs:babel`: Babel
  - `devjs:eslint` ESLint
  - `devjs:react` React
  - `devjs:gulp`: Gulp
  - `devjs:mx`: Multiplexer, mixes generators

Compose generators together:
```javascript
$ yo devjs:babel devjs:eslint devjs:gulp
```

To use generators outside of our scope, but without our packages, use `devjs:mx` for the _multiplexer_:
```
$ yo devjs:mx backbone angular browserify
```
Note: this disables the use of `args` on the packages you are _multiplexing_.


## Docs & Support
 - [Repo Issues](#)
 - [Contact](#Credits)

## Author

|![Jamen Marz][jamen-image]|
|:--------:|
| [@jamen] |

## License
[MIT][license] &copy; Jamen Marzonie

<!-- All links must be "tagged" -->
 [@jamen]: https://github.com/jamen
 [jamen-image]: https://avatars2.githubusercontent.com/u/6251703?v=3&s=125

 [license]: LICENSE
