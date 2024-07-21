&larr; [Home](readme.md)
___

# <picture><source media="(prefers-color-scheme: dark)" srcset="kioboard-logo-dark.svg"><img alt="Kioboard" height="24" src="kioboard-logo.svg"></picture> Docs
## Classes

<dl>
<dt><a href="#Kioboard">Kioboard</a></dt>
<dd><p>Kioboard</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#Action">Action</a> ⇒ <code>void</code></dt>
<dd><p>Callback function which function name matches the key name</p>
</dd>
<dt><a href="#Actions">Actions</a> : <code>Object.&lt;string, Action&gt;</code></dt>
<dd><p>Object with Action callbacks</p>
</dd>
<dt><a href="#LayerRows">LayerRows</a> : <code>Array.&lt;(string|Array)&gt;</code></dt>
<dd><p>The rows with keys like [&quot;q w e&quot;, &quot;a s d&quot;, ...]</p>
</dd>
<dt><a href="#Layers">Layers</a> : <code>Object.&lt;string, LayerRows&gt;</code></dt>
<dd><p>Object with layer names (as keys) and rows as Array</p>
</dd>
<dt><a href="#Icons">Icons</a> : <code>Object.&lt;string, string&gt;</code></dt>
<dd></dd>
<dt><a href="#Layout">Layout</a> : <code>Object.&lt;string, any&gt;</code></dt>
<dd></dd>
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
    * [.load([layoutName], [callback])](#Kioboard+load) ⇒ [<code>Kioboard</code>](#Kioboard)
    * [.setLayout(layout)](#Kioboard+setLayout) ⇒ [<code>Kioboard</code>](#Kioboard)
    * [.setActions(actions)](#Kioboard+setActions) ⇒ [<code>Kioboard</code>](#Kioboard)
    * [.on(keys, callback)](#Kioboard+on) ⇒ [<code>Kioboard</code>](#Kioboard)
    * [.off(keys, callback)](#Kioboard+off) ⇒ [<code>Kioboard</code>](#Kioboard)
    * [.emit(keys)](#Kioboard+emit) ⇒ [<code>Kioboard</code>](#Kioboard)
    * [.sequence(keys, speed, callback)](#Kioboard+sequence) ⇒ <code>function</code>
    * [.clearKioboard()](#Kioboard+clearKioboard) ⇒ [<code>Kioboard</code>](#Kioboard)
    * [.drawButtons()](#Kioboard+drawButtons) ⇒ [<code>Kioboard</code>](#Kioboard)
    * [.shift([state])](#Kioboard+shift) ⇒ [<code>Kioboard</code>](#Kioboard)
    * [.changeLayer(layerName)](#Kioboard+changeLayer) ⇒ [<code>Kioboard</code>](#Kioboard)
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
| options.parent | <code>string</code> \| <code>Element</code> \| <code>undefined</code> | <code>&quot;body&quot;</code> | Element to insert kioboard into |
| options.element | <code>HTMLElement</code> |  | Kioboard Element |
| options.inputs | <code>string</code> \| <code>NodeList</code> \| <code>HTMLElement</code> \| <code>HTMLCollection</code> \| <code>undefined</code> | <code>&quot;[data-kioboard]&quot;</code> | Selector string, Element or elements. The input(s) to bind to |
| options.input | <code>HTMLElement</code> | <code>options.inputs[0]</code> | The currently active input |
| options.layerName | <code>string</code> | <code>&quot;default&quot;</code> | Current layout name |
| options.layerNameInitial | <code>string</code> | <code>&quot;default&quot;</code> | Initial layer name |
| options.layerNameDefault | <code>string</code> | <code>&quot;default&quot;</code> | Name definition for "default" layout |
| options.layerNameShift | <code>string</code> | <code>&quot;shift&quot;</code> | Name definition for "shift" layout |
| options.layoutName | <code>string</code> \| <code>undefined</code> |  | The /layouts/<name>.js to use |
| options.layout | [<code>Layout</code>](#Layout) |  | Current layout. Use load() to load a current layout |
| options.theme | <code>string</code> | <code>&quot;default&quot;</code> | The theme to use. "default|flat|glass" or other |
| options.isEnterSubmit | <code>boolean</code> | <code>true</code> | Whether to submit on enter (only for HTMLInputElements) |
| options.isVisible | <code>boolean</code> | <code>false</code> | Whether kioboard is visible |
| options.isPermanent | <code>boolean</code> | <code>false</code> | Never hide kioboard |
| options.shiftState | <code>number</code> |  | Shift states: 0=Off 1=On 2=Caps-lock. When 0 the "default" layer will be used |
| options.key | <code>string</code> |  | The last pressed key |
| options.pointerId | <code>number</code> |  | The pointer ID(-1 when no pointer) |
| options.onInit | <code>function</code> |  | Callback after kioboard instance is initialized |
| options.onShow | <code>function</code> |  | Callback after kioboard is shown |
| options.onHide | <code>function</code> |  | Callback after kioboard is hidden |
| options.onLoad | <code>function</code> |  | Callback after Layout file is loaded |
| options.onKeyDown | [<code>KeyDownCallback</code>](#KeyDownCallback) |  | Callback when a key is pressed |
| options.onKeyUp | [<code>KeyUpCallback</code>](#KeyUpCallback) |  | Callback when a key is released |

**Example**  
```js
const kio = new Kioboard({
  parent: document.querySelector("#kioboardWrapper"),
  layoutName: "hr", // Init with Croatian layout (see available: layouts/ folder)
  theme: "flat-dark", // "default"|"default-dark"|"flat"|"flat-dark"
  onInit() {
    console.log("kioboard initialized!", this);
  },
  onKeyDown(key) {
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
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| default | [<code>Action</code>](#Action) | Show "default" layer |
| shift | [<code>Action</code>](#Action) | Show "shift" layer |
| space | [<code>Action</code>](#Action) | Insert space character |
| enter | [<code>Action</code>](#Action) | Insert Newline (HTMLTextAreaElement) Submit the form (HTMLInputElement) |
| backspace | [<code>Action</code>](#Action) | Remove character or selection on the left of the caret |
| delete | [<code>Action</code>](#Action) | Remove character or selection on the right of the caret |
| arrowLeft | [<code>Action</code>](#Action) | Move caret to the left |
| arrowRight | [<code>Action</code>](#Action) | Move caret to the right |
| tab | [<code>Action</code>](#Action) | Insert tab character |
| close | [<code>Action</code>](#Action) | Close, hide Kioboard |
| drag | [<code>Action</code>](#Action) | Move the Kioboard |

<a name="Kioboard+commonIcons"></a>

### kioboard.commonIcons : [<code>Icons</code>](#Icons)
Beautifully crafted Kioboard icons.
The user can override any of those from their own layouts.

**Kind**: instance property of [<code>Kioboard</code>](#Kioboard)  
<a name="Kioboard+load"></a>

### kioboard.load([layoutName], [callback]) ⇒ [<code>Kioboard</code>](#Kioboard)
Loads a layout .js file from the layouts/ folder

**Kind**: instance method of [<code>Kioboard</code>](#Kioboard)  

| Param | Type | Description |
| --- | --- | --- |
| [layoutName] | <code>string</code> | Optional, defaults to the current layoutName |
| [callback] | <code>function</code> | Passes as argument an object with the loaded layout data |

**Example**  
```js
kio.load("de", (layout) => {
    console.log(`Loaded: layouts/${kio.layoutName}.js layout`, layout);
    kio.show(); // Optionally, show it!
});
```
<a name="Kioboard+setLayout"></a>

### kioboard.setLayout(layout) ⇒ [<code>Kioboard</code>](#Kioboard)
Set the layout

**Kind**: instance method of [<code>Kioboard</code>](#Kioboard)  

| Param | Type |
| --- | --- |
| layout | [<code>Layout</code>](#Layout) | 

**Example**  
```js
kio.setLayout({
  name: "custom",
  layers: {
    default: ["1 2 3 smile", "a b c enter"],
    shift: ["! # ?", "A B C"],
  },
  icons: {
    smile: "😀",
  },
  actions: {
    smile: () => console.log("😀"),
  },
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
<a name="Kioboard+on"></a>

### kioboard.on(keys, callback) ⇒ [<code>Kioboard</code>](#Kioboard)
Add a custom action callback

**Kind**: instance method of [<code>Kioboard</code>](#Kioboard)  

| Param | Type | Description |
| --- | --- | --- |
| keys | <code>string</code> \| <code>Array.&lt;string&gt;</code> | Space-delimited Key-action names i.e: "X x enter" or ["X", "x", "enter"] |
| callback | [<code>Action</code>](#Action) | Callback triggered on key down |

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
| callback | [<code>Action</code>](#Action) \| <code>undefined</code> | Optional, Callback to remove. If callback is not present all actions will be removed for that key |

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

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [state] | <code>number</code> | <code>Kioboard.shiftState</code> | Default: loop state. Defined: shift states (0=Off 1=On 2=Caps-lock) |

<a name="Kioboard+changeLayer"></a>

### kioboard.changeLayer(layerName) ⇒ [<code>Kioboard</code>](#Kioboard)
Change layer  
Set layer and draw buttons

**Kind**: instance method of [<code>Kioboard</code>](#Kioboard)  

| Param | Type | Description |
| --- | --- | --- |
| layerName | <code>string</code> | Default: this.layerNameInitial |

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
| evt | <code>Event</code> | 

<a name="Kioboard+handleHide"></a>

### kioboard.handleHide(evt)
Event handler for hiding the keyboard

**Kind**: instance method of [<code>Kioboard</code>](#Kioboard)  

| Param | Type |
| --- | --- |
| evt | <code>Event</code> | 

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
| val | <code>string</code> |  | Text to insert at caret position or highlighted section |
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
<a name="Action"></a>

## Action ⇒ <code>void</code>
Callback function which function name matches the key name

**Kind**: global typedef  
**this**: <code>{Kioboard}</code>  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | the pressed key name |

<a name="Actions"></a>

## Actions : <code>Object.&lt;string, Action&gt;</code>
Object with Action callbacks

**Kind**: global typedef  
<a name="LayerRows"></a>

## LayerRows : <code>Array.&lt;(string\|Array)&gt;</code>
The rows with keys like ["q w e", "a s d", ...]

**Kind**: global typedef  
<a name="Layers"></a>

## Layers : <code>Object.&lt;string, LayerRows&gt;</code>
Object with layer names (as keys) and rows as Array

**Kind**: global typedef  
<a name="Icons"></a>

## Icons : <code>Object.&lt;string, string&gt;</code>
**Kind**: global typedef  
<a name="Layout"></a>

## Layout : <code>Object.&lt;string, any&gt;</code>
**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| name | <code>string</code> | 
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