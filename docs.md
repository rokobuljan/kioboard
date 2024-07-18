&larr; [Home](readme.md)
___

# <picture><source media="(prefers-color-scheme: dark)" srcset="kioboard-logo-dark.svg"><img alt="Kioboard" height="24" src="kioboard-logo.svg"></picture> Docs
## Classes

<dl>
<dt><a href="#Kioboard">Kioboard</a></dt>
<dd><p>Kioboard</p>
</dd>
</dl>

## Members

<dl>
<dt><a href="#pointerId">pointerId</a></dt>
<dd></dd>
<dt><a href="#key">key</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#el">el(sel, [par])</a> ⇒ <code>HTMLElement</code></dt>
<dd><p>DOM helper - Get one DOM element</p>
</dd>
<dt><a href="#els">els(sel, [par])</a> ⇒ <code>NodeList</code></dt>
<dd><p>DOM helper - Get multiple DOM elements</p>
</dd>
<dt><a href="#elNew">elNew(tag, [prop])</a> ⇒ <code>HTMLElement</code></dt>
<dd><p>DOM helper - Create new DOM element</p>
</dd>
<dt><a href="#keysArray">keysArray(keys)</a> ⇒ <code>Array.&lt;string&gt;</code></dt>
<dd><p>Convert a string or array of strings - to array</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#ActionFunction">ActionFunction</a> : <code>function</code></dt>
<dd><p>Object with action callbacks which function name matches the key name @param {string} key the pressed key name</p>
</dd>
<dt><a href="#Actions">Actions</a> : <code>Object.&lt;string, ActionFunction&gt;</code></dt>
<dd><p>Object with action callbacks where the key matches the key-name</p>
</dd>
<dt><a href="#LayerRows">LayerRows</a> : <code>Array.&lt;(string|Array)&gt;</code></dt>
<dd><p>The rows with keys like [&quot;q w e&quot;, &quot;a s d&quot;, ...]</p>
</dd>
<dt><a href="#Layers">Layers</a> : <code>Object.&lt;string, LayerRows&gt;</code></dt>
<dd><p>Object with layer names (as keys) and rows as Array</p>
</dd>
<dt><a href="#Icon">Icon</a> : <code>Object.&lt;string, string&gt;</code></dt>
<dd><p>String character, Unicode or SVG</p>
</dd>
<dt><a href="#Icons">Icons</a> : <code>Object.&lt;string, Icon&gt;</code></dt>
<dd></dd>
<dt><a href="#Layout">Layout</a> : <code>Object.&lt;string, any&gt;</code></dt>
<dd><p>Object with three specific (yet optional) keys:</p>
</dd>
<dt><a href="#KeyDownCallback">KeyDownCallback</a> : <code>function</code></dt>
<dd><p>Callback triggered on key press</p>
</dd>
<dt><a href="#KeyUpCallback">KeyUpCallback</a> : <code>function</code></dt>
<dd><p>Callback triggered on key release</p>
</dd>
</dl>

<a name="Kioboard"></a>

## Kioboard
Kioboard

**Kind**: global class  

* [Kioboard](#Kioboard)
    * [new Kioboard(options)](#new_Kioboard_new)
    * [.commonActions](#Kioboard+commonActions) : [<code>Actions</code>](#Actions)
    * [.commonIcons](#Kioboard+commonIcons) : [<code>Icons</code>](#Icons)
    * [.load([layoutName], callback)](#Kioboard+load) ⇒ [<code>Kioboard</code>](#Kioboard)
    * [.setLayers(layers)](#Kioboard+setLayers) ⇒ [<code>Kioboard</code>](#Kioboard)
    * [.addLayers(layers)](#Kioboard+addLayers) ⇒ [<code>Kioboard</code>](#Kioboard)
    * [.setActions(actions)](#Kioboard+setActions) ⇒ [<code>Kioboard</code>](#Kioboard)
    * [.setIcons(icons)](#Kioboard+setIcons) ⇒ [<code>Kioboard</code>](#Kioboard)
    * [.addIcons(icons)](#Kioboard+addIcons) ⇒ [<code>Kioboard</code>](#Kioboard)
    * [.on(keys, callback)](#Kioboard+on) ⇒ [<code>Kioboard</code>](#Kioboard)
    * [.off(keys, callback)](#Kioboard+off) ⇒ [<code>Kioboard</code>](#Kioboard)
    * [.emit(keys)](#Kioboard+emit) ⇒ [<code>Kioboard</code>](#Kioboard)
    * [.sequence(keys, speed, callback)](#Kioboard+sequence) ⇒ <code>function</code>
    * [.clearKioboard()](#Kioboard+clearKioboard) ⇒ [<code>Kioboard</code>](#Kioboard)
    * [.drawButtons()](#Kioboard+drawButtons) ⇒ [<code>Kioboard</code>](#Kioboard)
    * [.shift([state])](#Kioboard+shift) ⇒ [<code>Kioboard</code>](#Kioboard)
    * [.changeLayer([layerName])](#Kioboard+changeLayer) ⇒ [<code>Kioboard</code>](#Kioboard)
    * [.setTheme(theme)](#Kioboard+setTheme) ⇒ [<code>Kioboard</code>](#Kioboard)
    * [.show([layerName])](#Kioboard+show) ⇒ [<code>Kioboard</code>](#Kioboard)
    * [.hide()](#Kioboard+hide) ⇒ [<code>Kioboard</code>](#Kioboard)
    * [.handleShow(evt)](#Kioboard+handleShow)
    * [.handleHide(evt)](#Kioboard+handleHide)
    * [.handleKeyDown(evt)](#Kioboard+handleKeyDown)
    * [.handleKeyUp(evt)](#Kioboard+handleKeyUp)
    * [.hasSelection()](#Kioboard+hasSelection) ⇒ <code>boolean</code>
    * [.setRange(val, from, to)](#Kioboard+setRange) ⇒ [<code>Kioboard</code>](#Kioboard)
    * [.insert(val, from, to)](#Kioboard+insert)
    * [.init()](#Kioboard+init) ⇒ [<code>Kioboard</code>](#Kioboard)
    * [.destroy()](#Kioboard+destroy) ⇒ [<code>Kioboard</code>](#Kioboard)

<a name="new_Kioboard_new"></a>

### new Kioboard(options)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  |  |
| options.parent | <code>string</code> \| <code>NodeList</code> \| <code>undefined</code> | <code>&quot;body&quot;</code> | Element to insert kioboard into |
| options.inputs | <code>string</code> \| <code>NodeList</code> \| <code>HTMLElement</code> \| <code>undefined</code> | <code>&quot;[data-kioboard]&quot;</code> | Selector string, Element or elements. The input(s) to bind to |
| options.input | <code>HTMLInputElement</code> \| <code>HTMLTextAreaElement</code> | <code>options.inputs[0]</code> | The currently active input |
| [options.layoutName] | <code>string</code> \| <code>undefined</code> |  | The /layouts/<name>.js to use |
| [options.layers] | [<code>Layers</code>](#Layers) |  | All layers, layout layers, custom or dynamically added |
| options.layerName | <code>string</code> | <code>&quot;default&quot;</code> | Current layout name |
| options.layerNameDefault | <code>string</code> | <code>&quot;default&quot;</code> | Name definition for "default" layout |
| options.layerNameShift | <code>string</code> | <code>&quot;shift&quot;</code> | Name definition for "shift" layout |
| options.theme | <code>string</code> | <code>&quot;default&quot;</code> | The theme to use. "default|flat|glass" or other |
| options.icons | <code>Object</code> | <code>{}</code> | Custom icons for keys {keyName: "icon", ...} |
| options.isEnterSubmit | <code>boolean</code> | <code>true</code> | Whether to submit on enter (only for HTMLInputElements) |
| options.onKeyDown | [<code>KeyDownCallback</code>](#KeyDownCallback) |  | Callback when a key is pressed |
| options.onKeyUp | [<code>KeyUpCallback</code>](#KeyUpCallback) |  | Callback when a key is released |
| options.isVisible | <code>boolean</code> | <code>false</code> | Whether kioboard is visible |
| options.isAlwaysVisible | <code>boolean</code> | <code>false</code> | Never hide kioboard |
| options.shiftState | <code>number</code> |  | Shift states: 0=Off 1=On 2=Caps-lock. When 0 the "default" layer will be used |
| options.onInit | <code>function</code> |  | Callback after kioboard instance is initialized |
| options.onShow | <code>function</code> |  | Callback after kioboard is shown |
| options.onHide | <code>function</code> |  | Callback after kioboard is hidden |
| options.onLoad | <code>function</code> |  | Callback after Layout file is loaded |

**Example**  
```js
const kio = new Kioboard({
  parent: document.querySelector("#kioboardWrapper"),
  layoutName: "hr", // Init with Croatian layout (see available: layouts/ folder)
  theme: "flat-dark", // "default"|"default-dark"|"flat"|"flat-dark"
  onInit() {
    console.log("kioboard initialized!", this);
  },
  onkeyDown(key) {
    console.log("Pressed key", key);
  },
  onShow() {
    console.log("Kioboard shown!");
  },
  onHide() {
    console.log("Kioboard hidden!");
  },     
  onLoad() {
    console.log("Kioboard layout file loaded!");
    this.show("default");
  },       
});
```
<a name="Kioboard+commonActions"></a>

### kioboard.commonActions : [<code>Actions</code>](#Actions)
Common actions
Those are non-trivial to write and grasp, so every 
layout will inherit those actions. The user 
can override each of these in their own layout.

**Kind**: instance property of [<code>Kioboard</code>](#Kioboard)  
<a name="Kioboard+commonIcons"></a>

### kioboard.commonIcons : [<code>Icons</code>](#Icons)
Beautifully crafted Kioboard icons.
The user can override any of those from their own layouts.

**Kind**: instance property of [<code>Kioboard</code>](#Kioboard)  
<a name="Kioboard+load"></a>

### kioboard.load([layoutName], callback) ⇒ [<code>Kioboard</code>](#Kioboard)
Loads a layout .js file from the layouts/ folder

**Kind**: instance method of [<code>Kioboard</code>](#Kioboard)  

| Param | Type | Description |
| --- | --- | --- |
| [layoutName] | <code>string</code> | Optional, defaults to the current layoutName |
| callback | <code>function</code> | Passes as argument an object with the loaded layout data |

**Example**  
```js
kio.load("de", (layout) => {
    console.log(`Loaded: layouts/${kio.layoutName}.js layout`, layout);
    kio.show(); // Optionally, show it!
});
```
<a name="Kioboard+setLayers"></a>

### kioboard.setLayers(layers) ⇒ [<code>Kioboard</code>](#Kioboard)
Set/Override layers

**Kind**: instance method of [<code>Kioboard</code>](#Kioboard)  

| Param | Type |
| --- | --- |
| layers | [<code>Layers</code>](#Layers) | 

**Example**  
```js
kio.setLayers({
  smiles: ["🙂 🤓", "😀 😎", "enter"],
  numbers: ["1 2 3", "4 5 6", "7 8 9", "enter 0 backspace"]
});
kio.show("smiles");
```
When in need to set (override + add) already existent layers on
runtime, do it inside the `onLoad()` method's callback,
that way, once the layout file loads, your changes will be overimposed.
```js
const kio = new Kioboard({
  onLoad() {
    kio.setLayers({
      default: ["a b c", "d e f", "shift backspace enter"],
      shift: ["A B C", "D E F", "default backspace enter"]
    });
    kio.show("default");
  }
});
```
<a name="Kioboard+addLayers"></a>

### kioboard.addLayers(layers) ⇒ [<code>Kioboard</code>](#Kioboard)
Add new layers to existing ones

**Kind**: instance method of [<code>Kioboard</code>](#Kioboard)  

| Param | Type |
| --- | --- |
| layers | [<code>Layers</code>](#Layers) | 

**Example**  
```js
kio.addLayers({
  smiles: ["🙂 🤓", "😀 😎", "enter"],
  numbers: ["1 2 3", "4 5 6", "7 8 9", "enter 0 backspace"]
});
kio.show("smiles");
```
When in need to add already existent layers on
runtime, do it inside the `onLoad()` method's callback,
that way, once the layout file loads, your changes will be overimposed.
```js
const kio = new Kioboard({
  onLoad() {
    kio.addLayers({
      default: ["a b c", "d e f", "shift backspace enter"],
      shift: ["A B C", "D E F", "default backspace enter"]
    });
    kio.show("default");
  }
});
```
<a name="Kioboard+setActions"></a>

### kioboard.setActions(actions) ⇒ [<code>Kioboard</code>](#Kioboard)
Convert actions to Emitter events

**Kind**: instance method of [<code>Kioboard</code>](#Kioboard)  

| Param | Type | Default |
| --- | --- | --- |
| actions | [<code>Actions</code>](#Actions) | <code>{}</code> | 

**Example**  
```js
kio.setActions({
  Smile: () => console.log("😀"),
  Sad: () => console.log("😞"),
});
```
After defining an action you can then use it in your Layout like:
```js
default: ["a b c", "d e f", "Smile Sad backspace enter"]
```
<a name="Kioboard+setIcons"></a>

### kioboard.setIcons(icons) ⇒ [<code>Kioboard</code>](#Kioboard)
Override existing icons

**Kind**: instance method of [<code>Kioboard</code>](#Kioboard)  

| Param | Type | Default |
| --- | --- | --- |
| icons | [<code>Icons</code>](#Icons) | <code>{}</code> | 

**Example**  
```js
kio.setIcons({
  Smile: "😀",
  Sad: "😞",
});
```
After defining an icon you can then use it in your Layout like:
```js
deault: ["a b c", "d e f", "Smile Sad backspace enter"]
```
<a name="Kioboard+addIcons"></a>

### kioboard.addIcons(icons) ⇒ [<code>Kioboard</code>](#Kioboard)
Add new icons to existing ones

**Kind**: instance method of [<code>Kioboard</code>](#Kioboard)  

| Param | Type |
| --- | --- |
| icons | [<code>Icons</code>](#Icons) | 

**Example**  
```js
kio.addIcons({
  Smile: "😀",
  Sad: "😞",
});
```
After adding an icon you can then use it in your Layout like:
```js
deault: ["a b c", "d e f", "Smile Sad backspace enter"]
```
<a name="Kioboard+on"></a>

### kioboard.on(keys, callback) ⇒ [<code>Kioboard</code>](#Kioboard)
Add a custom action callback

**Kind**: instance method of [<code>Kioboard</code>](#Kioboard)  

| Param | Type | Description |
| --- | --- | --- |
| keys | <code>string</code> \| <code>Array.&lt;string&gt;</code> | Space-delimited Key-action names i.e: "X x enter" or ["X", "x", "enter"] |
| callback | [<code>ActionFunction</code>](#ActionFunction) | Callback triggered on key down |

**Example**  
```js
kio.on("enter", function (key) {
    // Does what enter key does (default action for "enter") but also:
    console.log(key, this);
});
```
// PS: anonymous functions (callbacks) cannot be off-ed. Use a function expression instead:
```js
const logKey = function(key) {
  console.log(key, this); // Logs i.e: "A", Kioboard
};
kio.on(["a", "A"], logKey);
// kio.off(["a", "A"], logKey); // Can be off-ed when necessary
```
<a name="Kioboard+off"></a>

### kioboard.off(keys, callback) ⇒ [<code>Kioboard</code>](#Kioboard)
Off callbacks (or a specific one) from a set of keys

**Kind**: instance method of [<code>Kioboard</code>](#Kioboard)  

| Param | Type | Description |
| --- | --- | --- |
| keys | <code>string</code> \| <code>Array.&lt;string&gt;</code> | Space-delimited Key-action names i.e: "X x enter" or Array ["X", "x", "enter"] |
| callback | [<code>ActionFunction</code>](#ActionFunction) \| <code>undefined</code> | Optional, Callback to remove. If callback is not present all actions will be removed for that key |

**Example**  
```js
// Remove all actions calbacks
kio.off("X"); 
```
```js
// Remove only a specific callback
kio.off("X", myXKeyCallback); 
```
<a name="Kioboard+emit"></a>

### kioboard.emit(keys) ⇒ [<code>Kioboard</code>](#Kioboard)
Trigger specific key-name action/s
If a key-action exists it will trigger that action
otherwise the key-name will be inserted at caret position
inside the input element

**Kind**: instance method of [<code>Kioboard</code>](#Kioboard)  

| Param | Type | Description |
| --- | --- | --- |
| keys | <code>string</code> \| <code>Array.&lt;string&gt;</code> | Space-delimited Key-action names i.e: "X x enter" or Array ["X", "x", "enter"] |

**Example**  
```js
kio.emit("X"); // Trigger the X key
kio.emit("X Y Z enter"); // Trigger multiple keys
kio.emit(["X", "enter"]); // Trigger multiple keys
```
<a name="Kioboard+sequence"></a>

### kioboard.sequence(keys, speed, callback) ⇒ <code>function</code>
Automatically emit keys in a typing fashion / sequence

**Kind**: instance method of [<code>Kioboard</code>](#Kioboard)  
**Returns**: <code>function</code> - Call the returned function to stop the loop  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| keys | <code>string</code> \| <code>Array.&lt;string&gt;</code> |  |  |
| speed | <code>number</code> | <code>100</code> | Emitting speed in milliseconds |
| callback | <code>function</code> |  | Callback called on finish |

**Example**  
```js
kio.sequence("X z Y"); // Trigger in succession every N ms
// Or: do someting on finish:
const stop = kio.sequence("X Y Z enter", 150, () => { console.log("Done!"); });
// stop(); // call the returned function to prematurely stop the sequencer loop.
```
<a name="Kioboard+clearKioboard"></a>

### kioboard.clearKioboard() ⇒ [<code>Kioboard</code>](#Kioboard)
Remove children elements

**Kind**: instance method of [<code>Kioboard</code>](#Kioboard)  
**Example**  
```js
kio.clearKioboard();
```
<a name="Kioboard+drawButtons"></a>

### kioboard.drawButtons() ⇒ [<code>Kioboard</code>](#Kioboard)
drawButtons the keyboard buttons
Creates the kioboard buttons given the current layer

**Kind**: instance method of [<code>Kioboard</code>](#Kioboard)  
**Example**  
```js
kio.drawButtons()
```
<a name="Kioboard+shift"></a>

### kioboard.shift([state]) ⇒ [<code>Kioboard</code>](#Kioboard)
Increment-loop or set shiftState

**Kind**: instance method of [<code>Kioboard</code>](#Kioboard)  

| Param | Type | Description |
| --- | --- | --- |
| [state] | <code>number</code> | Default: loop state. Defined: shift states (0=Off 1=On 2=Caps-lock) |

<a name="Kioboard+changeLayer"></a>

### kioboard.changeLayer([layerName]) ⇒ [<code>Kioboard</code>](#Kioboard)
Change layer  
Set layer and draw buttons

**Kind**: instance method of [<code>Kioboard</code>](#Kioboard)  

| Param | Type | Description |
| --- | --- | --- |
| [layerName] | <code>string</code> | Default: this.layerNameInitial |

**Example**  
```js
kio.changeLayer().show(); // Change to initial layer (initialization options)
kio.changeLayer("numpad").show();
```
<a name="Kioboard+setTheme"></a>

### kioboard.setTheme(theme) ⇒ [<code>Kioboard</code>](#Kioboard)
Change theme styles as defined in CSS or that theme

**Kind**: instance method of [<code>Kioboard</code>](#Kioboard)  

| Param | Type | Description |
| --- | --- | --- |
| theme | <code>string</code> | Theme name |

**Example**  
```js
kio.setTheme("dark");
```
<a name="Kioboard+show"></a>

### kioboard.show([layerName]) ⇒ [<code>Kioboard</code>](#Kioboard)
Show the keyboard.
Also acts as a shorthand for kio.changeLayer("someLayerName").show()

**Kind**: instance method of [<code>Kioboard</code>](#Kioboard)  

| Param | Type | Description |
| --- | --- | --- |
| [layerName] | <code>string</code> | The layerName to show |

**Example**  
```js
// Show kioboard
kio.show(); 
// Show kioboard with a specific layerName
kio.show("numpad");
// Set a layerName and show it
kio.changeLayer("default").show(); 
// Apply CapsLock and show the "shift" shift layer
this.shift(2).show("shift");
```
<a name="Kioboard+hide"></a>

### kioboard.hide() ⇒ [<code>Kioboard</code>](#Kioboard)
Hide the keyboard

**Kind**: instance method of [<code>Kioboard</code>](#Kioboard)  
**Example**  
```js
kio.hide();
```
<a name="Kioboard+handleShow"></a>

### kioboard.handleShow(evt)
Event handler for showing the keyboard

**Kind**: instance method of [<code>Kioboard</code>](#Kioboard)  

| Param | Type |
| --- | --- |
| evt | <code>PointerEvent</code> | 

<a name="Kioboard+handleHide"></a>

### kioboard.handleHide(evt)
Event handler for hiding the keyboard

**Kind**: instance method of [<code>Kioboard</code>](#Kioboard)  

| Param | Type |
| --- | --- |
| evt | <code>PointerEvent</code> | 

<a name="Kioboard+handleKeyDown"></a>

### kioboard.handleKeyDown(evt)
Event handler for keyboard keydown events
for Kioboard buttons

**Kind**: instance method of [<code>Kioboard</code>](#Kioboard)  

| Param | Type |
| --- | --- |
| evt | <code>PointerEvent</code> | 

<a name="Kioboard+handleKeyUp"></a>

### kioboard.handleKeyUp(evt)
Event handler for keyboard keyup events

**Kind**: instance method of [<code>Kioboard</code>](#Kioboard)  

| Param | Type |
| --- | --- |
| evt | <code>PointerEvent</code> | 

<a name="Kioboard+hasSelection"></a>

### kioboard.hasSelection() ⇒ <code>boolean</code>
Check if input has a selection highlight

**Kind**: instance method of [<code>Kioboard</code>](#Kioboard)  
**Example**  
```js
const hasHighlghtedText = kio.hasSelection();
```
<a name="Kioboard+setRange"></a>

### kioboard.setRange(val, from, to) ⇒ [<code>Kioboard</code>](#Kioboard)
Set the caret position

**Kind**: instance method of [<code>Kioboard</code>](#Kioboard)  

| Param | Type |
| --- | --- |
| val | <code>string</code> | 
| from | <code>number</code> | 
| to | <code>number</code> | 

<a name="Kioboard+insert"></a>

### kioboard.insert(val, from, to)
Insert value at caret position.
Respects also the input's maxlength.

**Kind**: instance method of [<code>Kioboard</code>](#Kioboard)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| val | <code>string</code> | <code>&quot;\&quot;\&quot;&quot;</code> | Text to insert at caret position or highlighted section |
| from | <code>number</code> | <code>this.input.selectionStart</code> |  |
| to | <code>number</code> | <code>this.input.selectionEnd</code> |  |

**Example**  
```js
kio.insert(".com");
```
<a name="Kioboard+init"></a>

### kioboard.init() ⇒ [<code>Kioboard</code>](#Kioboard)
Initializes kioboard and assign events

**Kind**: instance method of [<code>Kioboard</code>](#Kioboard)  
**Example**  
```js
kio.destroy();
kio.init();
```
<a name="Kioboard+destroy"></a>

### kioboard.destroy() ⇒ [<code>Kioboard</code>](#Kioboard)
Remove kioboard (from DOM) and its events

**Kind**: instance method of [<code>Kioboard</code>](#Kioboard)  
**Example**  
```js
kio.destroy();
kio.init();
```
<a name="pointerId"></a>

## pointerId
**Kind**: global variable  

| Param | Type | Description |
| --- | --- | --- |
| pointerId | <code>number</code> | The pointer ID (-1 when no pointer) |

<a name="key"></a>

## key
**Kind**: global variable  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The last pressed key |

<a name="el"></a>

## el(sel, [par]) ⇒ <code>HTMLElement</code>
DOM helper - Get one DOM element

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| sel | <code>string</code> | Selector |
| [par] | <code>HTMLElement</code> | Optional parent defaults to window.document |

<a name="els"></a>

## els(sel, [par]) ⇒ <code>NodeList</code>
DOM helper - Get multiple DOM elements

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| sel | <code>string</code> | Selector |
| [par] | <code>HTMLElement</code> | Optional parent defaults to window.document |

<a name="elNew"></a>

## elNew(tag, [prop]) ⇒ <code>HTMLElement</code>
DOM helper - Create new DOM element

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| tag | <code>string</code> | Tag name |
| [prop] | <code>Object</code> | Optional element properties |

<a name="keysArray"></a>

## keysArray(keys) ⇒ <code>Array.&lt;string&gt;</code>
Convert a string or array of strings - to array

**Kind**: global function  

| Param | Type |
| --- | --- |
| keys | <code>string</code> \| <code>Array.&lt;string&gt;</code> | 

<a name="ActionFunction"></a>

## ActionFunction : <code>function</code>
Object with action callbacks which function name matches the key name @param {string} key the pressed key name

**Kind**: global typedef  
<a name="Actions"></a>

## Actions : <code>Object.&lt;string, ActionFunction&gt;</code>
Object with action callbacks where the key matches the key-name

**Kind**: global typedef  
<a name="LayerRows"></a>

## LayerRows : <code>Array.&lt;(string\|Array)&gt;</code>
The rows with keys like ["q w e", "a s d", ...]

**Kind**: global typedef  
<a name="Layers"></a>

## Layers : <code>Object.&lt;string, LayerRows&gt;</code>
Object with layer names (as keys) and rows as Array

**Kind**: global typedef  
<a name="Icon"></a>

## Icon : <code>Object.&lt;string, string&gt;</code>
String character, Unicode or SVG

**Kind**: global typedef  
<a name="Icons"></a>

## Icons : <code>Object.&lt;string, Icon&gt;</code>
**Kind**: global typedef  
<a name="Layout"></a>

## Layout : <code>Object.&lt;string, any&gt;</code>
Object with three specific (yet optional) keys:

**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| layers | [<code>Layers</code>](#Layers) | 
| actions | [<code>Actions</code>](#Actions) | 
| icons | [<code>Icons</code>](#Icons) | 

<a name="KeyDownCallback"></a>

## KeyDownCallback : <code>function</code>
Callback triggered on key press

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The pressed key-name |

<a name="KeyUpCallback"></a>

## KeyUpCallback : <code>function</code>
Callback triggered on key release

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The released key-name |


___

&copy; 2024-present — Roko C. Buljan