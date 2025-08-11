#!/bin/bash

# 构建脚本 - 用于本地构建插件包

set -e

echo "🔨 构建 OpenAI Compatible 翻译插件"
echo "=================================="

# 检查源文件是否存在
if [[ ! -f "src/main.js" || ! -f "src/info.json" ]]; then
    echo "❌ 源文件不存在，请确保 src/main.js 和 src/info.json 存在"
    exit 1
fi

# 获取版本号
VERSION=$(grep '"version"' src/info.json | sed 's/.*"version": "\(.*\)".*/\1/')
echo "📋 插件版本: $VERSION"

# 清理旧的构建文件
if [[ -f "openai-compatible-translate.bobplugin" ]]; then
    echo "🧹 清理旧的构建文件"
    rm openai-compatible-translate.bobplugin
fi

# 构建插件包
echo "📦 构建插件包..."
cd src
zip -r ../openai-compatible-translate.bobplugin main.js info.json
cd ..

# 验证插件包
echo "✅ 构建完成！"
echo "📋 插件包内容:"
unzip -l openai-compatible-translate.bobplugin

echo ""
echo "🎉 插件包已生成: openai-compatible-translate.bobplugin"
echo "📂 大小: $(du -h openai-compatible-translate.bobplugin | cut -f1)"
