<script lang="ts">
    import ShortcutInput from './ShortcutInput.svelte';

    export let modules: { hotkeyManager: IHotkeyManager; storage: IStorage };
    export let shortcuts: Shortcut[];

    const { hotkeyManager, storage } = modules;

    function add(type: ShortcutType) {
        shortcuts = [...shortcuts, { type, key: '' }];
        storage.write({ shortcuts });
    }

    function edit(item: Shortcut, newValue: string) {
        const shortcut = shortcuts.find((i) => i === item);

        if (shortcut) {
            shortcut.key = newValue;
            storage.write({ shortcuts });
        }
    }

    function remove(item: Shortcut) {
        shortcuts = shortcuts.filter((i) => i !== item);
        storage.write({ shortcuts });
    }
</script>

<div class="container">
    <div class="shortcuts">
        {#each shortcuts as shortcut}
            <ShortcutInput
                label={`Shortcut navigate to the ${
                    shortcut.type === 'nextUrl' ? 'next' : 'prev'
                } page`}
                modules={{ hotkeyManager }}
                shortcut={shortcut.key}
                on:change={(event) => edit(shortcut, event.detail)}
                on:remove={() => remove(shortcut)}
            />
        {/each}
    </div>
    <div class="addButtons">
        <button on:click={() => add('prevUrl')}>Add ⇦</button>
        <button on:click={() => add('nextUrl')}>Add ⇨</button>
    </div>
</div>

<style>
    .container {
        max-width: 540px;
        margin: 0 auto;
    }

    .shortcuts {
        display: grid;
    }

    .addButtons {
        display: flex;
        justify-content: space-between;
    }

    .addButtons button {
        background: none;
        border: none;
        cursor: pointer;
        background-color: #eee;
        padding: 6px 12px;
        border-radius: 6px;
    }

    .addButtons button:hover {
        background-color: #ddd;
    }
</style>
