module.exports = {
  presets: [
    [
      "@vue/app", {
        "useBuiltIns": "entry"
      }
    ]
  ],
  plugins: [
    [
      'import',
      { libraryName: 'vant', libraryDirectory: 'es', style: true }, // libraryName是第三方库的名字，`style:true`代表自动引入css
      'vant'
    ]
  ]
}
