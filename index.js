import "./src/kioboard.css";
import Kioboard from "./src/kioboard.js";
import en from "./src/layouts/en.js";

const customLayout = {
    name: "custom",
    layers: {
        default: ["1 2 3 L2", "shift a b enter", "smile space"],
        shift: ["! ? . ,", "shift A B enter", "smile space"],
        emoji: ["😀 🤓 🤭 😁", "🥰 🙂 😎 enter", "default space"],
    },

    icons: {
        smile: "😀",
    },
    actions: {
        smile() { this.show("emoji"); },
        L2() { this.load(customLayout2).show(); },
        a() { console.log(1);}
    },
};

const customLayout2 = {
    name: "custom",
    layers: {
        default: ["1 2 3 L1", "shift a b enter", "smile space"],
        shift: ["! ? . ,", "shift A B enter", "smile space"],
        emoji: ["😀 🤓 🤭 😁", "🥰 🙂 😎 enter", "default space"],
    },
    icons: {
        smile: "😀",
    },
    actions: {
        smile() { this.show("emoji"); },
        L1() { this.load(customLayout).show(); },
        a() { console.log(22222);}
    },
};

// const kio = new Kioboard({
//  theme: "flat-dark",
//  layout: customLayout
// }).show();

const kio = new Kioboard({
    parent: "#kioboard",
    theme: "flat-dark",
    isScroll: false,
    isPermanent: true
});
kio.load(customLayout);
console.log(kio);


// *************************

const elLang = document.querySelector("#layout");
elLang.addEventListener("change", (evt) => {
    kio.load(evt.currentTarget.value).show();
});

document.querySelector("#theme").addEventListener("change", (evt) => {
    kio.setTheme(evt.currentTarget.value).show();
});

// document.querySelector("#input").addEventListener("input", (evt) => {
//     console.log(kio.key);
// });
