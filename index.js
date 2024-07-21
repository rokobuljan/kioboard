import "./src/kioboard.css";
import Kioboard from "./src/kioboard.js";
import en from "./src/layouts/en.js";

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

// const kio = new Kioboard({
//     theme: "flat-dark",
//     layout: customLayout
// }).show();

const kio = new Kioboard({
  theme: "flat-dark",
});
kio.set(customLayout).show();
console.log(kio);


// *************************

const elLang = document.querySelector("#layout");
elLang.addEventListener("change", (evt) => {
    kio.load(evt.currentTarget.value);
    kio.show();
});

document.querySelector("#theme").addEventListener("change", (evt) => {
    kio.setTheme(evt.currentTarget.value).show();
});

// document.querySelector("#input").addEventListener("input", (evt) => {
//     console.log(kio.key);
// });
