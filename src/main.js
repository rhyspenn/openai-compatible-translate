/**
 * 由于各大服务商的语言代码都不大一样，
 * 所以我定义了一份 Bob 专用的语言代码，以便 Bob 主程序和插件之间互传语种。
 * Bob 语言代码列表 https://ripperhe.gitee.io/bob/#/plugin/addtion/language
 * 
 * 转换的代码建议以下面的方式实现，
 * `xxx` 代表服务商特有的语言代码，请替换为真实的，
 * 具体支持的语种数量请根据实际情况而定。
 * 
 * Bob 语言代码转服务商语言代码(以为 'zh-Hans' 为例): var lang = langMap.get('zh-Hans');
 * 服务商语言代码转 Bob 语言代码: var standardLang = langMapReverse.get('xxx');
 */

var items = [
    ['auto', 'auto'],
    ['zh-Hans', 'zh'],
    ['zh-Hant', 'zh-tw'],
    ['en', 'en'],
    ['ja', 'ja'],
    ['ko', 'ko'],
    ['fr', 'fr'],
    ['de', 'de'],
    ['es', 'es'],
    ['pt', 'pt'],
    ['ru', 'ru'],
    ['it', 'it'],
    ['ar', 'ar'],
    ['th', 'th'],
    ['vi', 'vi']
];

var langMap = new Map(items);
var langMapReverse = new Map(items.map(([standardLang, lang]) => [lang, standardLang]));

function supportLanguages() {
    return items.map(([standardLang, lang]) => standardLang);
}

function translate(query, completion) {
    const { text, from, to } = query;

    // 检查API Key配置
    const apiKey = $option.apiKey;
    if (!apiKey) {
        completion({
            error: {
                type: 'param',
                message: '请先配置智谱AI API Key',
                addition: '请在插件设置中填入您的API密钥，可在 https://open.bigmodel.cn/ 获取'
            }
        });
        return;
    }

    // 获取模型配置
    let model = $option.model || 'glm-4';

    // 如果选择了自定义模型，使用用户输入的模型名称
    if (model === 'custom') {
        const customModel = $option.customModel;
        if (!customModel || customModel.trim() === '') {
            completion({
                error: {
                    type: 'param',
                    message: '请填写自定义模型名称',
                    addition: '选择自定义模型时，请在插件设置中填入具体的模型名称'
                }
            });
            return;
        }
        model = customModel.trim();
    }

    // 转换语言代码
    const fromLang = langMap.get(from);
    const toLang = langMap.get(to);

    // 构建翻译提示词
    let prompt = buildTranslatePrompt(text, from, to, fromLang, toLang);

    // 构建请求数据
    const requestData = {
        model: model,
        messages: [
            {
                role: "system",
                content: "你是专业翻译工具。规则：1)只输出翻译结果，禁止解释说明 2)禁止思考过程 3)直接翻译，保持原文格式 4)智能翻译时自动选择最合适的目标语言"
            },
            {
                role: "user",
                content: prompt
            }
        ],
        temperature: 0.1,
        max_tokens: Math.min(Math.max(text.length * 3, 100), 2000), // 动态调整max_tokens
        stream: false, // 翻译任务使用非流式响应更快
        top_p: 0.9     // 提高响应速度的参数
    };

    // 调用智谱AI API
    $http.request({
        method: 'POST',
        url: 'https://open.bigmodel.cn/api/paas/v4/chat/completions',
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

function buildTranslatePrompt(text, from, to, fromLang, toLang) {
    const languageNames = {
        'auto': '自动检测',
        'zh': '中文',
        'zh-tw': '繁体中文',
        'en': '英语',
        'ja': '日语',
        'ko': '韩语',
        'fr': '法语',
        'de': '德语',
        'es': '西班牙语',
        'pt': '葡萄牙语',
        'ru': '俄语',
        'it': '意大利语',
        'ar': '阿拉伯语',
        'th': '泰语',
        'vi': '越南语'
    };

    const fromName = languageNames[fromLang] || '原语言';
    const toName = languageNames[toLang] || '目标语言';

    // 处理特殊情况：目标语言为自动检测时
    if (to === 'auto') {
        if (from === 'auto') {
            return `智能翻译:\n${text}`;
        } else {
            return `从${fromName}智能翻译:\n${text}`;
        }
    }

    // 使用更直接简洁的提示词
    if (from === 'auto') {
        return `翻译为${toName}:\n${text}`;
    } else {
        return `${fromName}→${toName}:\n${text}`;
    }
}

function handleApiResponse(resp, originalText, from, to, completion) {
    if (resp.error) {
        completion({
            error: {
                type: 'network',
                message: '网络请求失败',
                addition: resp.error.localizedDescription || '请检查网络连接'
            }
        });
        return;
    }

    const data = resp.data;

    // 检查API错误
    if (data.error) {
        let errorMessage = '智谱AI API错误';
        let errorAddition = data.error.message;

        if (data.error.code === 'invalid_api_key') {
            errorMessage = 'API Key无效';
            errorAddition = '请检查您的API密钥是否正确';
        } else if (data.error.code === 'insufficient_quota') {
            errorMessage = 'API配额不足';
            errorAddition = '请检查您的账户余额';
        } else if (data.error.code === 'model_not_found' || data.error.message.includes('model')) {
            errorMessage = '模型不存在或无权限';
            errorAddition = '请检查模型名称是否正确，或该模型是否在您的账户权限范围内';
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
    if (data.choices && data.choices.length > 0) {
        let translatedText = data.choices[0].message.content.trim();

        if (translatedText) {
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
                    addition: '智谱AI返回了空的翻译结果'
                }
            });
        }
    } else {
        completion({
            error: {
                type: 'api',
                message: '解析响应失败',
                addition: '智谱AI返回的数据格式异常'
            }
        });
    }
}
