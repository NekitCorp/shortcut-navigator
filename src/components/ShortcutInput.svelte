<script lang="ts">
    import { createEventDispatcher, onMount } from 'svelte';

    export let label: string;
    export let modules: { hotkeyManager: IHotkeyManager };
    export let shortcut = '';

    const { hotkeyManager } = modules;

    // EVENTS

    const dispatch = createEventDispatcher();

    function onChange(value: string) {
        dispatch('change', value);
    }

    function onRemove() {
        if (confirm(`Are you sure you want to remove the shortcut "${shortcut}"?`)) {
            dispatch('remove');
        }
    }

    // STATE

    type State =
        | {
              edit: false;
          }
        | {
              edit: true;
              shortcut: string;
              isModifierPressed: boolean;
              isLetterPressed: boolean;
          };
    let state: State = { edit: false };

    function enableEditMode() {
        state = {
            edit: true,
            isLetterPressed: false,
            isModifierPressed: false,
            shortcut: '',
        };
        shortcut = '';
        onChange('');

        inputElement.focus();
    }

    function disableEditMode() {
        state = {
            edit: false,
        };
    }

    // LIFECYCLE

    let inputElement: HTMLInputElement;

    onMount(() => {
        const unbind = hotkeyManager.setHotKey(
            hotkeyManager.ALL_KEYS,
            (params) => {
                if (state.edit) {
                    state.shortcut = params.shortcut;
                    state.isModifierPressed = params.isModifierPressed;
                    state.isLetterPressed = params.isLetterPressed;

                    if (params.isModifierPressed && params.isLetterPressed) {
                        shortcut = params.shortcut;
                        onChange(shortcut);
                        disableEditMode();
                    }
                }
            },
            {
                element: inputElement,
                hotkeysInInputs: true,
            },
        );

        return unbind;
    });

    // COMPUTED

    function getPlaceholder(deps: { state: State; shortcut: string }): string {
        if (deps.state.edit) {
            return 'Type a shortcut';
        }

        if (deps.shortcut) {
            return `Shortcut set: ${deps.shortcut}`;
        }

        return 'Not set';
    }

    function getError(deps: { state: State }): string | null {
        if (!deps.state.edit) {
            return null;
        }

        // no clicks yet
        if (!deps.state.shortcut) {
            return null;
        }

        if (!deps.state.isModifierPressed) {
            return 'Must include modifier.';
        }

        if (!deps.state.isLetterPressed) {
            return 'Type a letter.';
        }

        return null;
    }

    $: placeholder = getPlaceholder({ state, shortcut });
    $: error = getError({ state });
    $: readonly = !state.edit;
</script>

<div class="container">
    <span class="label">{label}</span>
    <div class="inputContainer">
        <input
            {readonly}
            {placeholder}
            autocomplete="off"
            aria-invalid={error ? 'true' : 'false'}
            bind:this={inputElement}
            bind:value={shortcut}
            on:blur={disableEditMode}
        />
        <div class="underline" class:underlineVisible={state.edit} class:underlineError={error} />
    </div>
    <button on:click={enableEditMode}>✏️</button>
    <button on:click={onRemove}>🗑️</button>
    <span
        class="error"
        class:active={error}
        role={error ? 'alert' : undefined}
        aria-live="assertive"
    >
        {error ?? ''}
    </span>
</div>

<style>
    .container {
        display: grid;
        grid-template-columns: 1fr min-content min-content;
    }

    .label {
        grid-column: 1 / span 3;
        font-size: 0.625rem;
        line-height: 1;
        margin: 8px 0;
    }

    .inputContainer {
        overflow: hidden;
        border-radius: 4px;
        position: relative;
    }

    input {
        background-color: #f1f3f4;
        border: none;
        color: #202124;
        padding: 6px 8px;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        outline: none;
    }

    .underline {
        content: '';
        position: absolute;
        height: 2px;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #1a73e8;
        opacity: 0;
        transition: opacity 0.2s ease-in-out;
    }

    .underlineVisible {
        opacity: 1;
    }

    .underlineError {
        background-color: #d93125;
    }

    button {
        width: 36px;
        height: 36px;
        padding: 0;
        border: none;
        background: transparent;
        cursor: pointer;
        border-radius: 50%;
    }

    button:hover {
        background-color: rgba(32, 33, 36, 0.1);
    }

    .error {
        grid-column: 1 / span 3;
        color: #d93025;
        font-size: 0.625rem;
        line-height: 1;
        height: 1em;
        margin: 8px 0;
        visibility: hidden;
    }

    .error.active {
        visibility: visible;
    }
</style>
