local PromptTemplate = |||
                        Analyze the following "{language}" code for performance, security, and best practices:\n```"{language}"\n"{code}"\n```
                       |||;

local geminiai = std.extVar("gemini_key");

local generatePrompt() = 
    local language = std.extVar("language");
    local code = std.extVar("code");
    local updatedPromptWithLanguage = std.strReplace(PromptTemplate, "{language}", language);
    local updatedPromptWithCode = std.strReplace(updatedPromptWithLanguage, "{code}", code);
    updatedPromptWithCode;
{
    "prompt": generatePrompt()
}
