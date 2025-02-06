import type { ForgeConfig } from "@electron-forge/shared-types";
import { MakerSquirrel } from "@electron-forge/maker-squirrel";
import { MakerZIP } from "@electron-forge/maker-zip";
import { MakerDeb } from "@electron-forge/maker-deb";
import { MakerRpm } from "@electron-forge/maker-rpm";
import { MakerDMG } from "@electron-forge/maker-dmg";
import { AutoUnpackNativesPlugin } from "@electron-forge/plugin-auto-unpack-natives";
import { WebpackPlugin } from "@electron-forge/plugin-webpack";
import { FusesPlugin } from "@electron-forge/plugin-fuses";
import { FuseV1Options, FuseVersion } from "@electron/fuses";

import { mainConfig } from "./webpack.main.config";
import { rendererConfig } from "./webpack.renderer.config";
const ICON_URL = "./src/assets/images/icon";

const config: ForgeConfig = {
  packagerConfig: {
    asar: true,
    name: "海豚AI助手",
    icon: ICON_URL,
    appVersion: "2.0.0",
    appCopyright: "Copyright © 2025 lengleng",
  },
  rebuildConfig: {},
  makers: [
    // Windows 的 Squirrel 安装包
    new MakerSquirrel({
      setupIcon: ICON_URL,
    }),
    // 为各平台创建 ZIP 压缩包
    new MakerZIP({}, ["darwin"]),
    // RPM-based Linux 系统的 RPM 包
    new MakerRpm({}),
    // macOS 的 DMG 镜像文件
    new MakerDMG({}),
    // Debian-based Linux 系统的 DEB 包
    new MakerDeb({
      options: {
        icon: ICON_URL,
      },
    }),
  ],
  plugins: [
    new AutoUnpackNativesPlugin({}),
    new WebpackPlugin({
      mainConfig,
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: "./src/index.html",
            js: "./src/renderer.ts",
            name: "main_window",
            preload: {
              js: "./src/preload.ts",
            },
          },
        ],
      },
    }),
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};

export default config;
