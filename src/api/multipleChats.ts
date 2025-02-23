/**
 * 多轮对话
 */
import OpenAI from "openai";
import store from "../store";
import { ReducersType } from "../store/reducers";
import makeMessages from "./mssages";
import { ChatType } from "./request";

const multipleChats = async ({
  content,
  onFinish,
  getStream,
  onUpdate,
  onError,
}: ChatType) => {
  const {
    setting: { apiKey, baseURL, model },
  }: ReducersType = store.getState();

  const client = new OpenAI({
    apiKey,
    baseURL,
    dangerouslyAllowBrowser: true,
  });
  try {
    const stream: any = await client.chat.completions.create({
      model,
      messages: makeMessages(content),
      temperature: 0.3,
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
      console.error(err);
    }
  }
};

export default multipleChats;
