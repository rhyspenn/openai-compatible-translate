# OpenAI Compatible 翻译插件

[![GitHub release](https://img.shields.io/github/v/release/rhyspenn/openai-compatible-translate)](https://github.com/rhyspenn/openai-compatible-translate/releases)
[![GitHub downloads](https://img.shields.io/github/downloads/rhyspenn/openai-compatible-translate/total)](https://github.com/rhyspenn/openai-compatible-translate/releases)
[![License](https://img.shields.io/github/license/rhyspenn/openai-compatible-translate)](LICENSE)

这是一个支持任何 OpenAI 兼容 API 的 Bob 翻译插件，可以使用 OpenAI、Azure OpenAI、通义千问、智谱 AI 等任何兼容 OpenAI API 格式的服务进行高质量文本翻译。

## 功能特点

- 🌐 **通用兼容性**：支持任何 OpenAI 兼容的 API 服务
- 🔧 **自定义 Base URL**：可配置任何 API 端点地址
- 🤖 **灵活模型选择**：支持自定义模型名称，默认使用 `gpt-4.1`
- 🌍 **多语言支持**：支持 35+ 种语言互译
- ⚙️ **参数可调**：可自定义 temperature 和 max_tokens 参数
- 📝 **智能翻译**：基于上下文提供自然流畅的翻译结果
- 🔒 **安全存储**：API Key 安全加密存储
- ⚡ **高效响应**：优化的 API 调用，快速返回结果

## 支持的服务

本插件支持任何兼容 OpenAI API 格式的服务，包括但不限于：

- ✅ OpenAI (GPT-4、GPT-3.5-Turbo 等)
- ✅ Azure OpenAI Service
- ✅ 通义千问 (Qwen)
- ✅ 智谱 AI (ChatGLM)
- ✅ 百川智能
- ✅ 讯飞星火
- ✅ Local LLM (通过 LM Studio、Ollama 等)
- ✅ 其他任何 OpenAI 兼容服务

## 安装配置

### 🔥 快速安装

1. 前往 [Releases 页面](https://github.com/rhyspenn/openai-compatible-translate/releases) 下载最新版本
2. 下载 `openai-compatible-translate.bobplugin` 文件
3. 双击文件自动安装到 Bob

### 配置步骤

1. **设置 API Base URL**
   - OpenAI: `https://api.openai.com/v1`
   - Azure OpenAI: `https://YOUR-RESOURCE-NAME.openai.azure.com/openai/deployments/YOUR-DEPLOYMENT-NAME`
   - 其他服务：请参考服务商文档获取对应的 API 地址

2. **输入 API Key**
   - 在插件设置中填入您的 API 密钥
   - 密钥将被安全加密存储

3. **配置模型名称**
   - 默认为 `gpt-4.1`
   - 可根据您的服务支持情况修改为其他模型
   - 常用模型：`gpt-4`、`gpt-3.5-turbo`、`gpt-4-turbo`、`claude-3`、`qwen-plus` 等

4. **调整参数（可选）**
   - **Temperature**: 控制输出随机性（0-2），默认 0.1，值越小翻译越精确
   - **Max Tokens**: 最大返回 token 数，留空则自动计算

## 使用说明

1. 选择文本后使用 Bob 的快捷键进行翻译
2. 插件会自动检测源语言并翻译到目标语言
3. 支持 Bob 的所有翻译功能：
   - 划词翻译
   - 截图翻译
   - 输入翻译
   - 剪贴板翻译

## 配置示例

### OpenAI 官方服务
```
Base URL: https://api.openai.com/v1
API Key: sk-xxxxxxxxxxxxxxxxxxxxxxxx
Model: gpt-4-turbo-preview
```

### Azure OpenAI
```
Base URL: https://YOUR-RESOURCE.openai.azure.com/openai/deployments/YOUR-DEPLOYMENT
API Key: YOUR-AZURE-API-KEY
Model: gpt-4
```

### 通义千问
```
Base URL: https://dashscope.aliyuncs.com/compatible-mode/v1
API Key: sk-xxxxxxxxxxxxxxxxxxxxxxxx
Model: qwen-plus
```

### 本地大模型 (通过 LM Studio)
```
Base URL: http://localhost:1234/v1
API Key: not-needed
Model: local-model-name
```

## 支持的语言

插件支持以下语言的互译：

中文简体、中文繁体、英语、日语、韩语、法语、德语、西班牙语、葡萄牙语、俄语、意大利语、阿拉伯语、泰语、越南语、荷兰语、波兰语、土耳其语、希伯来语、印地语、印尼语、马来语、瑞典语、丹麦语、挪威语、芬兰语、捷克语、匈牙利语、希腊语、罗马尼亚语、保加利亚语、乌克兰语、斯洛伐克语、斯洛文尼亚语、克罗地亚语、立陶宛语、拉脱维亚语、爱沙尼亚语、波斯语

## 常见问题

### Q: 翻译失败显示"API Key 无效"
A: 请检查：
- API Key 是否正确填写
- Base URL 是否正确
- 确保没有多余的空格

### Q: 翻译失败显示"模型不存在"
A: 请检查模型名称是否正确，不同服务商支持的模型名称不同

### Q: 如何获取 API Key？
A: 不同服务商获取方式不同：
- OpenAI: https://platform.openai.com/api-keys
- Azure: 通过 Azure Portal 获取
- 其他服务：请参考各服务商文档

### Q: 翻译速度较慢
A: 可以尝试：
- 使用更快的模型（如 gpt-3.5-turbo）
- 检查网络连接
- 使用更近的 API 端点

### Q: 支持自建的 API 服务吗？
A: 是的，只要您的服务兼容 OpenAI API 格式，就可以通过配置 Base URL 使用

## 注意事项

- ⚠️ 需要稳定的网络连接
- ⚠️ API 调用可能产生费用，请合理使用
- ⚠️ 请妥善保管您的 API Key
- ⚠️ 不同服务商的模型能力和价格各不相同

## 开发文档

详细的开发说明请参见：[DEVELOPMENT.md](DEVELOPMENT.md)

## 版本历史

### v2.0.0 (2024)
- 🎉 全新版本，支持任何 OpenAI 兼容 API
- ✨ 添加自定义 Base URL 支持
- ✨ 灵活的模型配置
- ✨ 默认使用 gpt-4.1 模型
- ✨ 支持更多语言（35+ 种）
- 🔧 可配置 temperature 和 max_tokens 参数

### v1.x (旧版本)
- 基于智谱 AI 的翻译插件

## 许可证

MIT License

## 反馈与支持

如果您在使用过程中遇到问题或有改进建议，欢迎提交 Issue。

## 贡献

欢迎提交 Pull Request 来改进这个插件！