<script lang="ts">
    export let initUrl: string;
    let loading = false;
    let success = false;
    let error: string | null = null;

    function onSubmit(e: SubmitEvent) {
        const formData = new FormData(e.target as HTMLFormElement);

        const data: Record<string, any> = {};
        for (let field of formData) {
            const [key, value] = field;
            data[key] = value;
        }

        loading = true;

        fetch(import.meta.env.VITE_FEEDBACK_SERVICE_URL, {
            method: 'POST',
            body: JSON.stringify(data),
        })
            .then((resp) => {
                if (resp.ok) {
                    success = true;
                } else {
                    resp.json().then((data) => {
                        error = 'Error\n' + data.error;
                    });
                }
            })
            .catch((err) => {
                error = 'Unhandled error\n' + err;
            })
            .finally(() => {
                loading = false;
            });
    }
</script>

<form on:submit|preventDefault={onSubmit}>
    <h1>Feedback form</h1>
    <p>
        Using this form you can indicate on which site the navigation does not work or does not work
        as expected.
    </p>
    <div class="row">
        <label for="url">Url*:</label>
        <input disabled={loading} type="url" required id="url" name="url" value={initUrl} />
    </div>
    <div class="row">
        <label for="comment">Comment (optional):</label>
        <textarea
            disabled={loading}
            name="comment"
            id="comment"
            rows="10"
            placeholder="Hello! The extension does not work for this URL. Although it seems that the site has obvious pagination between pages."
        />
    </div>
    <button type="submit" disabled={loading}>{loading ? 'Sending...' : 'Send'}</button>

    {#if success}
        <div class="overflow"><h1>Thanks for your feedback! ❤️</h1></div>
    {/if}

    {#if error}
        <div class="overflow">{error}</div>
    {/if}
</form>

<style>
    form {
        position: relative;
        width: 100%;
        display: grid;
        gap: 12px;
    }

    h1 {
        font-size: 1.3em;
        margin: 0;
    }

    p {
        margin: 0;
    }

    label {
        font-weight: bold;
    }

    input {
        padding: 6px 8px;
        font-family: inherit;
    }

    textarea {
        resize: vertical;
        font-family: inherit;
        padding: 6px 8px;
    }

    .row {
        display: grid;
        gap: 0.3em;
    }

    .overflow {
        position: absolute;
        inset: 0;
        background: white;
        display: flex;
        align-items: center;
        justify-content: center;
        white-space: break-spaces;
        text-align: center;
    }
</style>
