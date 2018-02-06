# ThoughtWorks网申作业
## 运行
打开文件，找到 `SpecRunner.html` 直接用浏览器打开，就能看到我们测试用例结果的结果

如果需要修改测试，找到 `spec` 文件夹，用编辑器打开里面的 `getLocation.js`；修改测试用例，我们只需要修改 `describe(string, function)` 的相关信息就好

jasmine基本语法介绍：

`describe(string, function)`：可以理解为是一个测试集或者测试包,主要功能是用来划分单元测试的

参数 `string`：描述测试包的信息

参数 `function`：测试集的具体实现，可包含任意代码

`it(string, function)`：测试用例

参数`string`：描述测试用例的信息

参数`function`：测试用例的具体实现，可包含任意代码

`expect()`的参数是需要测试的东西
