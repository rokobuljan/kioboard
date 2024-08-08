import emoji from "./emoji.js";
import numpad from "./numpad.js";

/**
 * Croatian
 * @author Kioboard
 */
export default {
    name: "hr",
    layers: {
        default: [
            "drag 1 2 3 4 5 6 7 8 9 0 backspace delete close",
            "tab q w e r t z u i o p",
            "a s d f g h j k l č ć enter",
            "shift < y x c v b n m , .",
            "emoji numpad space arrowLeft arrowRight"
        ],
        shift: [
            "drag ! ? # $ % & ( ) - + backspace delete close",
            "tab Q W E R T Z U I O P",
            "A S D F G H J K L Č Ć enter",
            "shift > Y X C V B N M ; :",
            "emoji numpad space arrowLeft arrowRight"
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
        e: "€ &",
        E: "€ &",
        s: "š ß $",
        S: "Š ß $",
        z: "ž",
        Z: "Ž",
        c: "ć č",
        C: "Ć Č",
        d: "đ",
        D: "Đ",
        "<": "> < [ ] { } ( ) | \\ / \" ' # $ % & = + - _ ! ? ; : . ° @ *",	
        ">": "< > [ ] { } ( ) | \\ / \" ' # $ % & = + - _ ! ? ; : . ° @ *",	
        ".": "; : ! ?",	
        ":": ". : ! ?",	
    }
};
