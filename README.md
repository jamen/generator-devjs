generator-devjs
===============
> DevJS's Yeoman generator, for our own projects, but also for you.

## Installation
```shell
$ npm i -g generator-devjs
```

## Usage
```
$ yo devjs[:subgen]
```

Mixing with yo 1.7.0+:
```
yo devjs:babel, devjs:eslint, devjs:gulp, license
```

Supply pre-generated environments:
```
yo devjs:gulp --babel --eslint
```

Usable generators:
  - `devjs`: Everything
  - `devjs:boilerplate`: Some common pieces (package.json, README, etc.)
  - `devjs:babel`: Babel
  - `devjs:eslint` ESLint
  - `devjs:react` React
  - `devjs:gulp`: Gulp

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
