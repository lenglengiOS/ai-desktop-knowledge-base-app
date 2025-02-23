import OpenAI from "openai";
import { SettingStateType } from "../store/reducers/settingReducer";
import store from "../store";
import { useSelector } from "react-redux";
import { ReducersType } from "../store/reducers";
import makeMessages from "./mssages";
import lineSearch from "./lineSearch";
import multipleChats from "./multipleChats";
/**
 * deepseek
 */
// const client = new OpenAI({
//   apiKey: "sk-a6a5e33b1aca4986ba2fedc16c5fee14",
//   baseURL: "https://api.deepseek.com",
//   dangerouslyAllowBrowser: true,
// });

export type ChatType = {
  content?: string; // 输入的查询内容
  onUpdate?: (message: string) => void;
  onFinish?: (message: string) => void;
  getStream?: (stream: any) => void;
  onError?: (err: string) => void;
};

// AI聊天
export function chat({
  content,
  onUpdate,
  onFinish,
  getStream,
  onError,
}: ChatType) {
  const {
    panel: { isOnlineSearch },
  }: ReducersType = store.getState();
  console.log("是否联网搜索：", isOnlineSearch);
  // 联网搜索
  if (isOnlineSearch) {
    lineSearch({
      content,
      onUpdate,
      onFinish,
      getStream,
      onError,
    });
    return;
  }

  // 多轮对话
  multipleChats({
    content,
    onUpdate,
    onFinish,
    getStream,
    onError,
  });
}

type ConfigType = {
  config: { apiKey: string; baseURL: string; model: string };
};

// 测试链接
export async function testConnect({
  onFinish,
  onError,
  config,
}: ChatType & ConfigType) {
  const client = new OpenAI({
    apiKey: config.apiKey,
    baseURL: config.baseURL,
    dangerouslyAllowBrowser: true,
  });
  try {
    await client.chat.completions.create({
      model: config.model,
      messages: [{ role: "user", content: String(Date.now()) }],
    });
    onFinish("配置测试成功！");
  } catch (err) {
    onError("配置测试失败，请核对参数！");
  }
}
