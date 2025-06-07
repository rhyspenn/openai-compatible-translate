# 智谱AI翻译插件

[![GitHub release](https://img.shields.io/github/v/release/rhys/bob-zhipu-translate)](https://github.com/rhys/bob-zhipu-translate/releases)
[![GitHub downloads](https://img.shields.io/github/downloads/rhys/bob-zhipu-translate/total)](https://github.com/rhys/bob-zhipu-translate/releases)
[![License](https://img.shields.io/github/license/rhys/bob-zhipu-translate)](LICENSE)

这是一个基于智谱AI大模型的Bob翻译插件，提供高质量的文本翻译服务。

> **注意**: 请将上面的 `rhys/bob-zhipu-translate` 替换为您实际的 GitHub 仓库地址

## 功能特点

- 🤖 基于智谱AI GLM-4大模型，翻译质量高
- 🌍 支持15种语言互译
- 🚀 支持GLM-4和GLM-4-Flash两种模型
- 📝 智能理解上下文，提供自然的翻译结果
- 🔒 支持API Key安全存储

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

1. 前往 [Releases 页面](https://github.com/rhys/bob-zhipu-translate/releases) 下载最新版本
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
   - **GLM-4**：翻译质量更高，适合重要文档
   - **GLM-4-Flash**：响应速度更快，适合日常使用

## 使用说明

1. 选择文本后使用Bob的快捷键进行翻译
2. 插件会自动检测源语言并翻译到目标语言
3. 支持Bob的所有翻译功能，如划词翻译、截图翻译等

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

## 版本历史

- **v1.0.0** - 初始版本
  - 支持基本翻译功能
  - 支持GLM-4和GLM-4-Flash模型
  - 支持15种语言

## 许可证

MIT License

## 反馈与支持

如果您在使用过程中遇到问题或有改进建议，欢迎提交Issue。
