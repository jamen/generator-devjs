<%= name %>
<%= name.split('').map(c => '=').join('') %>

> <%- desc %>

## Installation
```shell
$ npm install<%= typeof cli !== 'undefined' && cli ? ' -g' : '' %> <%= private ? name : `${username}/${name}` %>
```

## Usage<% if (typeof cli !== 'undefined' && cli) { %>
```shell
$ <%= name %>
```<% } else { %>
```javascript
import <%= name %> from '<%= name %>';
```<% } %>

## Credits
| ![<%= username %>][avatar] |
|=--------------------------=|
|   [<%= author %>][github]  |

  [avatar]: <%= avatar %>
  [github]: https://github.com/<%= username %>
