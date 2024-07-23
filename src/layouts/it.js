import emoji from "./emoji.js";
import numpad from "./numpad.js";
export default {
    name: "it",
    layers: {
        default: [
            "drag 1 2 3 4 5 6 7 8 9 0 - backspace delete close",
            "q w e r t y u i o p è ì é !",
            "tab a s d f g h j k l ò à ù ó enter",
            "shift z x c v b n m , . @ .com",
            "emoji numpad space arrowLeft arrowRight"
        ],
        shift: [
            "drag # $ % & * ( ) / | + _ backspace delete close",
            "Q W E R T Y U I O P È Ì É ?",
            "tab A S D F G H J K L Ò À Ù Ó enter",
            "shift Z X C V B N M ; : @ .com",
            "emoji numpad space arrowLeft arrowRight"
        ],
        ...emoji.layers,
        ...numpad.layers
    },
    actions: {
        ...emoji.actions,
        ...numpad.actions
    },
    icons: {
        ...emoji.icons,
        ...numpad.icons
    }
};
