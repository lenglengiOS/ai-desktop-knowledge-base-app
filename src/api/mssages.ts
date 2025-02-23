/**
 * 对话记录
 */
import { ReducersType } from "../store/reducers";
import store from "../store";
// 我们将 System Messages 单独放置在一个列表中，这是因为每次请求都应该携带 System Messages
const systemMessages = [
  {
    role: "system",
    content:
      "你是 Kimi，由 Moonshot AI 提供的人工智能助手，你更擅长中文和英文的对话。你会为用户提供安全，有帮助，准确的回答。同时，你会拒绝一切涉及恐怖主义，种族歧视，黄色暴力等问题的回答。Moonshot AI 为专有名词，不可翻译成其他语言。",
  },
];

// 我们定义一个全局变量 messages，用于记录我们和 Kimi 大模型产生的历史对话消息
// 在 messages 中，既包含我们向 Kimi 大模型提出的问题（role=user），也包括 Kimi 大模型给我们的回复（role=assistant）
// messages 中的消息按时间顺序从小到大排列
let messages: any[] = [];

function makeMessages(input: string, n = 20) {
  /**
   * 使用 make_messages 控制每次请求的消息数量，使其保持在一个合理的范围内，例如默认值是 20。在构建消息列表
   * 的过程中，我们会先添加 System Prompt，这是因为无论如何对消息进行截断，System Prompt 都是必不可少的
   * 内容，再获取 messages —— 即历史记录中，最新的 n 条消息作为请求使用的消息，在大部分场景中，这样
   * 能保证请求的消息所占用的 Tokens 数量不超过模型上下文窗口。
   */
  // 首先，我们将用户最新的问题构造成一个 message（role=user），并添加到 messages 的尾部
  messages.push({
    role: "user",
    content: input,
  });

  // newMessages 是我们下一次请求使用的消息列表，现在让我们来构建它
  let newMessages: any[] = [];

  // 每次请求都需要携带 System Messages，因此我们需要先把 systemMessages 添加到消息列表中；
  // 注意，即使对消息进行截断，也应该注意保证 System Messages 仍然在 messages 列表中。
  newMessages = systemMessages.concat(newMessages);

  // 在这里，当历史消息超过 n 条时，我们仅保留最新的 n 条消息
  if (messages.length > n) {
    messages = messages.slice(-n);
  }

  newMessages = newMessages.concat(messages);

  // 处理深度思考逻辑
  const {
    panel: { isDeepThink },
  }: ReducersType = store.getState();

  if (!isDeepThink) {
    return [
      {
        role: "user",
        content: input,
      },
    ];
  }
  return newMessages;
}
export default makeMessages;
