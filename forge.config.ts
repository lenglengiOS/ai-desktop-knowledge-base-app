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
const NAME = "海豚AI助手";

const config: ForgeConfig = {
  packagerConfig: {
    asar: true,
    name: NAME,
    icon: ICON_URL,
    appVersion: PackageJson.version,
    appCopyright: "Copyright © 2025 lengleng",
  },
  rebuildConfig: {},
  makers: [
    // Windows 的 Squirrel 安装包
    {
      name: "@electron-forge/maker-squirrel",
      platforms: ["win32"],
      config: {
        // Squirrel.Windows specific configuration (if needed)
        overwrite: true, // 设置为 true 以覆盖已存在的文件
      },
    },
    // macOS 的 DMG 镜像文件
    {
      name: "@electron-forge/maker-dmg",
      platforms: ["darwin"],
      config: (arch: string) => {
        return {
          // 根据架构生成不同的包名
          name: `${NAME}-${arch}`,
          overwrite: true,
        };
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
  publishers: [
    {
      name: "@electron-forge/publisher-github",
      config: {
        repository: {
          owner: "lenglengiOS",
          name: "ai-desktop-knowledge-base-app",
        },
        // 自动发布到 GitHub Releases
        draft: false,
        // 自动更新发行说明
        prerelease: false,
        // 认证令牌，用于访问 GitHub API
        authToken: process.env.GITHUB_TOKEN,
      },
    },
  ],
};

export default config;
