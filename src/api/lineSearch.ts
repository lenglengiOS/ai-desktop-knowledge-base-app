/**
 * 联网搜索
 */
import OpenAI from "openai";
import { ReducersType } from "../store/reducers";
import store from "../store";
import { ChatType } from "./request";

const tools: any[] = [
  // 联网搜索tools
  {
    type: "builtin_function",
    function: {
      name: "$web_search",
    },
  },
];

function search_impl(arg: any) {
  return arg;
}

let finishReason: string = null;

const {
  setting: { apiKey, baseURL, model },
}: ReducersType = store.getState();

const client = new OpenAI({
  apiKey,
  baseURL,
  dangerouslyAllowBrowser: true,
});

async function lineSearch({
  content,
  onUpdate,
  onFinish,
  getStream,
  onError,
}: ChatType) {
  const messages: any[] = [
    {
      role: "system",
      content:
        "你是 Kimi，由 Moonshot AI 提供的人工智能助手，你更擅长中文和英文的对话。你会为用户提供安全，有帮助，准确的回答。同时，你会拒绝一切涉及恐怖主义，种族歧视，黄色暴力等问题的回答。Moonshot AI 为专有名词，不可翻译成其他语言。",
    },
    { role: "user", content }, // 在提问中要求 Kimi 大模型联网搜索
  ];
  while (finishReason === null || finishReason === "tool_calls") {
    try {
      const completion = await client.chat.completions.create({
        model,
        messages: messages,
        temperature: 0.3,
        tools: tools, // <-- 我们通过 tools 参数，将定义好的 tools 提交给 Kimi 大模型
      });
      getStream(completion);
      const choice = completion.choices[0];
      // console.log(choice);
      finishReason = choice.finish_reason;
      // console.log("finishReason: ", finishReason);
      // 执行联网搜索
      if (finishReason === "tool_calls") {
        // <-- 判断当前返回内容是否包含 tool_calls
        messages.push(choice.message); // <-- 我们将 Kimi 大模型返回给我们的 assistant 消息也添加到上下文中，以便于下次请求时 Kimi 大模型能理解我们的诉求
        for (const toolCall of choice.message.tool_calls) {
          // <-- tool_calls 可能是多个，因此我们使用循环逐个执行
          const tool_call_name = toolCall.function.name;
          let tool_result;
          const tool_call_arguments = JSON.parse(toolCall.function.arguments); // <-- arguments 是序列化后的 JSON Object，我们需要使用 JSON.parse 反序列化一下
          if (tool_call_name == "$web_search") {
            tool_result = search_impl(tool_call_arguments);
          } else {
            tool_result = "no tool found";
          }

          // 使用函数执行结果构造一个 role=tool 的 message，以此来向模型展示工具调用的结果；
          // 注意，我们需要在 message 中提供 tool_call_id 和 name 字段，以便 Kimi 大模型
          // 能正确匹配到对应的 tool_call。
          // console.log("toolCall.id");
          // console.log(toolCall.id);
          // console.log("tool_call_name");
          // console.log(tool_call_name);
          // console.log("tool_result");
          // console.log(tool_result);
          messages.push({
            role: "tool",
            tool_call_id: toolCall.id,
            name: tool_call_name,
            content: JSON.stringify(tool_result), // <-- 我们约定使用字符串格式向 Kimi 大模型提交工具调用结果，因此在这里使用 JSON.stringify 将执行结果序列化成字符串
          });
        }
      }

      // 联网搜索完成
      if (finishReason === "stop") {
        // console.log(choice.message.content); // <-- 在这里，我们才将模型生成的回复返回给用户
        onUpdate(choice.message.content);
        onFinish(choice.message.content);
      }
    } catch (error) {
      onError(error);
      break;
    }
  }
}

export default lineSearch;
