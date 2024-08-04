import emoji from "./emoji.js";
import numpad from "./numpad.js";

/**
 * English
 * @author Kioboard
 */
export default {
    name: "en",
    layers: {
        default: [
            "drag 1 2 3 4 5 6 7 8 9 0 backspace delete close",
            "q w e r t y u i o p -",
            "tab a s d f g h j k l enter",
            "shift z x c v b n m , . @ .com",
            "emoji numpad space arrowLeft arrowRight",
        ],
        shift: [
            "drag \u0022 ! # $ % & * ( ) + ? backspace delete close",
            "Q W E R T Y U I O P _",
            "tab A S D F G H J K L enter",
            "shift Z X C V B N M ; : @ .com",
            "emoji numpad space arrowLeft arrowRight",
        ],
        ...emoji.layers,
        ...numpad.layers,
    },
    actions: {
        ...emoji.actions,
        ...numpad.actions,
    },
    icons: {
        ...emoji.icons,
        ...numpad.icons,
    },
    menu: {
        "m": "a b \u0022 g h j",
        ",": "1 2 3 4 5 6 7 8 9 a b c d e q w e r t",
        ".": "! . \u0022 \\ ' , # $ % & * ( ) + ?"
    }
};
