# Shortcut Navigator

Tired of endless clicking and scrolling while navigating through your favorite websites? Our browser extension revolutionizes the way you interact with websites by providing lightning-fast navigation using customizable shortcuts.

## Available shortcuts

-   **Go to previous page**: `⌥ + ←` / `ctrl + ←` (macOS / Windows)
-   **Go to next page**: `⌥ + →` / `ctrl + →` (macOS / Windows)
-   **Go to previous page in a new tab**: `⌥ + ⇧ + ←` / `Ctrl + Shift + ←` (macOS / Windows)
-   **Go to next page in a new tab**: `⌥ + ⇧ + →` / `Ctrl + Shift + →` (macOS / Windows)

## Key features

1. **Effortless Navigation**: Navigating through the pages of a website becomes as easy as a keystroke. Effortlessly jump from one page to another without lifting a finger from your keyboard.
2. **Customizable Shortcuts**: Tailor your browsing experience to your preferences by assigning your own shortcuts to specific actions.
3. **Enhanced Productivity**: By reducing the time spent on navigating, you can focus more on the content that matters. Whether you're researching, shopping, or simply reading articles, extension enhances your productivity.
4. **Multi-Site Support**: Use the same extension to navigate across multiple websites. Save different shortcut configurations for each site you frequent, optimizing your experience everywhere you go.
5. **Security and Privacy**: Extension is designed with your security in mind. Rest assured that your data and browsing history are kept private and never shared.

## Development

```sh
# Copy and fill the file with environment variables
copy .env.example .env

# Install dependencies
yarn

# Start telegram bot
yarn dev

# Run checkers
yarn check:svelte
yarn check:tsc

# Run tests
yarn test

# Build
yarn build

# Prepare package to publish
yarn package
```

### Environment variables

| Variable                    | Description                                          |
| --------------------------- | ---------------------------------------------------- |
| `VITE_FEEDBACK_SERVICE_URL` | Url of the service for processing the feedback form. |
