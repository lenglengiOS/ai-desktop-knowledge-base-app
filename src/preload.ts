// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("my_app_name", {
  // 最小化
  minimize: () => {
    ipcRenderer.send("minimize");
  },
  // 最大化
  maximize: () => {
    ipcRenderer.send("maximize");
  },
  // 选择文件
  chooseFile: async () => {
    const path = await ipcRenderer.invoke("choose-file");
    return path;
  },
});
