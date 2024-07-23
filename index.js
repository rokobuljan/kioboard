import "./src/kioboard.css";
import Kioboard from "./src/kioboard.js";
import en from "./src/layouts/en.js";

const el = (sel, par = document) => par.querySelector(sel);
const els = (sel, par = document) => par.querySelectorAll(sel);

const elChar = el("#char");
const char = (ch) => {
    if (ch.codePointAt(1)) {
        return;
    }
    elChar.textContent = ch;
    elChar.classList.add("is-visible");
};

// const customLayout = {
//     name: "custom",
//     layers: {
//         default: ["1 2 3 L2", "shift a b enter", "smile space"],
//         shift: ["! ? . ,", "shift A B enter", "smile space"],
//         emoji: ["😀 🤓 🤭 😁", "🥰 🙂 😎 enter", "default space"],
//     },
//     icons: {
//         smile: "😀",
//     },
//     actions: {
//         smile() { this.show("emoji"); },
//         a() { console.log(1); }
//     },
// };
// const kio = new Kioboard({
//  theme: "flat-dark",
//  layout: customLayout
// }).show();

const kio = new Kioboard({
    parent: "#kioboard",
    theme: "flat-dark",
    isScroll: false,
    isVisible: true,
    onKeyDown(key) {
        char(key);
    }
});
kio.load(en);

let sequencerStop = null;
const autoType = () => {
    kio.input.value = "";
    sequencerStop = kio.sequence("shift K shift shift i o b o a r d", 500, () => {
        autoType();
        char(kio.key);
    });
};
autoType();

addEventListener("pointerdown", () => {
    sequencerStop();
    char("K");
});

const elsStyle = els("[data-kio-style]");
elsStyle.forEach(el => {
    el.addEventListener("input", (evt) => {
        const prop = evt.currentTarget.dataset.kioStyle;
        const val = evt.currentTarget.value;
        kio.setStyle({[prop]: val});
        kio.show();
    });
});

// *************************

const elsTheme = els("[data-kio-theme]");
elsTheme.forEach(el => {
    el.addEventListener("input", (evt) => {
        const theme = evt.currentTarget.value;
        kio.setTheme(evt.currentTarget.value).show();
        elsTheme.forEach(el => el.value = theme);
    });
});

const elsLayouts = els("[data-kio-layout]");
elsLayouts.forEach(el => {
    el.addEventListener("click", () => {
        console.log(123);
        elsLayouts.forEach(el => el.classList.remove("is-active"));
        el.classList.add("is-active");
        kio.load(el.dataset.kioLayout).show();
    });
});
