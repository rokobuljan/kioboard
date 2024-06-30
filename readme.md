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
import { Kioboard } from "@rbuljan/kioboard";
const kio = new Kioboard({layoutName: "en"});
```

```html
<input data-kioboard name="example">
```

## Options

Customization options example:

```js
import { Kioboard } from "@rbuljan/kioboard";

const kio = new Kioboard({
    layoutName: "en",
    inputs: "[data-kioboard]", // selector, Element, Element[], collection or NodeList
    parent: "body",            // selector or Element
    theme: "default",
    submitOnEnter: true,       // for <input> only
    isAlwaysVisible: false,
    isVisible: false,
    onShow() {
        console.log("Kioboard visible");
    },
    onHide() {
        console.log("Kioboard hidden");
    }
});
```

___

## API documentation

**[Open the full Kioboard API docs &rarr;](docs.md)**

## Tutorial

**[Open the quick Tutorial &rarr;](tutorial.md)**

## Licence

MIT

___

&copy; 2024-present — Roko C. Buljan
