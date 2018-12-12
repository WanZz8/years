# 库文件
### 安装react-native  
    npm install react-native-cli -g  

# 初始化
    react-native init 项目名

# 依赖  

### 安装 rnpm
    npm install rnpm -g

### 安装 react-native 导航模块  
    yarn add react-navigation  
### 安装 react-native-elements 元件模块
    yarn add react-native-elements
#### 安装 react-native-elements 元件模块依赖
    yarn add react-native-vector-icons
    rnpm link react-native-vector-icons
### 安装 react-native swiper组件
    yarn add react-native-swiper

### 安装 react-native-device-info 设备信息模块
    yarn add react-native-device-info
    rnpm link react-native-device-info

### 安装 react-native-qrcode 相关依赖
    yarn add react-native-qrcode
    

### 安装 code-push 相关依赖
    npm install appcenter appcenter-analytics appcenter-crashes --save
    react-native link
    yarn add react-native-code-push
    rnpm link react-native-code-push


### 安装 极光推送
    npm install jpush-react-native jcore-react-native --save
    react-native link

# 命令

### code-push管理  
#### 命令行工具安装
`npm install code-push-cli -g`

#### 登录  
`code-push login`  

#### 查看codepush 部署key <appName>例子 "YTD-Developer/RN-NF-Android" 
`code-push deployment ls <appName> -k`

#### APP版本状态查询  
`code-push deployment ls fk`  
#### APP更新历史查询  
`code-push deployment history fk Staging`  
`code-push deployment history fk Production`
#### APP更新  
`code-push release fk ./ios/bundle 1.0.0`
`code-push release YTD-Developer/RN-NF ./ios/bundle 1.2.2`
#### 打包js bundle
`yarn bundle-ios`  

#### 生成android新包
`yarn create-android`
#### 生成android更新包
`yarn bundle-android`

## 远程服务器地址  
外网`https://fk.76bao.hk`  
内网`http://10.12.179.128`  
## 行情服务器地址
外网`https://quote.76bao.hk`  
内网`http://10.12.179.128:8480`


### 错误处理

#### vector字体包依赖出错
`rm ./node_modules/react-native/local-cli/core/__fixtures__/files/package.json`

缺少crypto报错
./node_modules/.bin/rn-nodeify --install --hack



### 错误处理

1. 关于错误: Error: While resolving module `react-native-vector-icons/MaterialIcons`, the Haste package `react-native-vector-icons` was found.

解决办法： `rm ./node_modules/react-native/local-cli/core/__fixtures__/files/package.json`

2. 关于错误: Error: Unable to resolve module `@babel/runtime/helpers/interopRequireDefault` from `/Volumes/我的电脑/anvo/test/sd01/node_modules/react-native-vector-icons/dist/index.js`: Module does not exist in the module map

解决办法: yarn add @babel/runtime 即可。因为是es6版本的原因

3. vector字体包依赖出错

解决办法: `rm ./node_modules/react-native/local-cli/core/__fixtures__/files/package.json`

4. #include "config.h"
解决办法
cd node_modules/react-native/third-party/glog-0.3.4

./configure --host arm-apple-darwin
