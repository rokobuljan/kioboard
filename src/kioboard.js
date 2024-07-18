import "./kioboard.css";
import Emitter from "./emitter.js";

/**
 * DOM helper - Get one DOM element
 * @param {string} sel Selector
 * @param {HTMLElement=} par Optional parent defaults to window.document
 * @returns {HTMLElement}
 */
const el = (sel, par = document) => par.querySelector(sel);

/**
 * DOM helper - Get multiple DOM elements
 * @param {string} sel Selector
 * @param {HTMLElement=} par Optional parent defaults to window.document
 * @returns {NodeList}
 */
const els = (sel, par = document) => par.querySelectorAll(sel);

/**
 * DOM helper - Create new DOM element
 * @param {string} tag Tag name
 * @param {Object=} prop Optional element properties
 * @returns {HTMLElement}
 */
const elNew = (tag, prop) => Object.assign(document.createElement(tag), prop);

/**
 * Convert a string or array of strings - to array
 * @param {string|Array<string>} keys
 * @returns {Array<string>}
 */
const keysArray = (keys) => {
    if (!Array.isArray(keys)) {
        keys = keys.trim().split(/ +/g);
    }
    return keys;
}

/**
 * Kioboard
 */
class Kioboard {

    /** @typedef {function} ActionFunction Object with action callbacks which function name matches the key name @param {string} key the pressed key name */
    /** @typedef {Object<string, ActionFunction>} Actions Object with action callbacks where the key matches the key-name */
    /** @typedef {Array<string | Array>} LayerRows The rows with keys like ["q w e", "a s d", ...] */
    /** @typedef {Object<string, LayerRows>} Layers Object with layer names (as keys) and rows as Array */
    /** @typedef {Object<string, string>} Icon String character, Unicode or SVG */
    /** @typedef {Object<string, Icon>} Icons */
    /**
     * @typedef {Object.<string, any>} Layout
     * Object with three specific (yet optional) keys:
     * @property {Layers} layers
     * @property {Actions} actions
     * @property {Icons} icons
     */
    /**
     * Callback triggered on key press
     * @callback KeyDownCallback
     * @param {string} key The pressed key-name
     */
    /**
     * Callback triggered on key release
     * @callback KeyUpCallback
     * @param {string} key The released key-name
     */

    /**
     * Common actions
     * Those are non-trivial to write and grasp, so every 
     * layout will inherit those actions. The user 
     * can override each of these in their own layout.
     * @static
     * @type {Actions}
     */
    static commonActions = {
        default() {
            this.show("default");
        },
        shift() {
            this.shift().show("shift");
        },
        space: () => " ",
        enter() {
            if (this.input.tagName === "TEXTAREA") {
                this.insert("\u000d");
            } else {
                this.hide();
                if (this.isEnterSubmit) this.input.form?.submit();
            }
        },
        backspace() {
            const i = this.input.selectionStart - (this.hasSelection() ? 0 : 1);
            this.insert("", i);
        },
        delete() {
            this.insert("", this.input.selectionStart, this.input.selectionEnd + (this.hasSelection() ? 0 : 1));
        },
        arrowLeft() {
            const i = this.input.selectionStart - (this.hasSelection() ? 0 : 1);
            this.insert("", i, i);
        },
        arrowRight() {
            const i = this.input.selectionEnd + (this.hasSelection() ? 0 : 1)
            this.insert("", i, i);
        },
        tab: () => "\u0009",
        close() {
            this.hide();
        },
        drag() {
            this.drag();
        },
    };

    /**
     * Beautifully crafted Kioboard icons.
     * The user can override any of those from their own layouts.
     * @static
     * @type {Icons}
     */
    static commonIcons = {
        space: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><path d="M8,28H40V20H37v5H11V20H8v8Z"/></svg>`,
        tab: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><path style="fill-rule: evenodd;" d="M4,18H24V8L43,24,24,40V30H4V18Zm3,3H27V15l11,9L27,33V27H7V21ZM45,38H42V10h3V38Z"/></svg>`,
        arrowLeft: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><path style="fill-rule:evenodd;" d="M32,8L12,24,32,40V8ZM17,24l12,9V15Z"/></svg>`,
        arrowRight: `<svg xmlns="http://www.w3.org/2000/svg" transform="scale(-1,1)" width="48" height="48" viewBox="0 0 48 48"><path style="fill-rule:evenodd;" d="M32,8L12,24,32,40V8ZM17,24l12,9V15Z"/></svg>`,
        delete: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><path d="M12.9,15.616H7.269V32.043H12.9a9.471,9.471,0,0,0,4.467-1.012,7.193,7.193,0,0,0,2.978-2.86,8.59,8.59,0,0,0,1.05-4.319,8.722,8.722,0,0,0-1.05-4.342,7.155,7.155,0,0,0-2.978-2.883A9.476,9.476,0,0,0,12.9,15.616h0ZM12.786,29.243H10.5V18.393h2.285a5.176,5.176,0,0,1,3.924,1.447A5.567,5.567,0,0,1,18.1,23.853a5.44,5.44,0,0,1-1.385,3.977,5.248,5.248,0,0,1-3.924,1.412h0Zm22.923-4a6.98,6.98,0,0,0-.8-3.377,5.582,5.582,0,0,0-2.239-2.271,7.14,7.14,0,0,0-6.614.023A5.7,5.7,0,0,0,23.8,21.97a7.5,7.5,0,0,0-.808,3.554,7.36,7.36,0,0,0,.82,3.53,5.822,5.822,0,0,0,2.285,2.365,6.568,6.568,0,0,0,3.313.836,6.118,6.118,0,0,0,3.855-1.212,5.94,5.94,0,0,0,2.124-3.095H31.9a2.634,2.634,0,0,1-2.562,1.577,2.956,2.956,0,0,1-2.1-.8,3.268,3.268,0,0,1-.97-2.212h9.349a7.954,7.954,0,0,0,.092-1.271h0ZM26.291,24.3a3.282,3.282,0,0,1,1-2.059,2.9,2.9,0,0,1,2.02-.741,3.154,3.154,0,0,1,2.147.765,2.636,2.636,0,0,1,.9,2.036H26.291Zm11.773-9.673V32.043H41.3V14.627H38.064Z"/></svg>`,
        default: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><path style="fill-rule: evenodd;" d="M8,10V35H19l5,5,5-5H40V10H8Zm3,3V32H21l3,3,3-3H37V13H11Zm4,3h3v3H15V16Zm5,0h3v3H20V16Zm5,0h3v3H25V16Zm5,0h3v3H30V16ZM15,21h3v3H15V21Zm5,0h3v3H20V21Zm5,0h3v3H25V21ZM15,26H33v3H15V26Zm15-5h3v3H30V21Z"/></svg>`, // "⌨",
        backspace: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><path style="fill-rule:evenodd;" d="M6,24L16,8H40V40H16Zm4,0,8-13H37V37H18Zm10-6h2l4,4,4-4h2v2l-4,4,4,4v2H30l-4-4-4,4H20V28l4-4-4-4V18Z"/></svg>`,
        shift: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><path d="M30,28v9H18V28H8L24,8,40,28H30ZM14,25h7v9h6V25h7L24,13Z"/></svg>`,
        enter: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><path style="fill-rule:evenodd;" d="M21,8V18H32V11H44V30H21V40L2,24Zm14,6h6V27H18v6L7,24l11-9v6H35V14Z"/></svg>`,
        close: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><path d="M38.849,36.021l-2.828,2.828L24,26.828,11.979,38.849,9.151,36.021,21.172,24,9.151,11.979l2.828-2.828L24,21.172,36.021,9.151l2.828,2.828L26.828,24Z"/></svg>`,
        drag: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><path d="M24,18.443A5.557,5.557,0,1,1,18.443,24,5.557,5.557,0,0,1,24,18.443ZM16,12H32L24,4ZM32,36H16l8,8Zm4-20V32l8-8ZM12,32V16L4,24Z"/></svg>`
    };

    /**
     * @param {Object} options
     * @param {string|NodeList|undefined} options.parent=body - Element to insert kioboard into
     * @param {string|NodeList|HTMLElement|undefined} options.inputs=[data-kioboard]] Selector string, Element or elements. The input(s) to bind to
     * @param {HTMLInputElement|HTMLTextAreaElement} options.input=options.inputs[0]] The currently active input
     * @param {string|undefined} [options.layoutName] The /layouts/<name>.js to use
     * @param {Layers} [options.layers] All layers, layout layers, custom or dynamically added
     * @param {string} options.layerName=default Current layout name
     * @param {string} options.layerNameDefault=default Name definition for "default" layout
     * @param {string} options.layerNameShift=shift Name definition for "shift" layout
     * @param {string} options.theme=default The theme to use. "default|flat|glass" or other
     * @param {Object} options.icons={} Custom icons for keys {keyName: "icon", ...}
     * @param {boolean} options.isEnterSubmit=true Whether to submit on enter (only for HTMLInputElements)
     * @param {KeyDownCallback} options.onKeyDown Callback when a key is pressed
     * @param {KeyUpCallback} options.onKeyUp Callback when a key is released
     * @param {boolean} options.isVisible=false Whether kioboard is visible
     * @param {boolean} options.isAlwaysVisible=false Never hide kioboard
     * @param {number} options.shiftState Shift states: 0=Off 1=On 2=Caps-lock. When 0 the "default" layer will be used
     * @param {function} options.onInit Callback after kioboard instance is initialized
     * @param {function} options.onShow Callback after kioboard is shown
     * @param {function} options.onHide Callback after kioboard is hidden
     * @param {function} options.onLoad Callback after Layout file is loaded
     * @example
     * ```js
     * const kio = new Kioboard({
     *   parent: document.querySelector("#kioboardWrapper"),
     *   layoutName: "hr", // Init with Croatian layout (see available: layouts/ folder)
     *   theme: "flat-dark", // "default"|"default-dark"|"flat"|"flat-dark"
     *   onInit() {
     *     console.log("kioboard initialized!", this);
     *   },
     *   onkeyDown(key) {
     *     console.log("Pressed key", key);
     *   },
     *   onShow() {
     *     console.log("Kioboard shown!");
     *   },
     *   onHide() {
     *     console.log("Kioboard hidden!");
     *   },     
     *   onLoad() {
     *     console.log("Kioboard layout file loaded!");
     *     this.show("default");
     *   },       
     * });
     * ```
     */
    constructor(options) {
        Object.assign(this, {
            parent: "body",
            inputs: "[data-kioboard]",
            theme: "default",
            layoutName: "",
            layerName: "default",
            layerNameDefault: "default",
            layerNameShift: "shift",
            layers: {},
            icons: {},
            isEnterSubmit: true,
            isVisible: false,
            isAlwaysVisible: false,
            longPressTime: 1000,
            longPressTimeMin: 180,
            shiftState: 0,
            elKioboard: elNew("div", { className: "kioboard" }),
            onInit() { },
            onLoad() { },
            onShow() { },
            onHide() { },
            onKeyDown() { },
            onKeyUp() { },
        }, options, {
            /** @param {number} pointerId The pointer ID (-1 when no pointer) */
            pointerId: -1,
            /** @param {string} key The last pressed key */
            key: "",
        });

        if (typeof this.parent === "string") {
            this.parent = el(this.parent);
        }

        if (typeof this.inputs === "string") {
            this.inputs = els(this.inputs);
        }

        this.inputs = !("length" in this.inputs) ? [this.inputs] : [...this.inputs];
        this.input = this.inputs[0]; // The focused input or textarea element

        this.emitter = new Emitter();

        // Extend/override icons with the default common ones
        this.setLayers(this.layers);
        this.setActions(this.actions);
        this.setIcons(this.icons);

        this.layerNameInitial = this.layerName;

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleHide = this.handleHide.bind(this);

        this.init();
    }

    /**
     * Loads a layout .js file from the layouts/ folder
     * @param {string=} layoutName Optional, defaults to the current layoutName
     * @param {function(Layout)} callback Passes as argument an object with the loaded layout data
     * @returns {Kioboard}
     * @example
     * ```js
     * kio.load("de", (layout) => {
     *     console.log(`Loaded: layouts/${kio.layoutName}.js layout`, layout);
     *     kio.show(); // Optionally, show it!
     * });
     * ```
     */
    load(layoutName = this.layoutName, callback) {
        try {
            import(`./layouts/${layoutName}.js`).then(({ default: { layers, actions, icons } }) => {
                layers && this.setLayers(layers);
                actions && this.setActions(actions);
                icons && this.setIcons(icons);
                this.layoutName = layoutName;
                this.changeLayer();
                this.onLoad();
                callback?.call(this, { layers, actions, icons });
            });
        } catch (error) {
            console.error(error);
        }

        return this;
    }

    /**
     * Set/Override layers
     * @param {Layers} layers
     * @returns {Kioboard}
     * @example
     * ```js
     * kio.setLayers({
     *   smiles: ["🙂 🤓", "😀 😎", "enter"],
     *   numbers: ["1 2 3", "4 5 6", "7 8 9", "enter 0 backspace"]
     * });
     * kio.show("smiles");
     * ```
     * When in need to set (override + add) already existent layers on
     * runtime, do it inside the `onLoad()` method's callback,
     * that way, once the layout file loads, your changes will be overimposed.
     * ```js
     * const kio = new Kioboard({
     *   onLoad() {
     *     kio.setLayers({
     *       default: ["a b c", "d e f", "shift backspace enter"],
     *       shift: ["A B C", "D E F", "default backspace enter"]
     *     });
     *     kio.show("default");
     *   }
     * });
     * ```
     */
    setLayers(layers = {}) {
        this.layers = layers;
        return this;
    }

    /**
     * Add new layers to existing ones
     * @param {Layers} layers
     * @returns {Kioboard}
     * @example
     * ```js
     * kio.addLayers({
     *   smiles: ["🙂 🤓", "😀 😎", "enter"],
     *   numbers: ["1 2 3", "4 5 6", "7 8 9", "enter 0 backspace"]
     * });
     * kio.show("smiles");
     * ```
     * When in need to add already existent layers on
     * runtime, do it inside the `onLoad()` method's callback,
     * that way, once the layout file loads, your changes will be overimposed.
     * ```js
     * const kio = new Kioboard({
     *   onLoad() {
     *     kio.addLayers({
     *       default: ["a b c", "d e f", "shift backspace enter"],
     *       shift: ["A B C", "D E F", "default backspace enter"]
     *     });
     *     kio.show("default");
     *   }
     * });
     * ```
     */
    addLayers(layers = {}) {
        Object.assign(this.layers, layers);
        return this;
    }

    /**
     * Convert actions to Emitter events 
     * @param {Actions} actions={}
     * @returns {Kioboard}
     * @example
     * ```js
     * kio.setActions({
     *   Smile: () => console.log("😀"),
     *   Sad: () => console.log("😞"),
     * });
     * ```
     * After defining an action you can then use it in your Layout like:
     * ```js
     * default: ["a b c", "d e f", "Smile Sad backspace enter"]
     * ```
     */
    setActions(actions = {}) {
        Object.entries({ ...Kioboard.commonActions, ...actions }).forEach(([name, callback]) => {
            this.on(name, callback);
        });
        return this;
    }

    // @TODO:
    // addActions(actions = {}) {
    //     Object.assign(this.actions, actions);
    //     return this;
    // }

    /**
     * Override existing icons
     * @param {Icons} icons={}
     * @returns {Kioboard}
     * @example
     * ```js
     * kio.setIcons({
     *   Smile: "😀",
     *   Sad: "😞",
     * });
     * ```
     * After defining an icon you can then use it in your Layout like:
     * ```js
     * deault: ["a b c", "d e f", "Smile Sad backspace enter"]
     * ```
     */
    setIcons(icons = {}) {
        this.icons = { ...Kioboard.commonIcons, ...icons };
        return this;
    }

    /**
     * Add new icons to existing ones
     * @param {Icons}
     * @returns {Kioboard}
     * @example
     * ```js
     * kio.addIcons({
     *   Smile: "😀",
     *   Sad: "😞",
     * });
     * ```
     * After adding an icon you can then use it in your Layout like:
     * ```js
     * deault: ["a b c", "d e f", "Smile Sad backspace enter"]
     * ```
     */
    addIcons(icons = {}) {
        Object.assign(this.icons, icons);
        return this;
    }

    /**
     * Add a custom action callback
     * @param {string|Array<string>} keys Space-delimited Key-action names i.e: "X x enter" or ["X", "x", "enter"]
     * @param {ActionFunction} callback Callback triggered on key down
     * @returns {Kioboard}
     * @example
     * ```js
     * kio.on("enter", function (key) {
     *     // Does what enter key does (default action for "enter") but also:
     *     console.log(key, this);
     * });
     * ```
     * // PS: anonymous functions (callbacks) cannot be off-ed. Use a function expression instead:
     * ```js
     * const logKey = function(key) {
     *   console.log(key, this); // Logs i.e: "A", Kioboard
     * };
     * kio.on(["a", "A"], logKey);
     * // kio.off(["a", "A"], logKey); // Can be off-ed when necessary
     * ```
     */
    on(keys, callback) {
        if (typeof callback === "function") {
            keysArray(keys).forEach((key) => {
                this.emitter.on(key, callback);
            });
        }
        return this;
    }

    /**
     * Off callbacks (or a specific one) from a set of keys
     * @param {string|Array<string>} keys Space-delimited Key-action names i.e: "X x enter" or Array ["X", "x", "enter"]
     * @param {ActionFunction|undefined} callback Optional, Callback to remove. If callback is not present all actions will be removed for that key
     * @returns {Kioboard}
     * @example
     * ```js
     * // Remove all actions calbacks
     * kio.off("X"); 
     * ```
     * ```js
     * // Remove only a specific callback
     * kio.off("X", myXKeyCallback); 
     * ```
     */
    off(keys, callback) {
        keysArray(keys).forEach((key) => {
            this.emitter.off(key, callback);
        });
        return this;
    }

    /**
     * Trigger specific key-name action/s
     * If a key-action exists it will trigger that action
     * otherwise the key-name will be inserted at caret position
     * inside the input element
     * @param {string|Array<string>} keys Space-delimited Key-action names i.e: "X x enter" or Array ["X", "x", "enter"]
     * @returns {Kioboard}
     * @example
     * ```js
     * kio.emit("X"); // Trigger the X key
     * kio.emit("X Y Z enter"); // Trigger multiple keys
     * kio.emit(["X", "enter"]); // Trigger multiple keys
     * ```
     */
    emit(keys) {
        if (!keys) {
            return this;
        }
        keysArray(keys).forEach((key) => {

            this.key = key;

            if (this.emitter.events.has(this.key)) {
                // Run a custom action
                this.emitter.events.get(this.key).forEach(callback => {
                    // If the action value is (as expected) a callback
                    if (!typeof callback === "function") return;
                    // trigger the callback:
                    const returnedValue = callback.call(this, this.key, this);
                    // If callback returns a string, insert it:
                    if (typeof returnedValue === "string") {
                        this.insert(returnedValue);
                    }
                });
            } else {
                // Insert key is the defalt behavior for
                // any key that has no custom action assigned
                this.insert(this.key);
            }

            // Highlight active keys
            const elKeys = els(`[data-kioboard-key="${this.key}"]`, this.elKioboard);
            elKeys.forEach((elKey) => {
                elKey.classList.add("is-active");
                elKey.addEventListener("animationend", () => {
                    elKey.classList.remove("is-active");
                }, { once: true });
            });

            this.input?.dispatchEvent(new Event("input", {
                bubbles: true,
                cancelable: true,
            }));
        });
        return this;
    }

    /**
     * Automatically emit keys in a typing fashion / sequence
     * @param {string|Array<string>} keys
     * @param {number} speed=100 Emitting speed in milliseconds
     * @param {function} callback Callback called on finish
     * @returns {function} Call the returned function to stop the loop
     * @example
     * ```js
     * kio.sequence("X z Y"); // Trigger in succession every 100ms
     * // Or: do someting on finish:
     * const stop = kio.sequence("X Y Z enter", 150, () => { console.log("Done!"); });
     * // stop(); // call the returned function to prematurely stop the sequencer loop.
     * ```
     */
    sequence(keys, speed = 100, callback = () => { }) {
        keys = [...keysArray(keys)];
        let tOut = null;
        const loop = () => {
            if (keys.length === 0) {
                callback.call(this, keys);
                return;
            }
            const key = keys.shift();
            this.emit(key);
            tOut = setTimeout(() => {
                loop();
            }, speed);
        };
        loop(); // Run the loop!
        return () => {
            clearTimeout(tOut);
        };
    }

    /**
     * Remove children elements
     * @returns {Kioboard}
     * @example
     * ```js
     * kio.clearKioboard();
     * ```
     */
    clearKioboard() {
        this.elKioboard.innerHTML = "";
        return this;
    }

    /**
     * drawButtons the keyboard buttons
     * Creates the kioboard buttons given the current layer
     * @returns {Kioboard}
     * @example
     * ```js
     * kio.drawButtons()
     * ```
     */
    drawButtons() {
        // Remove contents
        this.clearKioboard();
        // Create buttons
        this.layers[this.layerName]?.forEach((row, rowIndex) => {
            const elRow = elNew("div");
            elRow.dataset.kioboardRow = rowIndex;
            keysArray(row).forEach((key) => {
                const elButton = elNew("button", {
                    innerHTML: `<span class="kioboard-icon">${Object.hasOwn(this.icons, key) ? this.icons[key] : key}</span>`
                });
                elButton.dataset.kioboardKey = key;
                elRow.append(elButton);
            });
            this.elKioboard.append(elRow);
        });
        return this;
    }

    /**
     * Increment-loop or set shiftState 
     * @param {number=} state Default: loop state. Defined: shift states (0=Off 1=On 2=Caps-lock)
     * @returns {Kioboard}
     */
    shift(state) {
        if (typeof state !== "undefined") {
            this.shiftState = state; // Set state from argument
        } else {
            this.shiftState += 1; // else, increment.
        }
        this.shiftState %= 3;
        return this;
    }

    /**
     * Change layer  
     * Set layer and draw buttons  
     * @param {string=} layerName Default: this.layerNameInitial
     * @returns {Kioboard}
     * @example
     * ```js
     * kio.changeLayer().show(); // Change to initial layer (initialization options)
     * kio.changeLayer("numpad").show();
     * ```
     */
    changeLayer(layerName = this.layerNameInitial) {

        if (layerName !== "shift") {
            this.shift(0); // Reset shift to "off"
        }

        // Handle "default" layer + shift state.
        // Even if layer is set to "default" we need to modify it on the fly
        // to accomodate for the shiftState
        if (layerName === this.layerNameDefault && this.shiftState > 0) {
            layerName = this.layerNameShift;
        }
        // Handle "shift" layer and shift being applied
        else if (layerName === this.layerNameShift) {
            layerName = this.shiftState > 0 ? this.layerNameShift : this.layerNameDefault;
        }


        // Update current layer name
        this.layerName = layerName;

        // Update attributes
        this.elKioboard.dataset.kioboardLayout = this.layoutName;
        this.elKioboard.dataset.kioboardLayer = this.layerName;
        this.elKioboard.dataset.kioboardTheme = this.theme;
        this.elKioboard.classList.toggle("is-shift", this.shiftState === 1);
        this.elKioboard.classList.toggle("is-caps", this.shiftState === 2);

        this.drawButtons();
        return this;
    }

    /**
     * Change theme styles as defined in CSS or that theme
     * @param {string} theme Theme name
     * @returns {Kioboard}
     * @example
     * ```js
     * kio.setTheme("dark");
     * ```
     */
    setTheme(theme) {
        this.theme = theme;
        this.elKioboard.dataset.kioboardTheme = this.theme;
        return this;
    }

    /**
     * Show the keyboard.
     * Also acts as a shorthand for kio.changeLayer("someLayerName").show()
     * @param {string=} layerName The layerName to show
     * @returns {Kioboard}
     * @example
     * ```js
     * // Show kioboard
     * kio.show(); 
     * // Show kioboard with a specific layerName
     * kio.show("numpad");
     * // Set a layerName and show it
     * kio.changeLayer("default").show(); 
     * // Apply CapsLock and show the "shift" shift layer
     * this.shift(2).show("shift");
     * ```
     */
    show(layerName) {
        if (layerName) {
            this.changeLayer(layerName);
        }
        this.elKioboard.classList.add("is-visible");
        this.input?.focus();

        this.input.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
        // PS: use CSS to adjust the top spacing using i.e: scroll-margin-top: "2em";

        addEventListener("pointerdown", this.handleHide, { capture: true });
        this.isVisible = true;
        this.onShow();
        return this;
    }

    /**
     * Hide the keyboard
     * @returns {Kioboard}
     * @example
     * ```js
     * kio.hide();
     * ```
     */
    hide() {
        if (this.isAlwaysVisible) {
            return this;
        }
        this.elKioboard.classList.remove("is-visible");
        removeEventListener("pointerdown", this.handleHide, { capture: true });
        this.isVisible = false;
        this.onHide();
        return this;
    }

    /**
     * Event handler for showing the keyboard
     * @param {PointerEvent} evt
     */
    handleShow(evt) {
        this.input = evt.target;
        if (!this.isVisible && !this.isAlwaysVisible) {
            this.changeLayer(this.layerNameInitial);
        }
        this.show();
    }

    /**
     * Event handler for hiding the keyboard
     * @param {PointerEvent} evt
     */
    handleHide(evt) {
        // Don't hide if button is pressed (eventual layer switch)
        const elButton = evt.target.closest("[data-kioboard-key]");
        const isOwnButton = this.elKioboard.contains(elButton);

        const elKioboard = evt.target.closest(".kioboard");
        if (elKioboard === this.elKioboard || isOwnButton) {
            return;
        }
        const isTargetOwnInput = this.inputs.includes(evt.target);
        if (isTargetOwnInput) {
            return;
        }

        this.hide();
    }

    /**
     * Hold key - handler
     * Emits key-name at intervals whilst the key is held pressed
     * @private
     * @param {string} key Key-name
     * @returns {void}
     */
    #holdKeyHandler(key) {
        if (["shift", "drag"].includes(key)) {
            return;
        }
        this.heldTimeout = setTimeout(() => {
            this.emit(key);
            this.#holdKeyHandler(key); // Loop
        }, this.heldTimeout ? 100 : 1000);
    }

    /**
     * Hold key - end
     * @private
     * @returns {void}
     */
    #holdKeyEnd() {
        clearTimeout(this.heldTimeout);
        this.heldTimeout = null;
    }

    /**
     * Event handler for keyboard keydown events
     * for Kioboard buttons
     * @param {PointerEvent} evt
     */
    handleKeyDown(evt) {
        if (this.pointerId > -1) return;  // We already have a pointer down
        this.pointerId = evt.pointerId;

        const elButton = evt.target.closest("[data-kioboard-key]");
        const isOwnButton = this.elKioboard.contains(elButton);

        if (!isOwnButton) {
            return;
        }

        evt.preventDefault();
        this.elKioboard.setPointerCapture(evt.pointerId);

        // INPUT!
        const key = elButton.dataset.kioboardKey;

        // Insert key or run its assigned action callback
        this.emit(key);
        this.#holdKeyHandler(key);

        // Reset to default keyboard if shift is at state 1
        if (this.shiftState === 1 && !["shift", "close"].includes(key)) {
            this.shift(0).show(this.layerNameDefault);
        }

        // Dispatch keyboard event to input
        this.input.dispatchEvent(new KeyboardEvent("keydown", { "key": key }));
        this.onKeyDown(key);
    }

    /**
     * Event handler for keyboard keyup events
     * @param {PointerEvent} evt
     */
    handleKeyUp(evt) {
        // Not the pointer we're interested in (Probable mistouch or 2nd pointer is down)
        if (evt.pointerId !== this.pointerId) return;
        this.elKioboard.releasePointerCapture(evt.pointerId);

        this.pointerId = -1;

        this.#holdKeyEnd();

        const elButton = evt.target.closest("[data-kioboard-key]");
        if (!elButton) return;
        const key = elButton.dataset.kioboardKey;

        // Dispatch keyboard event to input
        this.input.dispatchEvent(new KeyboardEvent("keyup", { "key": key }));
        this.onKeyUp(key);
    }

    /**
     * Check if input has a selection highlight
     * @returns {boolean}
     * @example
     * ```js
     * const hasHighlghtedText = kio.hasSelection();
     * ```
     */
    hasSelection() {
        return this.input.selectionEnd - this.input.selectionStart > 0;
    }

    /**
     * Set the caret position
     * @param {string} val
     * @param {number} from
     * @param {number} to
     * @returns {Kioboard}
     */
    setRange(val, from, to) {
        this.input.setSelectionRange(from + val.length, to + val.length);
        return this;
    }

    /**
     * Insert value at caret position.
     * Respects also the input's maxlength.
     * @param {string} val="" Text to insert at caret position or highlighted section
     * @param {number} from=this.input.selectionStart
     * @param {number} to=this.input.selectionEnd
     * @example
     * ```js
     * kio.insert(".com");
     * ```
     */
    insert(val = "", from = this.input.selectionStart, to = this.input.selectionEnd) {
        from = Math.max(0, from);
        let newValue = this.input.value.substring(0, from) + val + this.input.value.substring(to, this.input.value.length);
        const maxLength = this.input.getAttribute("maxlength");
        if (maxLength && newValue.length > Number(maxLength)) {
            newValue = newValue.substring(0, Number(maxLength));
        }
        this.input.value = newValue;
        this.input.focus();
        this.setRange(val, from, from);
        return this;
    }

    _preventDefault(evt) {
        evt.preventDefault();
    }

    _dragOffset = { x: 0, y: 0 }

    drag() {
        this.elKioboard.classList.add("kioboard-moving");
        const onDrag = (evt) => {
            evt.preventDefault();
            this._dragOffset.x += evt.movementX;
            this._dragOffset.y += evt.movementY;
            this.elKioboard.style.translate = `${this._dragOffset.x}px ${this._dragOffset.y}px`;
        };
        addEventListener("pointermove", onDrag);
        addEventListener("pointerup", () => {
            removeEventListener("pointermove", onDrag);
            this.elKioboard.classList.remove("kioboard-dragging");
        });
        return this;
    }

    /** 
     * Initializes kioboard and assign events
     * @returns {Kioboard}
     * @example
     * ```js
     * kio.destroy();
     * kio.init();
     * ```
     */
    init() {
        this.parent.append(this.elKioboard);

        // Attach events
        this.inputs.forEach((elem) => elem.addEventListener("pointerdown", this.handleShow));
        this.elKioboard.addEventListener("pointerdown", this.handleKeyDown);
        this.elKioboard.addEventListener("pointerup", this.handleKeyUp);
        this.elKioboard.addEventListener("pointercancel", this.handleKeyUp);
        this.elKioboard.addEventListener("contextmenu", this._preventDefault);

        // Fixup shift state % 3
        this.shift(this.shiftState);

        // If initialized with a layoutName, load it!
        if (this.layoutName) {
            this.load(); // Load and change layout
        }
        // Change to custom layer
        else {
            this.changeLayer();
        }

        if (this.isVisible || this.isAlwaysVisible) {
            this.show();
        }

        this.onInit();
        return this;
    }

    /**
     * Remove kioboard (from DOM) and its events
     * @returns {Kioboard}
     * @example
     * ```js
     * kio.destroy();
     * kio.init();
     * ```
     */
    destroy() {
        // Detach events
        this.inputs.forEach((elem) => {
            elem.removeEventListener("pointerdown", this.handleShow);
        });
        this.elKioboard.removeEventListener("pointerdown", this.handleKeyDown);
        this.elKioboard.removeEventListener("pointerup", this.handleKeyUp);
        this.elKioboard.removeEventListener("pointercancel", this.handleKeyUp);
        this.elKioboard.removeEventListener("contextmenu", this._preventDefault);
        this.elKioboard.remove();
        return this;
    }
}

export default Kioboard;
