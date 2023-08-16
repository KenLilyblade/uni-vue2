module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    es6: true
  },
  parser: '@babel/eslint-parser',
  globals: {
    uni: 'readonly',
    wx: 'readonly'
  },
  //继承规则
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended' //解决eslint和prettier重复校验
  ],
  parserOptions: {
    ecmaVersion: 8,
    requireConfigFile: false,
    sourceType: 'module'
  },
  //插件
  plugins: ['vue', 'prettier'],
  //规则
  rules: {
    'no-unused-vars': 'off',
    'no-undef': 'off'
  }
}
