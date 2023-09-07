import FeedbackForm from '../components/FeedbackForm.svelte';

const target = document.getElementById('app');

if (target) {
    chrome.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
        new FeedbackForm({
            target,
            props: {
                initUrl: tabs[0].url ?? '',
            },
        });
    });
}
