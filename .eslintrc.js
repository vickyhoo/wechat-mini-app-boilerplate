module.exports = {
  root: true,
  env: {
    node: true
  },
  globals: {
    "BMap": true,
    "wx": true,
    "uni": true,
    "__wxConfig": true
  },
  extends: ['plugin:vue/recommended', '@vue/prettier'],
  rules: {
    'no-console': 'off',
    'no-unused-vars': 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/require-default-prop': 'off',
    'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
    'vue/attributes-order': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
