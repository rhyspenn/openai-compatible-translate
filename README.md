# 智谱AI翻译插件

[![GitHub release](https://img.shields.io/github/v/release/rhyspenn/zhipu-ai-translate)](https://github.com/rhyspenn/zhipu-ai-translate/releases)
[![GitHub downloads](https://img.shields.io/github/downloads/rhyspenn/zhipu-ai-translate/total)](https://github.com/rhyspenn/zhipu-ai-translate/releases)
[![License](https://img.shields.io/github/license/rhyspenn/zhipu-ai-translate)](LICENSE)

这是一个基于智谱AI大模型的Bob翻译插件，提供高质量的文本翻译服务。

## 功能特点

- 🤖 基于智谱AI GLM-4大模型，翻译质量高
- 🌍 支持15种语言互译
- 🚀 默认使用GLM-4-Flash模型，响应速度更快
- 🎯 支持自定义模型，可使用任何智谱AI模型
- 📝 智能理解上下文，提供自然的翻译结果
- 🔧 完善的错误处理和用户反馈
- 🔒 支持API Key安全存储
- ⚡ 优化的翻译算法，避免AI思考过程干扰

## 支持的语言

- 自动检测语言
- 中文（简体）
- 中文（繁体）
- 英语
- 日语
- 韩语
- 法语
- 德语
- 西班牙语
- 葡萄牙语
- 俄语
- 意大利语
- 阿拉伯语
- 泰语
- 越南语

## 安装配置

### 🔥 快速安装

1. 前往 [Releases 页面](https://github.com/rhyspenn/zhipu-ai-translate/releases) 下载最新版本
2. 下载 `zhipu-ai-translate.bobplugin` 文件
3. 双击文件自动安装到 Bob

### 1. 获取API Key
1. 访问 [智谱AI开放平台](https://open.bigmodel.cn/)
2. 注册账号并登录
3. 创建API Key

### 2. 安装插件
1. 下载插件文件（`main.js` 和 `info.json`）
2. 在Bob中选择"偏好设置" -> "服务" -> "翻译"
3. 点击左下角"+"添加服务
4. 选择安装的插件

### 3. 配置插件
1. 在插件设置中填入您的API Key
2. 选择合适的模型：
   - **GLM-4**：标准模型，翻译质量稳定
   - **GLM-4-Flash (推荐 | 快速)**：默认选择，响应速度更快，推荐日常使用
   - **自定义模型**：支持使用其他智谱AI模型，如 `glm-4-plus`、`chatglm3-6b` 等
3. 如果选择自定义模型，请在"自定义模型名称"中填入具体的模型名称

## 使用说明

1. 选择文本后使用Bob的快捷键进行翻译
2. 插件会自动检测源语言并翻译到目标语言
3. 支持Bob的所有翻译功能，如划词翻译、截图翻译等
4. 支持使用智谱AI的各种模型进行翻译

## 注意事项

- ⚠️ 需要稳定的网络连接
- ⚠️ API调用会产生费用，请合理使用
- ⚠️ 请妥善保管您的API Key
- ⚠️ 建议在插件设置中定期检查API余额

## 常见问题

### Q: 翻译失败显示"API Key无效"
A: 请检查API Key是否正确填写，确保没有多余的空格

### Q: 翻译失败显示"API配额不足"
A: 请检查智谱AI账户余额，确保有足够的调用额度

### Q: 翻译速度较慢
A: 可以尝试切换到GLM-4-Flash模型，响应速度更快

### Q: 如何使用自定义模型？
A: 在模型选择中选择"自定义模型"，然后在"自定义模型名称"框中输入具体的模型名称

### Q: 翻译失败显示"模型不存在或无权限"
A: 请检查自定义模型名称是否正确，或该模型是否在您的账户权限范围内

### Q: 翻译结果出现"Automatically Detect:"等异常内容
A: 这是早期版本的已知问题，请更新到最新版本（v1.1.1+）已修复此问题

### Q: 如何获得更快的翻译速度？
A: 建议使用默认的GLM-4-Flash模型，该模型专为快速响应优化

## 开发文档

详细的开发说明请参见：[DEVELOPMENT.md](DEVELOPMENT.md)

## 版本历史

完整的版本更新记录请参见：[CHANGELOG.md](CHANGELOG.md)

## 许可证

MIT License

## 反馈与支持

如果您在使用过程中遇到问题或有改进建议，欢迎提交Issue。
