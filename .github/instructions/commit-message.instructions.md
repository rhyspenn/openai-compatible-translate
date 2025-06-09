---
applyTo: "**"
---

# Commit Message Instructions

请按照 Angular 提交规范生成 commit message。

## 格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

## Type 类型

- **feat**: 新功能 (feature)
- **fix**: 错误修复 (bug fix)
- **docs**: 文档更新 (documentation)
- **style**: 代码格式调整，不影响功能 (formatting, missing semi colons, etc)
- **refactor**: 代码重构，既不是新功能也不是错误修复
- **test**: 添加或修改测试 (adding missing tests, refactoring tests)
- **chore**: 构建过程、辅助工具或依赖更新 (maintain, build, deps)
- **perf**: 性能优化 (performance improvements)
- **ci**: CI/CD 配置文件和脚本修改
- **build**: 影响构建系统或外部依赖的修改
- **revert**: 回滚之前的提交

## Scope 范围 (可选)

根据本项目特点，常用的 scope：
- **api**: 智谱AI API 相关
- **ui**: 用户界面相关
- **config**: 配置文件相关
- **docs**: 文档相关
- **deps**: 依赖更新
- **release**: 发布相关
- **test**: 测试相关

## Subject 主题

- 使用命令式语气，现在时态："change" 而不是 "changed" 或 "changes"
- 不要大写首字母
- 结尾不加句号 (.)
- 限制在 50 个字符以内
- 用中文描述

## Body 正文 (可选)

- 解释做了什么以及为什么这样做
- 用中文描述
- 每行限制在 72 个字符以内
- 与 subject 之间用空行分隔

## Footer 页脚 (可选)

- 用于记录 breaking changes 或关闭 issues
- 格式：`BREAKING CHANGE: <description>` 或 `Closes #<issue-number>`

## 示例

```
feat(api): 支持自定义智谱AI模型选择

- 添加自定义模型输入框
- 更新模型验证逻辑
- 优化错误提示信息

Closes #123
```

```
fix(ui): 修复翻译结果显示异常问题

移除可能影响翻译结果的清理逻辑，确保智谱AI返回的完整翻译内容正确显示
```

```
docs: 更新 README.md 安装说明

完善插件配置步骤，添加常见问题解答
```

```
chore(deps): 升级构建工具版本

- 更新 package.json 依赖版本
- 修复兼容性问题
```

## 特殊说明

- 如果是 breaking change，在 type 后添加 `!`，例如：`feat!: 重大API变更`
- 多个修改可以分多行描述，每个修改点用 `-` 开头
- 提交信息应该简洁明了，让其他开发者能快速理解修改内容
