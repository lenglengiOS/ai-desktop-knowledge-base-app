import OpenAI from "openai";
/**
 * moonshot
 */
const client = new OpenAI({
  apiKey: "sk-cG6yn2hUq8rNDwPQ2X6o9t4xSMEWh5jHsRaMnQ5djjZpotEw",
  baseURL: "https://api.moonshot.cn/v1",
  dangerouslyAllowBrowser: true,
});

/**
 * deepseek
 */
// const client = new OpenAI({
//   apiKey: "sk-a6a5e33b1aca4986ba2fedc16c5fee14",
//   baseURL: "https://api.deepseek.com",
//   dangerouslyAllowBrowser: true,
// });

type ChatType = {
  content: string; // 输入的查询内容
  onUpdate: (message: string) => void;
  onFinish: (message: string) => void;
  getStream: (stream: any) => void;
  onError: (err: string) => void;
};

// AI聊天
export async function chat({
  content,
  onUpdate,
  onFinish,
  getStream,
  onError,
}: ChatType) {
  let stream;
  try {
    stream = await client.chat.completions.create({
      model: "moonshot-v1-auto",
      // model: "deepseek-chat",
      // if chat context is needed, modify the array
      messages: [{ role: "user", content }],
      // stream mode
      stream: true,
    });

    // 返回流式输出
    getStream(stream);

    let temp_result: string = "";
    for await (const chunk of stream) {
      let cur = chunk.choices[0]?.delta?.content || "";
      temp_result += cur;
      onUpdate(temp_result);

      // 传输结束
      if (chunk.choices[0]?.finish_reason === "stop") {
        onFinish(temp_result);
      }
    }
  } catch (err) {
    onError("网络繁忙，请稍后再试");
    throw err;
  }
}
