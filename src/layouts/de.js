import emoji from "./emoji.js";
import numpad from "./numpad.js";

/**
 * German
 * @author Kioboard
 */
export default {
    name: "de",
    layers: {
        default: [
            "drag 1 2 3 4 5 6 7 8 9 0 backspace delete close",
            "q w e r t z u i o p ü ß -",
            "tab a s d f g h j k l ö ä enter",
            "shift y x c v b n m , . @ .com",
            "emoji numpad space arrowLeft arrowRight"
        ],
        shift: [
            "drag ! # $ % & * ( ) + ? backspace delete close",
            "Q W E R T Z U I O P Ü ẞ _",
            "tab A S D F G H J K L Ö Ä enter",
            "shift Y X C V B N M ; : @ .com",
            "emoji numpad space arrowLeft arrowRight"
        ],
        ...emoji.layers,
        ...numpad.layers,
    },
    actions: {
        ["ẞ"]: () => "SS",
        ...emoji.actions,
        ...numpad.actions,
    },
    icons: {
        ...emoji.icons,
        ...numpad.icons,
    },
};
