<%= name %>
<% var i = 0; while (name.length > i) { %>=<% i++ }%>
<% if (travis) { %>![build status][build]<% } %>
> <%= desc %>

## Installation
```shell
<% if (!private) { %>$ npm install <%= (cli && '-g') || '' %> <%= name %><% } else { %>$ npm install <%= (cli && '-g') || '' %> <%= username %>/<%= name %><% } %>
```

## Usage
<% if (!cli) { %>
```javascript
import <%= name %> from '<%= name %>';
// ...
```
<% } else { %>
```shell
$ <%= name %>
```
<% } %>

## Credits
| ![<%= username %>][image] |
|=----------------------------=|
|    [<%= author %>][github]   |

[build]: https://travis-ci.org/<%= username %>/<%= name %>.svg
[image]: <%= avatar %>
[github]: https://github.com/<%= username %>
