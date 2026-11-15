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

**v2.1.0** updates Electron from v42 to v45, bringing Chromium from 148 to 156.
The client now tells Foundry it is plain Chrome. Older versions left a stray
version number in that line, which a server can read as an outdated desktop app.

**v2.0.0** updated Electron from v29 to v42, bringing Chromium from 122 to 148.
Foundry v14 worked again.

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

Go to the [Releases](https://github.com/gwbootes/fvtt-player-client/releases)
page. Download the one file that matches your computer.

### Which file do I want?

| Your computer | The file to get |
|---|---|
| Windows | the one ending in `setup.exe` |
| Mac, newer (M1, M2, M3, M4) | the one with `macos-arm64` in the name |
| Mac, older (Intel) | the one with `macos-x64` in the name |
| Ubuntu, Mint, or Debian | the one ending in `.deb` |
| Fedora, RHEL, or openSUSE | the one ending in `.rpm` |
| Any other Linux | the one with `linux-x64` in the name |

Not sure which Mac you have? Click the Apple menu. Click About This Mac. Look
at the line that says Chip. If it starts with "Apple", get the arm64 file.

Using a Raspberry Pi or an ARM Chromebook? Get the same kind of file, but pick
the one with `arm64` in the name.

### Windows

Run the `setup.exe` file. That's it.

There is also a `portable` zip. Use that one if you don't want to install
anything. Unzip it and run the app from the folder.

### Mac

Open the `.dmg` file. Drag the app into your Applications folder.

**The first time you open it, your Mac will block it.** It may say the app is
damaged. It may say it's from an unknown developer.

The app is not damaged. Apple charges $99 a year to put their stamp of approval
on an app. This project doesn't pay it. So every Mac shows this warning.

Here's how to open it. You only have to do this once.

1. Double-click the app. Let it fail.
2. Open System Settings.
3. Click Privacy & Security.
4. Scroll to the bottom. You'll see a line about the app being blocked.
5. Click **Open Anyway**.

After that it opens like any other app.

### Linux

For Ubuntu, Mint, or Debian, open a terminal in your Downloads folder and run:

```sh
sudo apt install ./vtt-desktop-client_2.1.0_amd64.deb
```

For Fedora, RHEL, or openSUSE:

```sh
sudo dnf install ./vtt-desktop-client-2.1.0-1.x86_64.rpm
```

If you got the zip instead, unzip it anywhere and run `./vtt-desktop-client`.

Some systems will close the app right away and print an error about a sandbox.
If that happens, open a terminal in the app's folder and run these two lines:

```sh
sudo chown root:root chrome-sandbox
sudo chmod 4755 chrome-sandbox
```

Then open the app again.

The `.deb` and `.rpm` files do that step for you. Use one of those if you can.

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
