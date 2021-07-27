<h1 align="center">StatPixel | OBS Overlay</h1>
<p align="center">A simple OBS overlay to display Hypixel stats.</p>
<br />

<div align="center">
    <img src="https://img.shields.io/github/v/release/iynprojects/StatPixel-OBSOverlay?style=for-the-badge&color=347aeb">
    <img src="https://img.shields.io/github/contributors/iynprojects/StatPixel-OBSOverlay?style=for-the-badge&color=347aeb">
    <img src="https://img.shields.io/github/languages/code-size/iynprojects/StatPixel-OBSOverlay?style=for-the-badge&color=347aeb">
</div>

## Installation
 * Download the repository from the latest release available.
 * Extract it to a folder.
 * Add a ``Browser` source in your OBS scene.
 * Check `local file`, and select the `index.html` in the directory you unpacked the repository to.
 * Enable the source, resize it to wherever you wish, and you should be good to go!

## Configuration
 To set up the overlay to track your stats, at least two things must be done:
  * Add your Hypixel API Key (you can get this by running `/api new` ingame).
  * Change the UUID to that of your own account.

```js
const config = {
    apiKey: `this-is-a-totally-real-api-key`, // Use /api in Hypixel to get your API key. Don't share this with anyyone!
    uuid: `64472448-377e-4abd-938e-69422c069115`, // Enter your Minecraft account UUID here.

    display: {
        font: `Minecraft`, // The font to render with (you will need to add this to the CSS file as well).
        fontSize: 20, // Font size, in pixels.

        lineSpacing: 22.5 // Space between lines, in pixels.
    }
};
```

## Preview
![OBS Overlay Preview](https://share.alru.ga/fZIv)
