import { get, writable } from "svelte/store";

const stored = Boolean(JSON.parse(localStorage.getItem("dark")));

console.log(stored);

export const theme = writable(stored || false);

let themeDuplicate = get(theme);

export const getDarkMode = () => {
    return themeDuplicate;
}

theme.subscribe((val) => {
    if (val) {
      window.document.body.classList.add('dark-mode')
    } else {
      window.document.body.classList.remove('dark-mode')
    }
    themeDuplicate = val;
    localStorage.setItem("dark", JSON.stringify(val));
});