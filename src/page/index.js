import Kioboard from "../kioboard.js";
import en from "../layouts/en.js";

const el = (sel, par = document) => par.querySelector(sel);
const els = (sel, par = document) => par.querySelectorAll(sel);
const elNew = (tag, prop) => Object.assign(document.createElement(tag), prop);

const elChar = el("#char");
const char = (ch) => {
    if (ch.codePointAt(1)) {
        return;
    }
    const elCh = elNew("div", {
        className: "ch",
        textContent: ch,
    });
    elChar.append(elCh);
    elCh.classList.add("is-visible");
    elCh.addEventListener("animationend", () => elCh.remove());
};

const myLayout = {
    name: "custom",
    layers: {
        default: [
            "1 2 3 4",
            "shift a b enter",
            "smile space",
        ],
        shift: [
            "! ? . ,",
            "shift A B enter",
            "smile space",
        ],
        emoji: [
            "😀 🤓 🤭 😁",
            "🥰 🙂 😎 enter",
            "default space"
        ],
    },
    icons: {
        smile: "😀",
    },
    actions: {
        smile() { this.show("emoji"); },
    },
};

const kio = new Kioboard({
    parent: "#kioboard",
    theme: "flat-dark",
    isScroll: false,
    isVisible: true,
    onKeyDown(key) {
        char(key);
    },
});
kio.load(en);


/**
 * Auto type
 */
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
}, { once: true });

/**
 * Styles
 */
const elsStyle = els("[data-kio-style]");
const elStyleOutput = el(`[data-kio-code="styles"]`);
const stylesOutput = () => {
    const styles = "kio.setStyles({\n" + [...elsStyle].reduce((str, el) => {
        str += `  ${el.dataset.kioStyle}: "${el.value}",\n`;
        return str;
    }, "") + "});";
    delete elStyleOutput.dataset.highlighted;
    elStyleOutput.textContent = styles;
    hljs.highlightElement(elStyleOutput);
}
elsStyle.forEach(el => {
    el.addEventListener("input", (evt) => {
        evt.preventDefault();
        const prop = evt.currentTarget.dataset.kioStyle;
        const val = evt.currentTarget.value;
        kio.setStyle({ [prop]: val });
        stylesOutput();
        kio.show();
    });
});
stylesOutput();

/**
 * Themes
 */
const elsTheme = els("[data-kio-theme]");
const elThemeOutput = el(`[data-kio-code="theme"]`);
const themeOutput = (theme) => {
    delete elThemeOutput.dataset.highlighted;
    elThemeOutput.textContent = `kio.setTheme("${theme}")`;
    hljs.highlightElement(elThemeOutput);
};
elsTheme.forEach(el => {
    el.addEventListener("input", (evt) => {
        const theme = evt.currentTarget.value;
        kio.setTheme(evt.currentTarget.value).show();
        themeOutput(kio.theme ?? "default");
        elsTheme.forEach(el => el.value = theme);
    });
});
themeOutput("default");

/**
 * Layouts
 */
const elsLayouts = els("[data-kio-layout]");
elsLayouts.forEach(el => {
    el.addEventListener("click", () => {
        elsLayouts.forEach(el => el.classList.remove("is-active"));
        el.classList.add("is-active");
        kio.load(`./layouts/${el.dataset.kioLayout}.js`).show();
    });
});

/**
 * Custom layout
 */
els("[data-kioboard]").forEach(el => {
    el.addEventListener("pointerdown", () => {
        if (kio.layout !== myLayout && kio.input.id === "kio-layout-custom") {
            kio.load(myLayout);
        }
        else if (kio.layout === myLayout && kio.input.id !== "kio-layout-custom") {
            kio.load(en);
        }
    });
});

/**
 * Init
 */
els("input, textarea").forEach(input => {
    input.setAttribute('autocomplete', 'off');
    input.setAttribute('autocorrect', 'off');
    input.setAttribute('autocapitalize', 'off');
    input.setAttribute('spellcheck', false);
});