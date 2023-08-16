module.exports = {
  printWidth: 200, // 一行最多 100 字符
  tabWidth: 2, // 使用 4 个空格缩进
  useTabs: false, // 不使用缩进符，而使用空格
  semi: false, // 行尾需要有分号
  singleQuote: true, // 使用单引号
  endOfLine: 'auto', //prettier检测文件每行结束的格式
  jsxSingleQuote: false, // jsx 不使用单引号，而使用双引号
  trailingComma: 'none', // 末尾不需要逗号
  bracketSpacing: true, // 大括号内的首尾需要空格
  arrowParens: 'avoid', //箭头函数单一参数省略括号
  eslintIntegration: false
}
