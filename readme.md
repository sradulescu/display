Display Systems
================

This is a general purpose, configurable system for data display. It currently contains 4 modules, which are explained further on.

All modules can be controlled via [websockets](http://en.wikipedia.org/wiki/WebSocket). In particular, we support [mserver](https://github.com/poelstra/mserver), which was made for this purpose and supports a higher level of messaging, routing, relaying and clustering. In any case, ordinary websocket is supported, as long as it delivers messages in the format described in the modules.

Also, all modules can be controlled via a javascript interface, so you can write your own scripts to interface with them. Lastly, we provide a control panel that can be opened in a separate screen to control the modules.

Get it running
-------

### Get is locally

Either:

- If you know what `git` is: clone the repository: `git clone https://github.com/FirstLegoLeague/displaySystem.git`
- Otherwise, just download the zip from: <https://github.com/FirstLegoLeague/displaySystem/archive/master.zip>

There are a few ways to use this package

### As a simple display in the browser

1. Double click `index.html`. This shows a white screen. Don't worry.
1. Open the console by pressing `F12` and selecting the `console` tab.
1. Type `displaySystem.modules.time.show()` and hit `enter`.

Ok, some clarification. All modules are hidden by default. Also, all modules are accessible to javascript, which makes it possible to control them. In step 3, you just executed some javascript to show the time. Let's do this some more:

- `displaySystem.modules.time.hide()`
- `displaySystem.modules.clock.show()`
- `displaySystem.modules.click.start()`

You probably do not want to do this every time you load the display. So, open `config.js` and replace

    'clock': {},

by

    'clock': {
        visible: true
    },

And reload the page. Voilà, the clock is visible by default. You can also do this with other modules.

Configuration
--------------

All basic configuration is done in the config.js file. The configuration options are:

- `wsHost`: Websocket host to connect to, if any
- `mserverNode`: Node to subscribe to when using [mserver](https://github.com/poelstra/mserver), can be omitted otherwise
- `background`: Background color of the application. Can be used for chromakeying. If omitted, the background color is not defined, which can mean transparent in for instance a [casparCG HTML producer](http://www.casparcg.com/)
- `modules`: Array of modules to load. These should correspond to names of js files in the modules folder
- `modulePath`: Path to load the modules from, defaults to `modules`. Can even be an url to another domain, since everything is loaded as a normal JavaScript file.

Styling
-----------

This repository provides basic styling, a git submodule, `graphicsPack` is included and provides images and generic stylesheets. For FirstLegoLeague purposes, this submodule is updated every year. in any case, you can provide your own styling and imagery. Basic css is defined in the modules, but you can create your own to override or amend it.

Modules
------------

Extensibility
-------------

You can write your own modules. The displaySystem API provides the following methods:

- config(configuration)
- registerModule(definition)

The registerModule method expects a definition object with the following keys:

- `name`: Name to register the module under. If omitted, the module is not registered and cannot be accessed programatically
- `template`: HTML to insert in the page. This should be a JS string.
- `style`: CSS to insert in the page. This should be a JS string. Note that the CSS is inserted at the front of the head. So any custom CSS in the head will override module defaults.
- `factory`: JS to execute when the module is loaded. If the factory returns something, it is registered under the module's name and can be accessed via `displaySystem.modules.<name>`

For string input, you can use [multiline](https://github.com/sindresorhus/multiline) which is included for convenience
