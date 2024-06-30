import emoji from "./emoji.js";
import numpad from "./numpad.js";

/**
 * French
 * @author Kioboard
 */
export default {
    layers: {
        default: [
            "drag 1 2 3 4 5 6 7 8 9 0 backspace delete close",
            "tab a z e r t y u i o p _",
            "q s d f g h j k l m é è enter",
            "shift w x c v b n ç à ; : @ .com",
            "emoji numpad space arrowLeft arrowRight"
        ],
        shift: [
            "drag ! # $ % & * ( ) + ? backspace delete close",
            "tab A Z E R T Y U I O P _",
            "Q S D F G H J K L M É È enter",
            "shift W X C V B N Ç À ; : @ .com",
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
};
