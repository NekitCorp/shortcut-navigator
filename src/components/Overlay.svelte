<script lang="ts">
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    function prevClick() {
        dispatch("prev");
    }

    function nextClick() {
        dispatch("next");
    }
</script>

<div class="overlay">
    <button on:click={prevClick}>⇦</button>
    <button on:click={nextClick}>⇨</button>
</div>

<style>
    .overlay {
        position: fixed;
        width: 80px;
        bottom: 16px;
        left: 16px;
        background-color: rgba(255, 255, 255, 0.3);
        border: 1px dashed rgba(0, 0, 0, 0.3);
        padding: 8px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        z-index: 9999;
    }

    button {
        background-color: transparent;
        border-radius: 3px;
        border: 1px solid black;
        cursor: pointer;
    }

    button:hover {
        background-color: #eee;
    }
</style>
