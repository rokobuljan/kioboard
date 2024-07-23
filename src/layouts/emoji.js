/**
 * Emoji faces
 * @author Kioboard
 */
export default {
    name: "emoji",
    layers: {
        emoji: [
            "🙂 😀 😁 😂 😄 😉 😊 😋 😎 🤓",
            "😘 😍 🥰 🥲 🤗 🤩 🤔 🤨 😐 😑",
            "😶 🙄 😏 😣 😥 😮 😯 😫 🥱 ☹️",
            "😖 😞 😢 😭 😦 😩 🤯 😇 🤫 🤭",
            "default backspace enter",
        ]
    },
    actions: {
        emoji() {
            this.show("emoji");
        },
    },
    icons: {
        emoji: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><path style="fill-rule: evenodd;" d="M24,6A18,18,0,1,1,6,24,18,18,0,0,1,24,6Zm0,3A15,15,0,1,1,9,24,15,15,0,0,1,24,9ZM15,28a11.25,11.25,0,0,0,18,0l-0.6-1.5A30.548,30.548,0,0,1,24,28a30.548,30.548,0,0,1-8.4-1.5Zm3-11a3,3,0,1,1-3,3A3,3,0,0,1,18,17Zm12,0a3,3,0,1,1-3,3A3,3,0,0,1,30,17Z"/></svg>`,
    },
};;
