// noinspection JSUnusedGlobalSymbols

import type {ForgeConfig} from '@electron-forge/shared-types';
import {MakerSquirrel} from '@electron-forge/maker-squirrel';
import {MakerZIP} from '@electron-forge/maker-zip';
import {MakerDeb} from '@electron-forge/maker-deb';
import {MakerRpm} from '@electron-forge/maker-rpm';
import {MakerDMG} from '@electron-forge/maker-dmg';
import {VitePlugin} from '@electron-forge/plugin-vite';

const HOMEPAGE = 'https://github.com/gwbootes/fvtt-player-client';
const DESCRIPTION = 'A desktop client for Foundry Virtual Tabletop';

const config: ForgeConfig = {
    packagerConfig: {
        // macOS requires a bundle identifier. Reverse-DNS on the GitHub org is
        // the convention for projects without their own domain, and it is what
        // Flathub expects if we ever uncomment the flatpak maker below.
        appBundleId: 'io.github.gwbootes.vtt-desktop-client',
        appCategoryType: 'public.app-category.entertainment',
        // Deliberately NOT setting osxSign. @electron/packager ad-hoc signs
        // macOS builds by default, which is what lets them launch on Apple
        // Silicon at all. Setting osxSign here would make it hunt for a
        // Developer ID certificate that we do not have and fail the build.
        // Downloads are still quarantined by Gatekeeper; see the macOS install
        // notes in the README.
        win32metadata: {
            CompanyName: 'Rattlesire',
            FileDescription: DESCRIPTION,
        },
    },
    rebuildConfig: {},
    makers: [
        new MakerSquirrel({
            // This is what names the Start Menu folder. Left unset it inherits
            // package.json `author`, which is why installs landed in a folder
            // called "theripper93".
            authors: 'Rattlesire',
            owners: 'Rattlesire',
            description: DESCRIPTION,
        }),
        new MakerZIP({}),
        new MakerRpm({
            options: {
                homepage: HOMEPAGE,
                description: DESCRIPTION,
                productName: 'VTT Desktop Client',
                genericName: 'Virtual Tabletop Client',
                categories: ['Game'],
            },
        }),
        new MakerDeb({
            options: {
                maintainer: 'Rattlesire',
                homepage: HOMEPAGE,
                description: DESCRIPTION,
                productName: 'VTT Desktop Client',
                genericName: 'Virtual Tabletop Client',
                // Without categories the .desktop entry has no menu section and
                // the app can install without ever appearing in the launcher.
                categories: ['Game'],
            },
        }),
        // new MakerFlatpak({
        //     options: {
        //         categories: ['Game', 'Network'],
        //         description: DESCRIPTION,
        //         productName: "VTT Desktop Client",
        //         id: "io.github.gwbootes.vtt-desktop-client",
        //         files: []
        //     }
        // }),
        new MakerDMG({}),
    ],
    plugins: [
        new VitePlugin({
            // `build` can specify multiple entry builds, which can be Main process, Preload scripts, Worker process, etc.
            // If you are familiar with Vite configuration, it will look really familiar.
            build: [
                {
                    // `entry` is just an alias for `build.lib.entry` in the corresponding file of `config`.
                    entry: 'src/main.ts',
                    config: 'vite.main.config.ts',
                },
                {
                    entry: 'src/preload.ts',
                    config: 'vite.preload.config.ts',
                },
            ],
            renderer: [
                {
                    name: 'main_window',
                    config: 'vite.renderer.config.ts',
                },
            ],
        }),
    ]
};

export default config;
