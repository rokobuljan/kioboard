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
            "tab q w e r t z u i o p š đ ž -",
            "a s d f g h j k l č ć enter",
            "shift y x c v b n m , . @ .com",
            "emoji numpad space arrowLeft arrowRight"
        ],
        shift: [
            "drag ! # $ % & * ( ) + ? backspace delete close",
            "tab Q W E R T Z U I O P Š Đ Ž _",
            "A S D F G H J K L Č Ć enter",
            "shift Y X C V B N M ; : @ .com",
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
        s: "s š ß",
        S: "S Š",
        z: "z ž",
        Z: "Z Ž",
        c: "c ć č",
        C: "C Ć Č",
        d: "d đ",
        D: "D Đ",
    }
};
