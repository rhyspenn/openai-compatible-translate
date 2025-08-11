# 开发文档

## 项目结构

```
openai-compatible-translate/
├── src/
│   ├── main.js        # 插件主逻辑
│   └── info.json      # 插件配置信息
├── build.sh           # 构建脚本
├── release.sh         # 发布脚本
├── package.json       # 项目元数据
├── README.md          # 用户文档
├── CHANGELOG.md       # 更新日志
├── DEVELOPMENT.md     # 开发文档
└── LICENSE           # 许可证
```

## 开发环境设置

### 前提条件

- Node.js >= 14.0.0
- Bob App（用于测试）
- Git

### 安装依赖

```bash
# 克隆仓库
git clone https://github.com/rhyspenn/openai-compatible-translate.git
cd openai-compatible-translate

# 项目使用纯 JavaScript，无需安装额外依赖
```

## 核心功能说明

### 1. API 兼容性

插件设计为与任何 OpenAI 兼容的 API 服务工作：

```javascript
// 支持自定义 Base URL
const baseUrl = $option.baseUrl || 'https://api.openai.com/v1';

// 构建完整的 API 端点
let apiUrl = baseUrl.trim();
if (!apiUrl.endsWith('/')) {
    apiUrl += '/';
}
apiUrl += 'chat/completions';
```

### 2. 语言映射

插件维护了 Bob 语言代码到自然语言名称的映射：

```javascript
var items = [
    ['zh-Hans', 'Chinese Simplified'],
    ['zh-Hant', 'Chinese Traditional'],
    ['en', 'English'],
    // ... 更多语言
];
```

### 3. 翻译提示词构建

```javascript
function buildTranslatePrompt(text, fromLang, toLang) {
    // 智能处理不同的翻译场景
    if (toLang === 'auto') {
        // 自动检测目标语言
    } else if (fromLang === 'auto') {
        // 自动检测源语言
    } else {
        // 指定语言对翻译
    }
}
```

### 4. 错误处理

插件包含全面的错误处理：

- 网络错误
- API 认证错误
- 配额不足
- 模型不存在
- 响应格式错误

## 配置选项

### info.json 配置项

| 字段 | 类型 | 说明 | 默认值 |
|------|------|------|--------|
| baseUrl | text | API 基础地址 | https://api.openai.com/v1 |
| apiKey | secure text | API 密钥 | 必填 |
| model | text | 模型名称 | gpt-4.1 |
| temperature | text | 控制随机性 | 0.1 |
| maxTokens | text | 最大 token 数 | 自动计算 |

## 测试指南

### 本地测试

1. 修改代码后，使用构建脚本打包：
   ```bash
   ./build.sh
   ```

2. 在 Bob 中安装生成的 `.bobplugin` 文件

3. 配置插件参数并测试各种翻译场景

### 测试用例

建议测试以下场景：

1. **基础翻译**
   - 中英互译
   - 长文本翻译
   - 包含特殊字符的文本

2. **语言检测**
   - 自动检测源语言
   - 混合语言文本

3. **错误处理**
   - 无效的 API Key
   - 错误的 Base URL
   - 不存在的模型名称

4. **性能测试**
   - 大文本翻译
   - 并发翻译请求

## API 服务配置示例

### OpenAI

```javascript
baseUrl: 'https://api.openai.com/v1'
model: 'gpt-4-turbo-preview'
```

### Azure OpenAI

```javascript
baseUrl: 'https://YOUR-RESOURCE.openai.azure.com/openai/deployments/YOUR-DEPLOYMENT'
model: 'gpt-4'
```

### 本地模型 (LM Studio)

```javascript
baseUrl: 'http://localhost:1234/v1'
model: 'local-model-name'
```

## 构建和发布

### 构建插件

```bash
# 运行构建脚本
./build.sh

# 这将创建 openai-compatible-translate.bobplugin 文件
```

### 发布新版本

1. 更新版本号：
   - `src/info.json` 中的 `version`
   - `package.json` 中的 `version`

2. 更新 CHANGELOG.md

3. 运行发布脚本：
   ```bash
   ./release.sh
   ```

4. 在 GitHub 创建新的 Release

## 调试技巧

### 日志输出

在开发过程中可以使用 `$log` 输出调试信息：

```javascript
$log.info('Debug info:', someVariable);
$log.error('Error occurred:', error);
```

### 常见问题调试

1. **API 调用失败**
   - 检查 Base URL 格式
   - 验证 API Key
   - 确认模型名称

2. **翻译结果异常**
   - 检查提示词构建
   - 验证响应解析逻辑

3. **性能问题**
   - 优化 max_tokens 计算
   - 减少不必要的 API 调用

## 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

### 代码规范

- 使用清晰的变量和函数名
- 添加必要的注释
- 保持代码简洁易读
- 处理所有可能的错误情况

## 资源链接

- [Bob 插件开发文档](https://ripperhe.gitee.io/bob/#/plugin/quickstart)
- [OpenAI API 文档](https://platform.openai.com/docs/api-reference)
- [项目 GitHub](https://github.com/rhyspenn/openai-compatible-translate)

## 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件