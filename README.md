# FVTT Player Client

A desktop client for Foundry Virtual Tabletop, built on Electron. Lets players 
connect to Foundry games without a browser, useful for anyone who has 
compatibility issues with their browser of choice.

Originally created by [theripper93](https://github.com/theripper93/fvtt-player-client).
Extended by [OmegaRogue](https://github.com/OmegaRogue/fvtt-player-client).
Currently maintained by [Rattlesire](https://github.com/gwbootes).

---

## What happened to the original?

Both theripper93's version and OmegaRogue's fork went quiet in mid-2024. 
By Foundry v13/v14, the bundled Chromium version (122) was too old to run 
Foundry properly, and the client would fail to load or throw browser compatibility 
errors. This fork picks up where they left off.

**v2.0.0** updates Electron from v29 to v42, bringing Chromium from 122 to 148. 
Foundry v14 works again.

---

## Differences between forks

| Feature | theripper93 | OmegaRogue | Rattlesire (this fork) |
|---|:---:|:---:|:---:|
| Back to server select (setup screen) | yes | yes | yes |
| Back to server select (login screen) | yes | yes | yes |
| Back to server select (in-game) | no | yes | yes |
| Foundry v14 compatible | no | no | yes |

---

## Installation

Download the latest installer from the 
[Releases](https://github.com/gwbootes/fvtt-player-client/releases) page and run it.

---

## Customization

You can pre-configure and customize the client by editing the `config.json` file.
From where the executable is located, navigate to the `resources/app` folder.
Open `config.json` with any text editor.

Example config:

```json
{
  "games": [
    {
      "name": "My Game",
      "url": "https://your-foundry-server.com"
    }
  ],
  "background": "https://example.com/background.jpg",
  "backgroundColor": "#000000",
  "textColor": "white",
  "accentColor": "green"
}
```

## Migrating settings from an older version

If you had games saved in a previous version, run this in your browser console 
while on the old client to export your config:

```js
JSON.stringify({
    ...JSON.parse(window.localStorage.getItem("appConfig") || "{}"),
    games: JSON.parse(window.localStorage.getItem("gameList") || "[]")
})
```

Paste the result into your `config.json`.

---

wiki: https://wiki.theripper93.com/free/vtt-desktop-client
