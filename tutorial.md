
&larr; [Home](readme.md)
___

# <picture><source media="(prefers-color-scheme: dark)" srcset="src/page/kioboard-logo-dark.svg"><img alt="Kioboard" height="24" src="src/page/kioboard-logo.svg"></picture> Tutorial

## Creating Layouts

A layout is made of layers, actions and icons.  

### Layers

Let's create a custom layers-set.  
Every layer Object **must** have a *`"default"`* layer name, so let's add one

### The *default* layer

```js
const myLayers = { // Layers set
    default: [],    // layer
    // more layers here
};
```

populate the array with strings representing the keyboard rows top to bottom.  
Delimit your key-names with *space*:

```js
const myLayers = {
    default: [
        "a b c",
        "d e",
    ],
};
```

> ***Tip:*** This (arguably less readable) array format is also valid:
>
> ```js
> default: [
>   ["a", "b", "c"],
>   ["d", "e"],
> ],
> ```

Congratulations, you made your first layout!  
Now you can pass it to the constructor options:

```js
const kio = new Kioboard({
    layers: myLayers
});
```

and tap an `<input data-kioboard>` or `<textarea data-kioboard></textarea>` in order to open your Kioboard!  

### The *shift* layer

Let's learn about another special layer, the  ***"shift"*** layer.  
Create a `"shift"` property and set the uppercase key-names:

```js
const myLayers = {
    default: [
        "a b c"
        "d e"
    ],
    shift: [
        "A B C"
        "D E"
    ],
};
```

When the **"default"** layer opens, we need a way to switch to that special **"shift"** layer — and back.
Add a special **common action-key** called `"shift"` (case-sensitive!) in both layers:

```js
const myLayers = {
    default: [
        "a b c",
        "shift d e", //+
    ],
    shift: [
        "A B C",
        "shift D E", //+
    ],
};
```

Nice! Now you're able to switch back anf forth the `"default"` and `"shift"` layers, with caps-lock feature included out of the box!

> ***Tip:*** Instead of using the action-key `"shift"` in the *"shift"* layer, you can also use the `"default"` action-key, but then you would lose the Caps-lock feature.

Besides the `"shift"` there are plenty of other **common action-keys** at your disposition:

### Common actions

| Action-key   | Action                                                  |
| ------------ | ------------------------------------------------------- |
| `default`    | Switch to "default" layer                              |
| `shift`      | Toggle between "default" and "shift" layers, caps-lock |
| `space`      | Insert a space                                          |
| `enter`      | Submit form, or add a newline in TextArea               |
| `backspace`  | Delete selection or character on the left of the caret  |
| `delete`     | Delete selection or character on the right of the caret |
| `arrowLeft`  | Move caret to the left                                  |
| `arrowRight` | Move caret to the right                                 |
| `tab`        | Insert a tab                                            |
| `close`      | Close, hide Kioboard                                    |
| `drag`       | Drag handler to move the Kioboard                       |

> ***Tip:*** all those common actions are included by default into every layout. Can be overridden.  

Let's add some of those common action-keys as well:

```js
const myLayers = {
    default: [
        "a b c backspace", //+
        "shift d e enter", //+
        "space",    //+
    ],
    shift: [
        "A B C backspace", //+
        "shift D E enter", //+
        "space",    //+
    ],
};
```

Let's add a **third layer** to your set.  
Finally, you can name any additional layer whatever you like. Let's name it for example: `myExtras`, and let's add some keys.

Also, create some keys like i.e: `"extras"` and add them to the `"default"` and `"shift"` layers rows as well. Those butons will be used to open that `"myExtras"` layer

```js
const myLayers = {
    default: [
        "a b c backspace",
        "shift d e enter",
        "extras space", //+
    ],
    shift: [
        "A B C backspace",
        "shift D E enter",
        "extras space", //+
    ],
    myExtras: [            //+
        "! $ & backspace", //+
        "% # * enter",     //+
        "default space",   //+ Notice the common Default action-key
    ],                     //+
};
```

**But, how to open that `myExtras` layer?**   
Clicking the `"extras"` buttons the string *`"extras"`* is inserted literally into the input. Besides having learned how to output a word preatty easily, this is clearly not what we want.
We need to assign to that key-name a **custom action**.

## Actions

As we've seen, every key-name is inserted literally into the target input element as a string. To override such behavior we use **actions**.  
Actions are callback functions which name **must be equal** (case-sensitive) to the key-name.

### Creating  actions

Let's create a key-action for that `"extras"` button.
Define a `myActions` Object with a property matching exactly the key-name `"extras"`.  
Inside that function call the Kioboard's `.show()` method with the desired template name as argument:

```js
const myActions = {
    extras() {
        this.show("myExtras");
    },
    // More custom actions here
};
```

> ***Tip:*** if you prefer Arrow functions, instead of `this` use your `kio` instance:
> ```js
> const myActions = {
>     extras: () => kio.show("myExtras"),
> };
> ```

Register your `myActions` Object to your Kioboard configuration `actions` propety:

```js
const kio = new Kioboard({
    layers: myLayers,
    actions: myActions, //+
});
```

Now, when you hit the `"extras"` button - your layer will show up.  

> ***Tip:*** The common action `"space"` is used to insert a space into the input element, because we internally use spaces as a delimiter, separator for the layer's rows key-names strings.

### Icons

There's just a small detail to fix: that funky *"extras"* icon-text on the button key. Let's change its *icon*.

Create an Object `myIcons` with a property name matching exactly your key-action name, and define the desired SVG or text or an emoji for your button - and pass it as well to your Kioboard constructor's `icons` property.

```js
// ...
const myIcons = {
    extras: `⚙️`,
    // Add more custom icons here
};

const kio = new Kioboard({
    layers: myLayers,
    actions: myActions,
    icons: myIcons,
});
```

> ***Tip:***  
> ```js
> // besides
> extras: `⚙️`,
> // multiple symbols:
> extras: `#%!`,
> // you can also use SVG:
> extras: `<svg>...</svg>`,
> // or Unicode code points:
> extras: `\u2699`,
> ```

The final code:

```js
const myLayers = {
    default: [
        "a b c backspace",
        "shift d e enter",
        "extras space",
    ],
    shift: [
        "A B C backspace",
        "shift D E enter",
        "extras space",
    ],
    myExtras: [
        "! $ & backspace",
        "% # * enter",
        "default space",
    ]
};

const myActions = {
    extras() {
        this.show("myExtras");
    },
};

const myIcons = {
    extras: `⚙️`,
};

const kio = new Kioboard({
    layers: myLayers,
    actions: myActions,
    icons: myIcons,
});
```

You should now have a good understanding on how to create custom Kioboard layouts.

> ***Tip:*** if you need to add actions to numeric keys or keys starting with a number, use the bracket syntax:  
> ```js
> ["1"]() {
>     console.log("One!"); // Do something here...
>     // PS: "1" will not be inserted as value into the input   
> }
> ```
> ***Tip:*** Since assigning an **action** prevents the key's default behavior — `return` a desired string:
> ```js
> ["1"]() {
>     console.log("One!"); // Do something here...
>     return "1"; // "1" value is inserted at caret position
> }
> ```
> ***Tip*** if you want to call an key-action instead, use the .emit() method
> ```js
> ["1"]() {
>     console.log("One!"); // Do something here...
>     this.emit("default"); // Emit a common action (switch to default layer)
>     // Just don't use: this.emit("1"); or you'll end up in an endless loop.
> }
> ```


___

## CSS styling

Coming soon