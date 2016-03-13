# <%= name %>
> <%- desc %>

## Installation
```shell
$ npm install<%= cli ? ' -g' : '' %> <%= typeof private !== 'undefined' && private ? `${username}/${name}` : name %>
```

## Usage<% if (cli) { %>
```shell
$ <%= name %>
```<% } else { %>
```javascript
import <%= name %> from '<%= name %>';
```<% } %>

## Credits
| ![<%= username %>][avatar] |
|:---:|
| [<%= author %>][github] |

  [avatar]: <%= avatar %>&s=125
  [github]: https://github.com/<%= username %>
