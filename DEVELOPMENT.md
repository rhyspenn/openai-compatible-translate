# 开发快速指南

## 📦 快速开始

### 本地开发
```bash
# 构建插件包
./build.sh

# 安装到 Bob（如果已安装 Bob）
open zhipu-ai-translate.bobplugin
```

### 发布新版本
```bash
# 一键发布（会自动更新版本号并推送）
./release.sh
```

## 🛠️ 开发工作流

1. **修改源代码** - 编辑 `src/main.js` 或 `src/info.json`
2. **本地测试** - 运行 `./build.sh` 构建测试
3. **提交更改** - `git add . && git commit -m "更新说明"`
4. **发布版本** - 运行 `./release.sh`

## 📁 关键文件说明

- `src/main.js` - 插件核心逻辑
- `src/info.json` - 插件配置信息（包含模型选择和自定义模型配置）
- `build.sh` - 本地构建脚本
- `release.sh` - 版本发布脚本
- `TESTING.md` - 功能测试指南
- `.github/workflows/release.yml` - 自动构建配置

## 🆕 最新功能 (v1.1.0)

### 自定义模型支持
- 用户可选择预设模型（GLM-4、GLM-4-Flash）
- 支持自定义模型名称输入
- 完善的错误处理和验证
- `release.sh` - 版本发布脚本
- `.github/workflows/release.yml` - 自动构建配置

## 🚀 自动化流程

推送标签 → GitHub Actions → 自动构建 → 创建 Release → 上传插件包

## 💡 开发提示

- 修改版本号会自动同步到所有相关文件
- GitHub Actions 会自动处理构建和发布
- 插件包只包含必要的源文件（main.js + info.json）
