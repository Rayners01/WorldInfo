<script>
import { getThemeStore } from "../../store.js";


export let title;
export let body;
export let link;
//export let img_path;

let bg = "";

getThemeStore().subscribe(theme => bg = theme ? "#2b4154" : "#7893ab");
</script>

<style>
div {
    background-color: var(--bg);
    padding: 20px;
    display: inline-block;
    text-align: center;
    border-radius: 10px;
    margin: 10px;
    width: 360px;
    height: 110px;
}

a {
    text-decoration: none;
    color: inherit;
}

/*img {
    width: 80%;
}*/
</style>

<a href={link}>
<div style="--bg: {bg}">
    <h2>{title}</h2>
    <p>{body}</p>
    <!-- <img src={img_path} alt={title}> -->
</div>
</a>