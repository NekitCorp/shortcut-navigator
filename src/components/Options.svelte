<script lang="ts">
    import FeedbackForm from './FeedbackForm.svelte';
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

    function gelLabel(type: ShortcutType): string {
        switch (type) {
            case 'nextUrl':
                return 'Shortcut navigate to the next page';
            case 'prevUrl':
                return 'Shortcut navigate to the previous page';
            case 'nextUrlBlank':
                return 'Shortcut navigate to the next page in a new tab';
            case 'prevUrlBlank':
                return 'Shortcut navigate to the previous page in a new tab';
            default:
                ASSERT_EXHAUSTIVE(type);
        }
    }
</script>

<div class="container">
    <div class="shortcuts">
        <h1>Keyboard shortcuts</h1>
        {#each shortcuts as shortcut}
            <ShortcutInput
                label={gelLabel(shortcut.type)}
                modules={{ hotkeyManager }}
                shortcut={shortcut.key}
                on:change={(event) => edit(shortcut, event.detail)}
                on:remove={() => remove(shortcut)}
            />
        {/each}
        <div class="addButtons">
            <button on:click={() => add('prevUrlBlank')}>Add ⇦ in a new tab</button>
            <button on:click={() => add('prevUrl')}>Add ⇦</button>
            <div class="delimiter" />
            <button on:click={() => add('nextUrl')}>Add ⇨</button>
            <button on:click={() => add('nextUrlBlank')}>Add ⇨ in a new tab</button>
        </div>
    </div>

    <hr />

    <div class="feedbackForm">
        <FeedbackForm initUrl="" />
    </div>

    <hr />
</div>

<style>
    .container {
        max-width: 540px;
        margin: 0 auto;
    }

    h1 {
        font-size: 1.3em;
    }

    hr {
        margin: 3em 0;
    }

    .shortcuts {
        display: grid;
    }

    .addButtons {
        display: flex;
        gap: 8px;
    }

    .delimiter {
        flex: 1;
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
