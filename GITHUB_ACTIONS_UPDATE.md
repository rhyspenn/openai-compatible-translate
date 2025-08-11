# GitHub Actions 配置优化说明

## 已完成的更新

### 1. GitHub Actions 工作流程优化 (`.github/workflows/release.yml`)
- ✅ 更新插件文件名为 `openai-compatible-translate.bobplugin`
- ✅ 添加 SHA256 哈希计算步骤
- ✅ 集成 appcast.json 自动更新（需要安装 jq）
- ✅ 更新发布说明内容，反映插件的通用性
- ✅ 添加文件信息（SHA256）到发布说明

### 2. 新增 CI 工作流程 (`.github/workflows/ci.yml`)
- ✅ 添加持续集成测试
- ✅ JSON 文件验证
- ✅ JavaScript 语法检查
- ✅ 构建测试
- ✅ 插件大小检查
- ✅ 插件内容验证

### 3. README.md 更新
- ✅ 修复 License 徽章链接
- ✅ 添加 GitHub Actions 状态徽章
- ✅ 所有链接指向正确的仓库地址

### 4. 配置文件更新
- ✅ `src/info.json`: 
  - 更新 identifier 为 `com.rhyspenn.openai-compatible-translate`
  - 添加 appcast URL
- ✅ `appcast.json`: 
  - 更新 identifier 匹配 info.json
- ✅ `package.json`: 
  - 添加简单的测试脚本
- ✅ `release.sh`: 
  - 更新 GitHub Actions 链接

## 使用说明

### 自动发布流程
1. 更新版本号：
   ```bash
   ./release.sh
   ```
2. 输入新版本号（如 2.0.1）
3. 脚本会自动：
   - 更新 src/info.json 中的版本
   - 提交更改
   - 创建 git tag
   - 推送到 GitHub
4. GitHub Actions 会自动：
   - 构建插件
   - 计算 SHA256
   - 创建 Release
   - 上传插件文件

### 手动触发 CI
- 推送到 main 分支会自动触发 CI
- 创建 Pull Request 会自动运行测试
- 也可以在 Actions 页面手动触发

### 本地测试
```bash
# 构建插件
npm run build

# 运行测试
npm test
```

## 注意事项

1. **首次使用**：确保 GitHub 仓库的 Actions 权限已启用
2. **Release 权限**：工作流程需要 `contents: write` 权限来创建发布
3. **SHA256 更新**：如果服务器安装了 jq，会自动更新 appcast.json 中的 SHA256
4. **版本管理**：始终使用 release.sh 脚本来管理版本，确保一致性

## 后续建议

1. 考虑添加自动化测试用例
2. 可以添加代码覆盖率检查
3. 考虑添加自动更新 CHANGELOG.md 的功能
4. 可以集成代码质量检查工具（如 ESLint）