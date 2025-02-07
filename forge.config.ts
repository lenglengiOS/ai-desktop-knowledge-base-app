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
import PackageJson from "./package.json";

const config: ForgeConfig = {
  packagerConfig: {
    asar: true,
    name: "海豚AI助手",
    icon: ICON_URL,
    appVersion: PackageJson.version,
    appCopyright: "Copyright © 2025 lengleng",
    ignore: ["/node_modules", "/.git"],
  },
  rebuildConfig: {},
  makers: [
    // Windows 的 Squirrel 安装包
    {
      name: "@electron-forge/maker-squirrel",
      platforms: ["win32"],
      config: {
        // Squirrel.Windows specific configuration (if needed)
      },
    },
    // 为各平台创建 ZIP 压缩包
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin", "linux", "win32"], // Specify platforms if needed
      config: {},
    },
    // RPM-based Linux 系统的 RPM 包
    {
      name: "@electron-forge/maker-rpm",
      config: {
        // RPM specific configuration (if needed)
      },
    },
    // macOS 的 DMG 镜像文件
    {
      name: "@electron-forge/maker-dmg",
      config: {
        // DMG specific configuration (if needed)
      },
    },
    // Debian-based Linux 系统的 DEB 包
    {
      name: "@electron-forge/maker-deb",
      config: {
        // DEB specific configuration (if needed)
      },
    },
  ],
  plugins: [
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
