import { get, writable } from "svelte/store";

const stored = Boolean(JSON.parse(localStorage.getItem("dark")));

export const theme = writable(stored ? stored : true);

export const code = writable("");

export const getCode = () => {
    return code;
}

export const getDarkMode = () => {
    return get(theme);
}

export const getThemeStore = () => {
    return theme;
}

theme.subscribe((val) => {
    if (val) {
      window.document.body.classList.add('dark-mode')
    } else {
      window.document.body.classList.remove('dark-mode')
    }
    localStorage.setItem("dark", JSON.stringify(val));
});