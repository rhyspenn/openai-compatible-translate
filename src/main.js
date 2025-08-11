/**
 * OpenAI Compatible Translation Plugin for Bob
 * 支持任何 OpenAI 兼容 API 的翻译插件
 * 
 * Bob 语言代码列表 https://ripperhe.gitee.io/bob/#/plugin/addtion/language
 */

// 语言映射表
var items = [
    ['auto', 'auto'],
    ['zh-Hans', 'Chinese Simplified'],
    ['zh-Hant', 'Chinese Traditional'],
    ['en', 'English'],
    ['ja', 'Japanese'],
    ['ko', 'Korean'],
    ['fr', 'French'],
    ['de', 'German'],
    ['es', 'Spanish'],
    ['pt', 'Portuguese'],
    ['ru', 'Russian'],
    ['it', 'Italian'],
    ['ar', 'Arabic'],
    ['th', 'Thai'],
    ['vi', 'Vietnamese'],
    ['nl', 'Dutch'],
    ['pl', 'Polish'],
    ['tr', 'Turkish'],
    ['he', 'Hebrew'],
    ['hi', 'Hindi'],
    ['id', 'Indonesian'],
    ['ms', 'Malay'],
    ['sv', 'Swedish'],
    ['da', 'Danish'],
    ['no', 'Norwegian'],
    ['fi', 'Finnish'],
    ['cs', 'Czech'],
    ['hu', 'Hungarian'],
    ['el', 'Greek'],
    ['ro', 'Romanian'],
    ['bg', 'Bulgarian'],
    ['uk', 'Ukrainian'],
    ['sk', 'Slovak'],
    ['sl', 'Slovenian'],
    ['hr', 'Croatian'],
    ['lt', 'Lithuanian'],
    ['lv', 'Latvian'],
    ['et', 'Estonian'],
    ['fa', 'Persian']
];

var langMap = new Map(items);
var langMapReverse = new Map(items.map(([standardLang, lang]) => [lang, standardLang]));

function supportLanguages() {
    return items.map(([standardLang, lang]) => standardLang);
}

function translate(query, completion) {
    const { text, from, to } = query;

    // 获取配置
    const apiKey = $option.apiKey;
    const baseUrl = $option.baseUrl || 'https://api.openai.com/v1';
    const model = $option.model || 'gpt-4.1';
    const temperature = parseFloat($option.temperature) || 0.1;
    const maxTokens = $option.maxTokens ? parseInt($option.maxTokens) : null;

    // 验证必要配置
    if (!apiKey) {
        completion({
            error: {
                type: 'param',
                message: '请先配置 API Key',
                addition: '请在插件设置中填入您的 API 密钥'
            }
        });
        return;
    }

    // 转换语言代码
    const fromLang = langMap.get(from) || from;
    const toLang = langMap.get(to) || to;

    // 构建翻译提示词
    let systemPrompt = "You are a professional translator. Rules: 1) Output only the translation result without any explanation or thinking process 2) Translate directly while maintaining the original format 3) For auto-detect, prioritize English-Chinese Simplified translation pairs 4) Preserve original formatting, line breaks, and spacing";
    
    let userPrompt = buildTranslatePrompt(text, fromLang, toLang);

    // 构建请求数据
    const requestData = {
        model: model,
        messages: [
            {
                role: "system",
                content: systemPrompt
            },
            {
                role: "user",
                content: userPrompt
            }
        ],
        temperature: temperature,
        stream: false
    };

    // 如果设置了 maxTokens，则添加到请求中
    if (maxTokens) {
        requestData.max_tokens = maxTokens;
    } else {
        // 自动计算合适的 max_tokens
        requestData.max_tokens = Math.min(Math.max(text.length * 3, 100), 4000);
    }

    // 确保 baseUrl 格式正确
    let apiUrl = baseUrl.trim();
    if (!apiUrl.endsWith('/')) {
        apiUrl += '/';
    }
    apiUrl += 'chat/completions';

    // 调用 OpenAI 兼容 API
    $http.request({
        method: 'POST',
        url: apiUrl,
        header: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: requestData,
        handler: function (resp) {
            handleApiResponse(resp, text, from, to, completion);
        }
    });
}

function buildTranslatePrompt(text, fromLang, toLang) {
    // 处理特殊情况：自动检测
    if (toLang === 'auto') {
        if (fromLang === 'auto') {
            // 优化：优先处理中英互译
            return `Intelligently translate the following text. Priority rules:
1. If the text is in English, translate to Chinese Simplified
2. If the text is in Chinese (Simplified or Traditional), translate to English
3. For other languages, translate to the most appropriate target language
Text to translate:\n${text}`;
        } else {
            return `Translate from ${fromLang} to the most appropriate language:\n${text}`;
        }
    }

    // 正常翻译请求
    if (fromLang === 'auto') {
        return `Translate to ${toLang}:\n${text}`;
    } else {
        return `Translate from ${fromLang} to ${toLang}:\n${text}`;
    }
}

function handleApiResponse(resp, originalText, from, to, completion) {
    // 处理网络错误
    if (resp.error) {
        completion({
            error: {
                type: 'network',
                message: '网络请求失败',
                addition: resp.error.localizedDescription || '请检查网络连接和 API 地址是否正确'
            }
        });
        return;
    }

    const data = resp.data;

    // 检查 API 错误
    if (data.error) {
        let errorMessage = 'API 错误';
        let errorAddition = data.error.message || '未知错误';

        // 处理常见错误类型
        if (data.error.code === 'invalid_api_key' || data.error.type === 'invalid_request_error') {
            errorMessage = 'API Key 无效';
            errorAddition = '请检查您的 API 密钥是否正确';
        } else if (data.error.code === 'insufficient_quota' || data.error.type === 'insufficient_quota') {
            errorMessage = 'API 配额不足';
            errorAddition = '请检查您的账户余额';
        } else if (data.error.code === 'model_not_found' || data.error.message?.includes('model')) {
            errorMessage = '模型不存在';
            errorAddition = `模型 "${$option.model || 'gpt-4.1'}" 不存在或无权限访问，请检查模型名称`;
        } else if (data.error.code === 'rate_limit_exceeded') {
            errorMessage = '请求频率超限';
            errorAddition = '请稍后再试';
        }

        completion({
            error: {
                type: 'api',
                message: errorMessage,
                addition: errorAddition
            }
        });
        return;
    }

    // 解析翻译结果
    if (data.choices && data.choices.length > 0 && data.choices[0].message) {
        let translatedText = data.choices[0].message.content;
        
        if (translatedText) {
            // 清理可能的多余空白
            translatedText = translatedText.trim();
            
            completion({
                result: {
                    from: from,
                    to: to,
                    toParagraphs: [translatedText],
                    fromParagraphs: [originalText]
                }
            });
        } else {
            completion({
                error: {
                    type: 'api',
                    message: '翻译结果为空',
                    addition: 'API 返回了空的翻译结果'
                }
            });
        }
    } else {
        completion({
            error: {
                type: 'api',
                message: '响应格式错误',
                addition: 'API 返回的数据格式不正确'
            }
        });
    }
}