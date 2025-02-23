import OpenAI from "openai";
import { SettingStateType } from "../store/reducers/settingReducer";
import store from "../store";
import { useSelector } from "react-redux";
import { ReducersType } from "../store/reducers";
import makeMessages from "./mssages";
/**
 * deepseek
 */
// const client = new OpenAI({
//   apiKey: "sk-a6a5e33b1aca4986ba2fedc16c5fee14",
//   baseURL: "https://api.deepseek.com",
//   dangerouslyAllowBrowser: true,
// });

type ChatType = {
  content?: string; // 输入的查询内容
  onUpdate?: (message: string) => void;
  onFinish?: (message: string) => void;
  getStream?: (stream: any) => void;
  onError?: (err: string) => void;
};

// AI聊天
export async function chat({
  content,
  onUpdate,
  onFinish,
  getStream,
  onError,
}: ChatType) {
  const {
    setting: { apiKey, baseURL, model, name },
  }: ReducersType = store.getState();
  console.log("setting", { apiKey, baseURL, model, name });

  let stream;
  const client = new OpenAI({
    apiKey,
    baseURL,
    dangerouslyAllowBrowser: true,
  });
  try {
    stream = await client.chat.completions.create({
      model,
      // model: "deepseek-chat",
      messages: makeMessages(content),
      stream: true,
    });

    // 返回流式输出
    getStream(stream);

    let temp_result: string = "";
    for await (const chunk of stream) {
      let cur = chunk.choices[0]?.delta?.content || "";
      temp_result += cur;
      // 更新流式数据
      onUpdate(temp_result);

      // 传输结束
      if (chunk.choices[0]?.finish_reason === "stop") {
        onFinish(temp_result);
      }
    }
  } catch (err) {
    onError("网络繁忙，请稍后再试");
    if (process.env.NODE_ENV === "development") {
      // 在开发版本中执行的逻辑
      // throw err;
      console.error(err);
    }
  }
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
