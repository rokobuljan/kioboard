# <picture><source media="(prefers-color-scheme: dark)" srcset="kioboard-logo-dark.svg"><img alt="Kioboard" src="kioboard-logo.svg"></picture>

your  **virtual keyboard** for digital signage kiosk touchscreens

![Kioboard](wallpaper.png)

## Features

- [x] Fully customizable layouts
- [x] Fully customizable buttons icons
- [x] Fully customizable buttons actions
- [x] Themes: default, flat, glass. In light and dark mode
- [x] Layout files (contribute to the project!)
- [x] Shift + Caps-Lock
- [x] Close Kioboard button
- [x] Drag/move Kioboard handler
- [x] Customizable button icons (supported: Unicode, SVG)
- [x] Per-button custom action callbacks
- [x] Toggle Kioboard visibility or set as permanently open
- [x] Different layouts per input-sets
- [x] Long key press - repeat input

## Usage

```bash
npm i @rbuljan/kioboard
```

```js
import Kioboard from '@rbuljan/kioboard';
import '@rbuljan/kioboard/dist/kioboard.css';

const kio = new Kioboard({
    layoutName: "en",
    theme: "glass-dark",
});
```

```html
<input data-kioboard name="example">
```

## Options

Customization options example:

```js
const kio = new Kioboard({
    layoutName: "en", // "en|de|es|fr|hr" // Contribute for more!
    inputs: "[data-kioboard]", // selector|Element|Element[]|NodeList
    parent: "body", // selector|Element
    theme: "default", // "default|flat|glass-(light|dark)"
    layerName: "default",
    layers: {}, // instead of layoutName use custom layers
    icons: {}, // custom icons
    isEnterSubmit: true, // should Enter submit closest Form
    isVisible: false, // On init
    isAlwaysVisible: false, // Always
    shiftState: 0, // 0=off 1=on 2=capsLock
    onInit() { /*initialized*/ },
    onLoad() { /*layout loaded*/ },
    onShow() { /*after show*/ },
    onHide() { /*after hide*/ },
    onKeyDown() { /*after key press*/ },
    onKeyUp() { /*after key release*/ },
});
```

## API documentation

**[Open the full Kioboard API docs &rarr;](docs.md)**

## Tutorial

**[Open the quick Tutorial &rarr;](tutorial.md)**

## Feature requests / issues

[Github: rokobuljan/kioboard/issues &rarr;](https://github.com/rokobuljan/kioboard/issues)

## Licence

MIT

___

&copy; 2024-present — Roko C. Buljan
