/*
     jasmine基本语法介绍：
     describe(string, function)：可以理解为是一个测试集或者测试包（官方称之为suite），主要功能是用来划分单元测试的，describe是可以嵌套使用的
     参数string：描述测试包的信息
     参数function：测试集的具体实现，可包含任意代码

     it(string, function)：测试用例（官方称之为spec）
     参数string：描述测试用例的信息
     参数function：测试用例的具体实现，可包含任意代码

     expect()的参数是需要测试的东西，toBe()是一种断言，相当于===,not相当于取非。

     从以下例子可知：
     1、每个测试文件中可以包含多个describe
     2、每个describe中可以包含多个it
     3、每个it中可以包含多个expect
     4、describe可嵌套使用
*/
describe("当指定消息ID 2 时，应该输出",function(){
  const location=`
    plane1 1 1 1
    plane1 1 1 1 1 2 3
    plane1 2 3 4 1 1 1
    plane1 3 4 5
    plane1 1 1 1 1 2 3`;
  const expectedLocation="plane1 2 3,4,5";
  const locationMsg=getLocation(location,2);
  it(expectedLocation, function() {
    expect(locationMsg).toEqual(expectedLocation);
  });
})
describe("当指定消息ID 4 时，应该输出",function(){
  const location=`
    plane1 1 1 1
    plane1 1 1 1 1 2 3
    plane1 2 3 4 1 1 1
    plane1 3 4 5
    plane1 1 1 1 1 2 3`;
  const expectedLocation="Error: 4";
  const locationMsg=getLocation(location,4);
  it(expectedLocation, function() {
    expect(locationMsg).toEqual(expectedLocation);
  });
})
describe("当指定消息ID 100 时，应该输出",function(){
  const location=`
    plane1 1 1 1
    plane1 1 1 1 1 2 3
    plane1 2 3 4 1 1 1
    plane1 3 4 5
    plane1 1 1 1 1 2 3`;
  const expectedLocation="Cannot found : 100";
  const locationMsg=getLocation(location,100);
  it(expectedLocation, function() {
    expect(locationMsg).toEqual(expectedLocation);
  });
})


