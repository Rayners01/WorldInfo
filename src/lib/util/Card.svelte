<script>
import { getDarkMode } from "../../store.js";


export let title;
export let body;
export let link;

const bg = getDarkMode() ? "#2b4154" : "#7893ab";
</script>

<style>
div {
    background-color: var(--bg);
    padding: 20px;
    display: inline-block;
    text-align: center;
    border-radius: 10px;
    margin: 10px;
    max-width: 500px;
}

a {
    text-decoration: none;
    color: inherit;
}
</style>

<a href={link}>
<div style="--bg: {bg}">
    <h2>{title}</h2>
    <p>{body}</p>
</div>
</a>