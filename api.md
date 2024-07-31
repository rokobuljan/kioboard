&larr; [Home](readme.md)
___

# <picture><source media="(prefers-color-scheme: dark)" srcset="src/page/kioboard-logo-dark.svg"><img alt="Kioboard" height="24" src="src/page/kioboard-logo.svg"></picture> Docs
## Classes

<dl>
<dt><a href="#Kioboard">Kioboard</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#load">load(layout, [callback])</a> ⇒ <code><a href="#Kioboard">Kioboard</a></code></dt>
<dd><p>Loads a layout .js file from the layouts/ folder</p>
</dd>
<dt><a href="#setLayout">setLayout(layout)</a> ⇒ <code><a href="#Kioboard">Kioboard</a></code></dt>
<dd><p>Change the layout, set layers, actions, draw buttons</p>
</dd>
<dt><a href="#setActions">setActions(actions)</a> ⇒ <code><a href="#Kioboard">Kioboard</a></code></dt>
<dd><p>Convert actions to Emitter events</p>
</dd>
<dt><a href="#setStyle">setStyle(styles)</a> ⇒ <code><a href="#Kioboard">Kioboard</a></code></dt>
<dd><p>Set CSS styles</p>
</dd>
<dt><a href="#on">on(keys, callback)</a> ⇒ <code><a href="#Kioboard">Kioboard</a></code></dt>
<dd><p>Add a custom action callback</p>
</dd>
<dt><a href="#off">off(keys, callback)</a> ⇒ <code><a href="#Kioboard">Kioboard</a></code></dt>
<dd><p>Off callbacks (or a specific one) from a set of keys</p>
</dd>
<dt><a href="#emit">emit(keys)</a> ⇒ <code><a href="#Kioboard">Kioboard</a></code></dt>
<dd><p>Trigger specific key-name action/s
If a key-action exists it will trigger that action
otherwise the key-name will be inserted at caret position
inside the input element</p>
</dd>
<dt><a href="#sequence">sequence(keys, speed, callback)</a> ⇒ <code>function</code></dt>
<dd><p>Automatically emit keys in a typing fashion / sequence</p>
</dd>
<dt><a href="#clearKioboard">clearKioboard()</a> ⇒ <code><a href="#Kioboard">Kioboard</a></code></dt>
<dd><p>Remove children elements</p>
</dd>
<dt><a href="#draw">draw()</a> ⇒ <code><a href="#Kioboard">Kioboard</a></code></dt>
<dd><p>Draw the keyboard buttons
Creates the kioboard buttons given the current layout&#39;s layer</p>
</dd>
<dt><a href="#shift">shift([state])</a> ⇒ <code><a href="#Kioboard">Kioboard</a></code></dt>
<dd><p>Increment-loop or set shiftState</p>
</dd>
<dt><a href="#changeLayer">changeLayer(layerName)</a> ⇒ <code><a href="#Kioboard">Kioboard</a></code></dt>
<dd><p>Set layer
Prepare a layer, draw buttons and set kioboard styles.
(Does not show the kioboard)</p>
</dd>
<dt><a href="#setTheme">setTheme(theme)</a> ⇒ <code><a href="#Kioboard">Kioboard</a></code></dt>
<dd><p>Change theme styles as defined in CSS or that theme</p>
</dd>
<dt><a href="#show">show([layerName])</a> ⇒ <code><a href="#Kioboard">Kioboard</a></code></dt>
<dd><p>Show the keyboard.
If layerName argument is provided, acts as a shorthand
for kio.changeLayer(&quot;someLayerName&quot;).show()</p>
</dd>
<dt><a href="#hide">hide()</a> ⇒ <code><a href="#Kioboard">Kioboard</a></code></dt>
<dd><p>Hide the keyboard</p>
</dd>
<dt><a href="#handleShow">handleShow(evt)</a></dt>
<dd><p>Event handler for showing the keyboard
Does not show the keyboard if the input is disabled</p>
</dd>
<dt><a href="#handleHide">handleHide()</a></dt>
<dd><p>Event handler for hiding the keyboard</p>
</dd>
<dt><a href="#handleKeyDown">handleKeyDown(evt)</a></dt>
<dd><p>Event handler for keyboard keydown events
for Kioboard buttons</p>
</dd>
<dt><a href="#handleKeyUp">handleKeyUp(evt)</a></dt>
<dd><p>Event handler for keyboard keyup events</p>
</dd>
<dt><a href="#hasSelection">hasSelection()</a> ⇒ <code>boolean</code></dt>
<dd><p>Check if input has a selection highlight</p>
</dd>
<dt><a href="#setRange">setRange(val, from, to)</a> ⇒ <code><a href="#Kioboard">Kioboard</a></code></dt>
<dd><p>Set the caret position</p>
</dd>
<dt><a href="#insert">insert(val, from, to)</a></dt>
<dd><p>Insert value at caret position.
Respects also the input&#39;s maxlength.</p>
</dd>
<dt><a href="#init">init()</a> ⇒ <code><a href="#Kioboard">Kioboard</a></code></dt>
<dd><p>Initializes kioboard and assign events</p>
</dd>
<dt><a href="#destroy">destroy()</a> ⇒ <code><a href="#Kioboard">Kioboard</a></code></dt>
<dd><p>Remove kioboard (from DOM) and its events</p>
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
<dt><a href="#Layout">Layout</a> : <code>Object</code></dt>
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
**Kind**: global class  
<a name="new_Kioboard_new"></a>

### new Kioboard()
Kioboard

<a name="load"></a>

## load(layout, [callback]) ⇒ [<code>Kioboard</code>](#Kioboard)
Loads a layout .js file from the layouts/ folder

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| layout | [<code>Layout</code>](#Layout) \| <code>string</code> | Layout Object, or path to layout file |
| [callback] | <code>function</code> | Passes as argument an object with the loaded layout data |

**Example**  
```js
kio.load(myCustomLayout).show();
```
```js
kio.load("./layouts/en.js", (layout) => {
    console.log(`Loaded: en.js layout`, layout);
    kio.show();
});
```
<a name="setLayout"></a>

## setLayout(layout) ⇒ [<code>Kioboard</code>](#Kioboard)
Change the layout, set layers, actions, draw buttons

**Kind**: global function  

| Param | Type |
| --- | --- |
| layout | [<code>Layout</code>](#Layout) | 

**Example**  
```js
const customLayout = {
  name: "custom",
  layers: {
    default: ["1 2 3 4", "shift a b enter", "smile space"],
    shift: ["! ? . ,", "shift A B enter", "smile space"],
    smile: ["😀 🤓 🤭 😁", "🥰 🙂 😎 enter", "default space"],
  },
  icons: {
    smile: "😀",
  },
  actions: {
    smile() { this.show("smile"); },
  },
};

const kio = new Kioboard({
  theme: "flat-dark"
});
kio.setLayout(customLayout).show();
```
```js
import myLayout from './layouts/myKioLayout.js';
import en from '@rbuljan/kioboard/dist/layouts/en.js';

const kio = new Kioboard({
  theme: "flat-dark"
});
kio.setLayout(myLayout).show();
// kio.setLayout(en).show();
```
<a name="setActions"></a>

## setActions(actions) ⇒ [<code>Kioboard</code>](#Kioboard)
Convert actions to Emitter events

**Kind**: global function  

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
<a name="setStyle"></a>

## setStyle(styles) ⇒ [<code>Kioboard</code>](#Kioboard)
Set CSS styles

**Kind**: global function  

| Param | Type |
| --- | --- |
| styles | <code>Object</code> | 

**Example**  
```js
kio.style({
  hue: 194,
  saturation: 94,
  lightness: 49,
  alpha: 1,
  radius: 0.3,
  gap: 0.3,
  size: 2,
  color: "currentColor",
  background: "hsl(0 0% 90% / 1)",
  backgroundBtn: "hsl(0 0% 100% / 1)",
  shadow: "inset 0 -1px 0 hsl(0 0% 0% / 0.3)",
});
```
<a name="on"></a>

## on(keys, callback) ⇒ [<code>Kioboard</code>](#Kioboard)
Add a custom action callback

**Kind**: global function  

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
kio.off(["a", "A"], logKey); // Can be off-ed when necessary
```
<a name="off"></a>

## off(keys, callback) ⇒ [<code>Kioboard</code>](#Kioboard)
Off callbacks (or a specific one) from a set of keys

**Kind**: global function  

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
<a name="emit"></a>

## emit(keys) ⇒ [<code>Kioboard</code>](#Kioboard)
Trigger specific key-name action/s
If a key-action exists it will trigger that action
otherwise the key-name will be inserted at caret position
inside the input element

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| keys | <code>string</code> \| <code>Array.&lt;string&gt;</code> | Space-delimited Key-action names i.e: "X x enter" or Array ["X", "x", "enter"] |

**Example**  
```js
kio.emit("X"); // Trigger the X key
kio.emit("X Y Z enter"); // Trigger multiple keys
kio.emit(["X", "enter"]); // Trigger multiple keys
```
<a name="sequence"></a>

## sequence(keys, speed, callback) ⇒ <code>function</code>
Automatically emit keys in a typing fashion / sequence

**Kind**: global function  
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
<a name="clearKioboard"></a>

## clearKioboard() ⇒ [<code>Kioboard</code>](#Kioboard)
Remove children elements

**Kind**: global function  
**Example**  
```js
kio.clearKioboard();
```
<a name="draw"></a>

## draw() ⇒ [<code>Kioboard</code>](#Kioboard)
Draw the keyboard buttons
Creates the kioboard buttons given the current layout's layer

**Kind**: global function  
**Example**  
```js
kio.draw()
```
<a name="shift"></a>

## shift([state]) ⇒ [<code>Kioboard</code>](#Kioboard)
Increment-loop or set shiftState

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [state] | <code>number</code> | <code>Kioboard.shiftState</code> | Default: loop state. Defined: shift states (0=Off 1=On 2=Caps-lock) |

<a name="changeLayer"></a>

## changeLayer(layerName) ⇒ [<code>Kioboard</code>](#Kioboard)
Set layer
Prepare a layer, draw buttons and set kioboard styles.
(Does not show the kioboard)

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| layerName | <code>string</code> | Default: this.layerNameInitial |

**Example**  
```js
kio.changeLayer().show(); // Change to initial layer (initialization options)
kio.changeLayer("numpad").show();
```
<a name="setTheme"></a>

## setTheme(theme) ⇒ [<code>Kioboard</code>](#Kioboard)
Change theme styles as defined in CSS or that theme

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| theme | <code>string</code> | Theme name |

**Example**  
```js
kio.setTheme("dark");
```
<a name="show"></a>

## show([layerName]) ⇒ [<code>Kioboard</code>](#Kioboard)
Show the keyboard.
If layerName argument is provided, acts as a shorthand
for kio.changeLayer("someLayerName").show()

**Kind**: global function  

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
<a name="hide"></a>

## hide() ⇒ [<code>Kioboard</code>](#Kioboard)
Hide the keyboard

**Kind**: global function  
**Example**  
```js
kio.hide();
```
<a name="handleShow"></a>

## handleShow(evt)
Event handler for showing the keyboard
Does not show the keyboard if the input is disabled

**Kind**: global function  

| Param | Type |
| --- | --- |
| evt | <code>Event</code> | 

<a name="handleHide"></a>

## handleHide()
Event handler for hiding the keyboard

**Kind**: global function  
<a name="handleKeyDown"></a>

## handleKeyDown(evt)
Event handler for keyboard keydown events
for Kioboard buttons

**Kind**: global function  

| Param | Type |
| --- | --- |
| evt | <code>PointerEvent</code> | 

<a name="handleKeyUp"></a>

## handleKeyUp(evt)
Event handler for keyboard keyup events

**Kind**: global function  

| Param | Type |
| --- | --- |
| evt | <code>PointerEvent</code> | 

<a name="hasSelection"></a>

## hasSelection() ⇒ <code>boolean</code>
Check if input has a selection highlight

**Kind**: global function  
**Example**  
```js
const hasHighlghtedText = kio.hasSelection();
```
<a name="setRange"></a>

## setRange(val, from, to) ⇒ [<code>Kioboard</code>](#Kioboard)
Set the caret position

**Kind**: global function  

| Param | Type |
| --- | --- |
| val | <code>string</code> | 
| from | <code>number</code> | 
| to | <code>number</code> | 

<a name="insert"></a>

## insert(val, from, to)
Insert value at caret position.
Respects also the input's maxlength.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| val | <code>string</code> |  | Text to insert at caret position or highlighted section |
| from | <code>number</code> | <code>this.input.selectionStart</code> |  |
| to | <code>number</code> | <code>this.input.selectionEnd</code> |  |

**Example**  
```js
kio.insert(".com");
```
<a name="init"></a>

## init() ⇒ [<code>Kioboard</code>](#Kioboard)
Initializes kioboard and assign events

**Kind**: global function  
**Example**  
```js
kio.destroy();
kio.init();
```
<a name="destroy"></a>

## destroy() ⇒ [<code>Kioboard</code>](#Kioboard)
Remove kioboard (from DOM) and its events

**Kind**: global function  
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

## Layout : <code>Object</code>
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