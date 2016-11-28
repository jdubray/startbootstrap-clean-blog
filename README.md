# [Start Bootstrap](http://startbootstrap.com/) - [Clean Blog](http://startbootstrap.com/template-overviews/clean-blog/)

[Clean Blog](http://startbootstrap.com/template-overviews/clean-blog/) is a stylish, responsive blog theme for [Bootstrap](http://getbootstrap.com/) created by [Start Bootstrap](http://startbootstrap.com/). This theme features a blog homepage, about page, contact page, and an example post page along with a working PHP contact form.

## Getting Started

To begin using this template, choose one of the following options to get started:
* [Download the latest release on Start Bootstrap](http://startbootstrap.com/template-overviews/clean-blog/)
* Clone the repo: `git clone https://github.com/BlackrockDigital/startbootstrap-clean-blog.git`
* Fork the repo

## Bugs and Issues

Have a bug or an issue with this template? [Open a new issue](https://github.com/BlackrockDigital/startbootstrap-clean-blog/issues) here on GitHub or leave a comment on the [template overview page at Start Bootstrap](http://startbootstrap.com/template-overviews/clean-blog/).

## Creator

Start Bootstrap was created by and is maintained by **[David Miller](http://davidmiller.io/)**, Owner of [Blackrock Digital](http://blackrockdigital.io/).

* https://twitter.com/davidmillerskt
* https://github.com/davidtmiller

Start Bootstrap is based on the [Bootstrap](http://getbootstrap.com/) framework created by [Mark Otto](https://twitter.com/mdo) and [Jacob Thorton](https://twitter.com/fat).

## SAM Pattern

This sample was modified to illustrate the [SAM pattern](http://sam.js.org). The updated sample features a back-end which provides the "model" initial value.

The back-end is a node.js application, located in the `./app/` directory. The blog metadata can be specified in the `./app/data.js` file.

The SAM pattern is implemented as a single page application. The structure of the pattern is implemented in the `./sam/` directory:
- actions.js
- model.js
- state.js
- view.js
 
This implement is generic and can be reused across project. The pattern is initialized in index.html
```
// wire the elements of the pattern as a reactive look action->model->state->view
state.init(view,theme, display, components) ;
model.init(state, components, options) ;
actions.init(model.present, options) ;
components.actions.forEach(function(action) {
    actions[action.name] = function(data, present) {
        return action.implementation(data, present, model) ;
    }
}) ;

view.init(model,theme(options))

// wire SAM actions to the global variable a 
a = actions ;

// render initial state
state.representation(model) ;
``` 

The display function is in charge of rendering the State representation into the Single Page structure (header, page, footer).
```
var display = function(representation) {
    preparePage(model) ;
    if (representation.header) { document.getElementById('header-representation').innerHTML = representation.header ; }
    if (representation.page) { document.getElementById('page-representation').innerHTML = representation.page ; }
    if (representation.footer) { document.getElementById('footer-representation').innerHTML = representation.footer ; }
    initElements() ;
    checkBackButton(model) ;
}
```

A simple page transformation lifecycle is implemented:
- preparePage (for rendering)
- render state representation
- initEments of the page (e.g. datePicker)
- checkBackButton

The sample is written in ES6 and transpiled at load time with [Google Traceur](https://github.com/google/traceur-compiler).

To install and run the back-end (assuming you have already installed node.js):

```
$  cd app/
$  npm install
$  node server-model.js
```

Open a browser at: [http://localhost:5625/html/](http://localhost:5625/html/)

The implemenation is designed to work with an atom 2.0 feed and currently configured to fetch the GitHub feed (`./config/default.json`)

## Copyright and License

Copyright 2013-2016 Blackrock Digital LLC. Code released under the [MIT](https://github.com/BlackrockDigital/startbootstrap-clean-blog/blob/gh-pages/LICENSE) license.
Copyright 2016 Jean-Jacques Dubray Code released under the [MIT](https://github.com/jdubray/startbootstrap-clean-blog/blob/master/LICENSE) license.