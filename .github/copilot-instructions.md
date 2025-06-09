# Copilot Instructions

这是一个基于智谱AI大模型的Bob翻译插件项目。以下是项目的核心信息和开发指南。

## 项目概述

**智谱AI翻译插件** 是一个为macOS翻译应用Bob开发的插件，使用智谱AI GLM-4系列模型提供高质量翻译服务。

### 技术栈
- **主要语言**: JavaScript (ES5语法，Bob插件环境)
- **插件框架**: Bob Plugin API
- **AI服务**: 智谱AI API (GLM-4, GLM-4-Flash等模型)
- **构建工具**: Bash脚本 + ZIP打包
- **CI/CD**: GitHub Actions

## 文件结构

```
zhipu-ai-translate/
├── src/
│   ├── main.js          # 核心插件逻辑（翻译功能实现）
│   └── info.json        # 插件配置文件（模型选择、API Key等）
├── .github/
│   └── workflows/
│       └── release.yml  # 自动构建发布流程
├── build.sh             # 本地构建脚本
├── release.sh           # 版本发布脚本
├── package.json         # 项目配置
├── README.md            # 用户文档
├── CHANGELOG.md         # 版本更新记录
├── DEVELOPMENT.md       # 开发文档
└── appcast.json         # 插件版本信息
```

## 核心功能

### 翻译引擎
- 支持智谱AI GLM-4和GLM-4-Flash模型
- 支持自定义模型配置
- 15种语言互译支持
- 智能语言自动检测

### 用户配置
- API Key安全存储
- 模型选择（预设 + 自定义）
- 错误处理和用户友好提示

## 开发规范

### 代码风格
- 使用ES5语法（Bob环境限制）
- 函数式编程风格
- 清晰的错误处理机制
- 简洁的注释说明

### 版本管理
- 遵循语义化版本控制 (SemVer)
- 使用Angular提交规范
- 自动化构建和发布流程

### 文件命名
- 源码文件: `src/main.js`, `src/info.json`
- 脚本文件: `*.sh` (构建和发布)
- 文档文件: 大写开头的Markdown文件

## API集成

### 智谱AI API
- 端点: `https://open.bigmodel.cn/api/paas/v4/chat/completions`
- 认证: Bearer Token (API Key)
- 请求格式: JSON (Chat Completions API)
- 响应处理: 提取翻译结果并格式化

### Bob插件API
- `$option`: 获取用户配置
- `$http.request()`: HTTP请求
- `completion()`: 返回翻译结果
- 错误类型: `network`, `api`, `param`

## 重要约定

### 语言代码映射
- Bob标准语言代码 ↔ 智谱AI语言代码
- 支持自动检测 (`auto`)
- 特殊处理繁体中文 (`zh-tw`)

### 提示词策略
- 系统提示: 专业翻译工具规则
- 用户提示: 简洁直接的翻译指令
- 自动检测: 智能选择目标语言

### 错误处理
- API Key验证
- 模型权限检查
- 网络连接异常
- 配额不足提醒

## 发布流程

1. **开发**: 修改 `src/` 下的源文件
2. **测试**: 运行 `./build.sh` 本地构建测试
3. **提交**: 遵循Angular提交规范
4. **发布**: 运行 `./release.sh` 自动发版
5. **CI/CD**: GitHub Actions自动构建发布

## 代码提示

当修改代码时，请注意：

- **main.js**: 包含完整的翻译逻辑，不要破坏现有的语言映射和错误处理
- **info.json**: 版本号必须与其他文件同步
- **构建脚本**: 保持Shell脚本的可执行权限
- **文档**: 更新功能时同步更新README.md和CHANGELOG.md

### 常见任务
- 添加新语言: 更新 `items` 数组和 `languageNames` 对象
- 修改提示词: 调整 `buildTranslatePrompt()` 函数
- 新增模型: 在 `info.json` 的 `menuValues` 中添加选项
- 错误处理: 在 `handleApiResponse()` 中添加新的错误类型

### 测试要点
- API Key配置和验证
- 模型选择（预设和自定义）
- 多语言翻译准确性
- 错误情况处理
- 插件安装和配置

这个项目专注于提供稳定、高质量的翻译服务，保持代码简洁和用户体验友好。
