# vue2.x-cli

## 本地开发
启动单模块：  
`npm run serve --moudle=index #index模块`  
启动所有模块：  
`npm run serve`  

## 打包  
打包单模块：  
`npm run build --moudle=index`  
打包所有模块：  
`npm run build:all`  
说明：在`package.json`中添加需要打包的模块指令，vue-cli会根据指令顺序依次打包  


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```
