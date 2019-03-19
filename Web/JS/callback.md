# 回调函数

系统编程(system programming): 编写库; 库通常会有一些接口(API application programming interface, 应用程序接口), 供应用程序员使用

应用编程(application programming): 利用写好的各种库来编写具有某种功能的程序

程序运行时, 一般情况下, 应用程序(application program)会通过API来调用库函数(library function). 有些库函数(library function)会要求应用先传递给它一个函数, 在适合的时间调用, 完成任务. 这个被传入, 后又被调用的就称为回调函数(callback function)

与普通调用不同, 我们可以通过改变回调函数来决定, 改变中间函数(有时是库函数)的行为

回调有两种情况(阻塞式, 延迟式)
阻塞式: 回调函数发生在起始函数(调用中间函数的函数)返回之前
延迟式: 回调可能是发生在起始函数返回之后