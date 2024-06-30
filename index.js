import "./src/kioboard.css";
import Kioboard from "./src/kioboard.js";


// const kio = new Kioboard();
// kio.load("hr");

const myLayout = {
    name: "XXX",
    layers: {
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
            "! $ & backspace 1 \u1234",
            "% # * enter",
            "default space",
        ]
    },
    actions: {
        extras() {
            this.show("myExtras");
        },
    },
    icons: {
        extras: `⚙️`,
    },
};

// const kio = new Kioboard(myLayout);
const kio = new Kioboard({ inputs: ".kio1", layoutName: "en" });
const kio2 = new Kioboard({ inputs: ".kio2", layoutName: "hr", shiftState: 2 });


kio.load("de", (layout) => {
    console.log(`Loaded: layouts/${kio.layoutName}.js layout`, layout);
    kio.show(); // Optionally, show it!
});

// const kio = new Kioboard().load("de", (data) => {
//     console.log(`loaded`, kio, data);
// });


// *************************

const elLang = document.querySelector("#layout");
elLang.addEventListener("change", (evt) => {
    kio.load(evt.currentTarget.value);
    kio.show();
    //const text = `T h i s space i s space ${[...elLang.options[elLang.selectedIndex].text].join(" ")} enter`;
    //kio.emit(text);
});

document.querySelector("#theme").addEventListener("change", (evt) => {
    kio.setTheme(evt.currentTarget.value).show();
});

// document.querySelector("#input").addEventListener("input", (evt) => {
//     console.log(kio.key);
// });


// const kio = new Kioboard({
//     inputs: "[data-kioboard]", // selector, Element, Element[], collection or NodeList
//     parent: "body", // selector or Element
//     theme: "default",
//     layoutName: "en",
//     layerName: "default",
//     shiftState: 0, // 0=Off 1=On 2=Caps-lock
//     isenterSubmit: true, // for <input> only
//     isAlwaysVisible: false,
//     isVisible: false,
//     // onShow() {
//     //     // console.log("Kioboard visible");
//     // },
//     // onHide() {
//     //     // console.log("Kioboard hidden");
//     // },
//     onShow() {
//         //console.log(this.input);
//     },
//     onHide() {
//         //console.log(this.layers);
//     },
//     onKeyDown(key) {
//         // console.log(key);
//     },
//     onKeyUp(key) {
//         // console.log(key + " up");
//     },
//     onLoad() {
//         // Layout file is loaded
//         // themes are ready to be used / manipulated
//     }
// });

// document.querySelector("input").addEventListener("change", (evt) => {
//     console.log(evt.currentTarget.value);
// });




// kio.on("x X enter", function (key) {
//     console.log(`Pressed key ${key}`);
// });

// const ggg = function () {
//     console.log("enterrrrr");
// };

// kio.on("enter", ggg, true);

// const actionKeys_yY = function (key) {
//     console.log(key, this);
// }
// kio.on(["y", "Y"], actionKeys_yY);

// setTimeout(() => {
//     kio.off("enter");
// }, 3000);




