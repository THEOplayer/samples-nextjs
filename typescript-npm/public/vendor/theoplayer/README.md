# THEOplayer

THEOplayer is the universal video player solution created by THEO Technologies. It enables you to quickly deliver cross-platform content playback.

## Prerequisites

-   A valid THEOplayer license. Request yours via our [THEOportal](https://portal.theoplayer.com).

## Included features

The THEOplayer SDK consists of modular features. This package includes the following features: `ui`, `dash`, `hls`, `chromecast`, `vr`, `yospace`, `airplay`, `spotx`, `relatedcontent`, `social`, `upnext`, `conviva`, `cache`, `visibility`, `contextmenu`, `arris`, `youbora`, `mediamelon`, `ads`, `moat`, `texttrackstyle-ui`, `avplayer`, `google-dai`, `freewheel`, `exoplayer`, `activequalitylabel`, `upcomingadnotification`, `agama`, `webaudio`, `verizonmedia`

If you need a different set of features, you can:

-   Install a different variant of this package:

    -   [theoplayer](https://www.npmjs.com/package/theoplayer)
    -   [@theoplayer/basic-hesp](https://www.npmjs.com/package/@theoplayer/basic-hesp)
    -   [@theoplayer/basic-hls](https://www.npmjs.com/package/@theoplayer/basic-hls)
    -   [@theoplayer/basic-dash](https://www.npmjs.com/package/@theoplayer/basic-dash)
    -   [@theoplayer/basic-hls-dash](https://www.npmjs.com/package/@theoplayer/basic-hls-dash)
    -   [@theoplayer/extended](https://www.npmjs.com/package/@theoplayer/extended)

    (You should only install _one_ of the above mentioned variants at a time.)

-   Make your own custom build via our [THEOportal](https://portal.theoplayer.com).

## Installation

Install using your favorite package manager for Node (such as `npm` or `yarn`):

```bash
npm install theoplayer
```

You can also install a specific version instead:

```bash
npm install theoplayer@2.82.0
```

Note that versions earlier than 2.82.0 (release 2021.1.2) are not available on the public npm registry.
Earlier versions are available through our [THEOportal](https://portal.theoplayer.com).

## Usage

Add the THEOplayer library to your JavaScript web app:

```javascript
const THEOplayer = require('theoplayer');
```

Depending on your choice of module loader, transpiler or bundler, you may need to use an `import` instead:

```javascript
import * as THEOplayer from 'theoplayer';
```

Add the CSS stylesheet for the THEOplayer UI to your HTML page:

```html
<link rel="stylesheet" href="/url/to/node_modules/theoplayer/ui.css" />
```

Next, create an HTML element that will contain the player:

```html
<div id="theoplayer-container" class="video-js theoplayer-skin"></div>
```

Finally, create a player instance using the [THEOplayer.Player constructor](https://docs.theoplayer.com/api-reference/web/theoplayer.player.md).
Pass it the created HTML element and a [configuration object](https://docs.theoplayer.com/api-reference/web/theoplayer.playerconfiguration.md).

The configuration object must contain a valid license obtained from THEOportal. See our [how-to guides](https://docs.theoplayer.com/how-to-guides/12-license/00-introduction.md#web-and-chromecast-sdk) for more information.

```javascript
// The HTML element
let element = document.querySelector('#theoplayer-container');
// The player configuration
let configuration = {
    // Your license as given by THEOportal.
    license: 'your_theoplayer_license',
    // The URL where other JavaScript files from this package will be hosted on your web server.
    // THEOplayer may need to load these files as Web Workers in order to play certain streams.
    libraryLocation: '/url/to/node_modules/theoplayer/'
};
// Create the player instance
let player = new THEOplayer.Player(element, configuration);
```

That's it! You should now have a working player on your web page.
You can control this player through its UI, or through the `player` variable's [JavaScript API](https://docs.theoplayer.com/api-reference/web/theoplayer.player.md).

## Documentation

The documentation for THEOplayer is located on our [documentation website](https://docs.theoplayer.com).
For an example on how to setup THEOplayer, take a look at our [Getting started guide](https://docs.theoplayer.com/getting-started/01-sdks/01-web/00-getting-started.md).

## Support

If you are having issues installing or using the package, first look for existing answers on our [documentation website](https://docs.theoplayer.com/),
and in particular our [FAQ](https://docs.theoplayer.com/faq/00-introduction.md).

You can also contact our technical support team by following the instructions on our [support page](https://docs.theoplayer.com/faq/00-introduction.md).
Note that your level of support depends on your selected [support plan](https://www.theoplayer.com/supportplans).

## License

The contents of this package are subject to the [THEOplayer license](https://www.theoplayer.com/terms).
